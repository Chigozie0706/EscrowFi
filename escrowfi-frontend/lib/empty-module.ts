// Stub for Solana mobile wallet adapter — not needed for web builds
// Must export constructable classes to satisfy wallet-adapter-react internals

export class SolanaMobileWalletAdapter {
  name = "SolanaMobileWalletAdapter";
  url = "";
  icon = "";
  readyState = "Unsupported";
  publicKey = null;
  connecting = false;
  connected = false;
  connect = async () => {};
  disconnect = async () => {};
  sendTransaction = async () => { throw new Error("Not supported"); };
  supportedTransactionVersions = null;
}

export const SolanaMobileWalletAdapterWalletName = "SolanaMobileWalletAdapter";
export const createDefaultAddressSelector = () => null;
export const createDefaultAuthorizationResultCache = () => null;
export const createDefaultWalletNotFoundHandler = () => () => {};
export const useStandardWalletAdapters = (adapters: any) => adapters ?? [];

export default {};