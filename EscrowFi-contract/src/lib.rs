use anchor_lang::prelude::*;
use anchor_lang::system_program;

// IMPORTANT: After you deploy in Solana Playground, copy the Program ID shown
// in the top-left panel and replace the string below, then rebuild + redeploy.
// DO NOT use this placeholder on mainnet.

declare_id!("5z3EUnqxaD6TdwA9rJSG7EgT8tJaAm2vp4j61Wrqvy7D");

#[program]
pub mod escrowfi {
    use super::*;

    //  1. CREATE ESCROW
    // Client creates the escrow account and the vault account in one tx.
    // No SOL moves yet — that happens in deposit().
    pub fn create_escrow(
        ctx: Context<CreateEscrow>,
        escrow_id: u64,
        amount: u64,
        deadline: i64,
        description: String,
    ) -> Result<()> {
        require!(amount > 0, EscrowError::InvalidAmount);
        require!(description.len() <= 200, EscrowError::DescriptionTooLong);

        let clock = Clock::get()?;
        require!(deadline > clock.unix_timestamp, EscrowError::DeadlineInPast);

        let escrow = &mut ctx.accounts.escrow;
        escrow.escrow_id = escrow_id;
        escrow.client = ctx.accounts.client.key();
        escrow.freelancer = ctx.accounts.freelancer.key();
        escrow.amount = amount;
        escrow.deadline = deadline;
        escrow.description = description.clone();
        escrow.proof_url = String::new();
        escrow.status = EscrowStatus::Created;
        escrow.created_at = clock.unix_timestamp;
        escrow.accepted_at = 0;
        escrow.funded_at = 0;
        escrow.completed_at = 0;
        escrow.bump = ctx.bumps.escrow;
        escrow.vault_bump = ctx.bumps.vault; // store vault bump — needed for PDA signing later

        emit!(EscrowCreated {
            escrow_id,
            client: ctx.accounts.client.key(),
            freelancer: ctx.accounts.freelancer.key(),
            amount,
            deadline,
            description,
        });

        Ok(())
    }

    //  2. ACCEPT JOB
    // Freelancer signs to confirm they accept the terms.
    // Status: Created → Accepted
    pub fn accept_job(ctx: Context<AcceptJob>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;

        require!(
            escrow.status == EscrowStatus::Created,
            EscrowError::InvalidStatus
        );
        require!(
            ctx.accounts.freelancer.key() == escrow.freelancer,
            EscrowError::Unauthorized
        );

        let clock = Clock::get()?;
        require!(
            clock.unix_timestamp < escrow.deadline,
            EscrowError::DeadlinePassed
        );

        escrow.status = EscrowStatus::Accepted;
        escrow.accepted_at = clock.unix_timestamp;

        emit!(JobAccepted {
            escrow_id: escrow.escrow_id,
            freelancer: ctx.accounts.freelancer.key(),
            accepted_at: escrow.accepted_at,
        });

        Ok(())
    }

    //  3. DEPOSIT
    // Client transfers SOL into the vault PDA.
    // The vault was already initialized (space = 0) in create_escrow,
    // so it exists and is owned by this program. SOL transfer is safe.
    // Status: Accepted → Funded
    pub fn deposit(ctx: Context<Deposit>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;

        require!(
            escrow.status == EscrowStatus::Accepted,
            EscrowError::InvalidStatus
        );
        require!(
            ctx.accounts.client.key() == escrow.client,
            EscrowError::Unauthorized
        );

        let clock = Clock::get()?;
        require!(
            clock.unix_timestamp < escrow.deadline,
            EscrowError::DeadlinePassed
        );

        // Transfer SOL from client wallet → vault PDA
        let cpi_ctx = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.client.to_account_info(),
                to: ctx.accounts.vault.to_account_info(),
            },
        );
        system_program::transfer(cpi_ctx, escrow.amount)?;

        escrow.status = EscrowStatus::Funded;
        escrow.funded_at = clock.unix_timestamp;

        emit!(EscrowFunded {
            escrow_id: escrow.escrow_id,
            amount: escrow.amount,
            funded_at: escrow.funded_at,
        });

        Ok(())
    }

    //  4. SUBMIT PROOF
    // Freelancer submits a GitHub URL or IPFS CID as proof of delivery.
    // Status: Funded → ProofSubmitted
    pub fn submit_proof(ctx: Context<SubmitProof>, proof_url: String) -> Result<()> {
        require!(proof_url.len() > 0, EscrowError::ProofUrlEmpty);
        require!(proof_url.len() <= 200, EscrowError::ProofUrlTooLong);

        let escrow = &mut ctx.accounts.escrow;

        require!(
            escrow.status == EscrowStatus::Funded,
            EscrowError::InvalidStatus
        );
        require!(
            ctx.accounts.freelancer.key() == escrow.freelancer,
            EscrowError::Unauthorized
        );

        let clock = Clock::get()?;
        require!(
            clock.unix_timestamp < escrow.deadline,
            EscrowError::DeadlinePassed
        );

        escrow.proof_url = proof_url.clone();
        escrow.status = EscrowStatus::ProofSubmitted;

        emit!(ProofSubmitted {
            escrow_id: escrow.escrow_id,
            freelancer: ctx.accounts.freelancer.key(),
            proof_url,
        });

        Ok(())
    }

    //  5. RELEASE PAYMENT
    // Client approves delivery and releases SOL from vault → freelancer.
    // Status: ProofSubmitted → Completed
    pub fn release_payment(ctx: Context<ReleasePayment>) -> Result<()> {
        // Copy what we need BEFORE taking the mutable borrow — Rust borrow checker requires this
        let escrow_key = ctx.accounts.escrow.key();
        let amount = ctx.accounts.escrow.amount;
        let vault_bump = ctx.accounts.escrow.vault_bump;
        let clock = Clock::get()?;

        {
            let escrow = &ctx.accounts.escrow;
            require!(
                escrow.status == EscrowStatus::ProofSubmitted,
                EscrowError::InvalidStatus
            );
            require!(
                ctx.accounts.client.key() == escrow.client,
                EscrowError::Unauthorized
            );
        }

        // Build PDA signer seeds for the vault
        // seeds: ["vault", escrow_pubkey]
        let seeds = &[b"vault".as_ref(), escrow_key.as_ref(), &[vault_bump]];
        let signer = &[&seeds[..]];

        // Transfer SOL from vault PDA → freelancer
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.vault.to_account_info(),
                to: ctx.accounts.freelancer.to_account_info(),
            },
            signer,
        );
        system_program::transfer(cpi_ctx, amount)?;

        let escrow = &mut ctx.accounts.escrow;
        escrow.status = EscrowStatus::Completed;
        escrow.completed_at = clock.unix_timestamp;

        emit!(PaymentReleased {
            escrow_id: escrow.escrow_id,
            freelancer: ctx.accounts.freelancer.key(),
            amount,
            completed_at: escrow.completed_at,
        });

        Ok(())
    }

    //  6. CANCEL (no funds in vault)
    // Client cancels before deposit. No SOL to move — just closes accounts.
    // Allowed when status is: Created or Accepted
    pub fn cancel(ctx: Context<Cancel>) -> Result<()> {
        let escrow = &mut ctx.accounts.escrow;

        require!(
            ctx.accounts.client.key() == escrow.client,
            EscrowError::Unauthorized
        );
        require!(
            escrow.status == EscrowStatus::Created || escrow.status == EscrowStatus::Accepted,
            EscrowError::CannotCancel
        );

        escrow.status = EscrowStatus::Cancelled;

        emit!(EscrowCancelled {
            escrow_id: escrow.escrow_id,
            client: ctx.accounts.client.key(),
        });

        Ok(())
    }

    //  7. REFUND (funds are in vault)
    // Client reclaims SOL from vault after deadline passes without completion.
    // Allowed when status is: Funded or ProofSubmitted AND deadline has passed.
    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        // Copy values BEFORE mutable borrow — borrow checker requires this
        let escrow_key = ctx.accounts.escrow.key();
        let amount = ctx.accounts.escrow.amount;
        let vault_bump = ctx.accounts.escrow.vault_bump;
        let escrow_id = ctx.accounts.escrow.escrow_id;

        // Validate in immutable scope
        require!(
            ctx.accounts.client.key() == ctx.accounts.escrow.client,
            EscrowError::Unauthorized
        );
        require!(
            ctx.accounts.escrow.status == EscrowStatus::Funded
                || ctx.accounts.escrow.status == EscrowStatus::ProofSubmitted,
            EscrowError::InvalidStatus
        );
        let clock = Clock::get()?;
        require!(
            clock.unix_timestamp >= ctx.accounts.escrow.deadline,
            EscrowError::DeadlineNotPassed
        );

        let seeds = &[b"vault".as_ref(), escrow_key.as_ref(), &[vault_bump]];
        let signer = &[&seeds[..]];

        // Transfer SOL from vault PDA → client
        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.vault.to_account_info(),
                to: ctx.accounts.client.to_account_info(),
            },
            signer,
        );
        system_program::transfer(cpi_ctx, amount)?;

        // Now take mutable borrow to update status
        ctx.accounts.escrow.status = EscrowStatus::Cancelled;

        emit!(EscrowRefunded {
            escrow_id,
            client: ctx.accounts.client.key(),
            amount,
        });

        Ok(())
    }

    //  8. CLOSE ESCROW
    // Reclaims rent from both escrow + vault accounts back to client.
    // Must be called AFTER the escrow is Completed or Cancelled.
    // Vault must be empty (lamports == 0 beyond rent) before closing.
    pub fn close_escrow(ctx: Context<CloseEscrow>) -> Result<()> {
        // Copy before any borrow conflicts
        let escrow_key = ctx.accounts.escrow.key();
        let vault_bump = ctx.accounts.escrow.vault_bump;
        let escrow_id = ctx.accounts.escrow.escrow_id;

        require!(
            ctx.accounts.client.key() == ctx.accounts.escrow.client,
            EscrowError::Unauthorized
        );
        require!(
            ctx.accounts.escrow.status == EscrowStatus::Completed
                || ctx.accounts.escrow.status == EscrowStatus::Cancelled,
            EscrowError::CannotClose
        );

        // Drain any remaining lamports from vault → client (handles rent)
        let vault_lamports = ctx.accounts.vault.lamports();
        if vault_lamports > 0 {
            let seeds = &[b"vault".as_ref(), escrow_key.as_ref(), &[vault_bump]];
            let signer = &[&seeds[..]];

            let cpi_ctx = CpiContext::new_with_signer(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.vault.to_account_info(),
                    to: ctx.accounts.client.to_account_info(),
                },
                signer,
            );
            system_program::transfer(cpi_ctx, vault_lamports)?;
        }

        // escrow account is closed via `close = client` in the constraint below
        // rent lamports flow back to client automatically

        emit!(EscrowClosed {
            escrow_id,
            client: ctx.accounts.client.key(),
        });

        Ok(())
    }
}

//  Account Contexts

#[derive(Accounts)]
#[instruction(escrow_id: u64)]
pub struct CreateEscrow<'info> {
    // Escrow state PDA: seeds = ["escrow", client, escrow_id]
    #[account(
        init,
        payer  = client,
        space  = EscrowState::SIZE,
        seeds  = [b"escrow", client.key().as_ref(), &escrow_id.to_le_bytes()],
        bump
    )]
    pub escrow: Account<'info, EscrowState>,

    // Vault PDA: seeds = ["vault", escrow_pubkey]
    // space = 0 — holds no data, only SOL
    // This must be initialized here so it exists when deposit() is called.
    #[account(
        init,
        payer  = client,
        space  = 0,
        seeds  = [b"vault", escrow.key().as_ref()],
        bump
    )]
    /// CHECK: vault holds SOL only, no data. Owned by this program via PDA.
    pub vault: AccountInfo<'info>,

    #[account(mut)]
    pub client: Signer<'info>,

    /// CHECK: freelancer address is stored, not required to sign at creation
    pub freelancer: AccountInfo<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AcceptJob<'info> {
    #[account(
        mut,
        seeds = [b"escrow", escrow.client.as_ref(), &escrow.escrow_id.to_le_bytes()],
        bump  = escrow.bump
    )]
    pub escrow: Account<'info, EscrowState>,

    pub freelancer: Signer<'info>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(
        mut,
        seeds = [b"escrow", escrow.client.as_ref(), &escrow.escrow_id.to_le_bytes()],
        bump  = escrow.bump
    )]
    pub escrow: Account<'info, EscrowState>,

    #[account(
        mut,
        seeds = [b"vault", escrow.key().as_ref()],
        bump  = escrow.vault_bump
    )]
    /// CHECK: vault PDA, initialized in create_escrow, holds SOL only
    pub vault: AccountInfo<'info>,

    #[account(mut)]
    pub client: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SubmitProof<'info> {
    #[account(
        mut,
        seeds = [b"escrow", escrow.client.as_ref(), &escrow.escrow_id.to_le_bytes()],
        bump  = escrow.bump
    )]
    pub escrow: Account<'info, EscrowState>,

    pub freelancer: Signer<'info>,
}

#[derive(Accounts)]
pub struct ReleasePayment<'info> {
    #[account(
        mut,
        seeds = [b"escrow", escrow.client.as_ref(), &escrow.escrow_id.to_le_bytes()],
        bump  = escrow.bump
    )]
    pub escrow: Account<'info, EscrowState>,

    #[account(
        mut,
        seeds = [b"vault", escrow.key().as_ref()],
        bump  = escrow.vault_bump
    )]
    /// CHECK: vault PDA, funds transferred out to freelancer
    pub vault: AccountInfo<'info>,

    #[account(mut)]
    /// CHECK: freelancer receives SOL payment
    pub freelancer: AccountInfo<'info>,

    pub client: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Cancel<'info> {
    #[account(
        mut,
        seeds = [b"escrow", escrow.client.as_ref(), &escrow.escrow_id.to_le_bytes()],
        bump  = escrow.bump
    )]
    pub escrow: Account<'info, EscrowState>,

    pub client: Signer<'info>,
}

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(
        mut,
        seeds = [b"escrow", escrow.client.as_ref(), &escrow.escrow_id.to_le_bytes()],
        bump  = escrow.bump
    )]
    pub escrow: Account<'info, EscrowState>,

    #[account(
        mut,
        seeds = [b"vault", escrow.key().as_ref()],
        bump  = escrow.vault_bump
    )]
    /// CHECK: vault PDA, funds returned to client
    pub vault: AccountInfo<'info>,

    #[account(mut)]
    pub client: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CloseEscrow<'info> {
    #[account(
        mut,
        close  = client,   // ← Anchor closes this account and sends rent to client
        seeds  = [b"escrow", escrow.client.as_ref(), &escrow.escrow_id.to_le_bytes()],
        bump   = escrow.bump
    )]
    pub escrow: Account<'info, EscrowState>,

    #[account(
        mut,
        seeds = [b"vault", escrow.key().as_ref()],
        bump  = escrow.vault_bump
    )]
    /// CHECK: vault PDA, any remaining lamports drained to client before close
    pub vault: AccountInfo<'info>,

    #[account(mut)]
    pub client: Signer<'info>,

    pub system_program: Program<'info, System>,
}

//  State

#[account]
pub struct EscrowState {
    pub escrow_id: u64,       //  8
    pub client: Pubkey,       // 32
    pub freelancer: Pubkey,   // 32
    pub amount: u64,          //  8
    pub deadline: i64,        //  8
    pub status: EscrowStatus, //  1
    pub proof_url: String,    //  4 + 200
    pub description: String,  //  4 + 200
    pub created_at: i64,      //  8
    pub accepted_at: i64,     //  8
    pub funded_at: i64,       //  8
    pub completed_at: i64,    //  8
    pub bump: u8,             //  1
    pub vault_bump: u8,       //  1
}

impl EscrowState {
    pub const SIZE: usize = 8   // Anchor discriminator
        + 8   // escrow_id
        + 32  // client
        + 32  // freelancer
        + 8   // amount
        + 8   // deadline
        + 1   // status
        + (4 + 200) // proof_url
        + (4 + 200) // description
        + 8   // created_at
        + 8   // accepted_at
        + 8   // funded_at
        + 8   // completed_at
        + 1   // bump
        + 1; // vault_bump
             // Total: 540 bytes
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub enum EscrowStatus {
    Created,
    Accepted,
    Funded,
    ProofSubmitted,
    Completed,
    Cancelled,
}

//  Events

#[event]
pub struct EscrowCreated {
    pub escrow_id: u64,
    pub client: Pubkey,
    pub freelancer: Pubkey,
    pub amount: u64,
    pub deadline: i64,
    pub description: String,
}

#[event]
pub struct JobAccepted {
    pub escrow_id: u64,
    pub freelancer: Pubkey,
    pub accepted_at: i64,
}

#[event]
pub struct EscrowFunded {
    pub escrow_id: u64,
    pub amount: u64,
    pub funded_at: i64,
}

#[event]
pub struct ProofSubmitted {
    pub escrow_id: u64,
    pub freelancer: Pubkey,
    pub proof_url: String,
}

#[event]
pub struct PaymentReleased {
    pub escrow_id: u64,
    pub freelancer: Pubkey,
    pub amount: u64,
    pub completed_at: i64,
}

#[event]
pub struct EscrowRefunded {
    pub escrow_id: u64,
    pub client: Pubkey,
    pub amount: u64,
}

#[event]
pub struct EscrowCancelled {
    pub escrow_id: u64,
    pub client: Pubkey,
}

#[event]
pub struct EscrowClosed {
    pub escrow_id: u64,
    pub client: Pubkey,
}

//  Errors

#[error_code]
pub enum EscrowError {
    #[msg("Escrow status does not allow this action")]
    InvalidStatus,
    #[msg("You are not authorized for this action")]
    Unauthorized,
    #[msg("Amount must be greater than zero")]
    InvalidAmount,
    #[msg("Deadline must be in the future")]
    DeadlineInPast,
    #[msg("Deadline has already passed")]
    DeadlinePassed,
    #[msg("Deadline has not passed yet — refund not available")]
    DeadlineNotPassed,
    #[msg("Description must be 200 characters or less")]
    DescriptionTooLong,
    #[msg("Proof URL cannot be empty")]
    ProofUrlEmpty,
    #[msg("Proof URL must be 200 characters or less")]
    ProofUrlTooLong,
    #[msg("Cannot cancel: escrow has funds — use refund after deadline")]
    CannotCancel,
    #[msg("Cannot close: escrow must be Completed or Cancelled first")]
    CannotClose,
}
