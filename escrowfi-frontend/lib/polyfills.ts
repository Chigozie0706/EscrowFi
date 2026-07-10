import { Buffer } from "buffer";

// Polyfill Buffer for both browser and SSR environments
if (typeof globalThis !== "undefined") {
  (globalThis as any).Buffer = (globalThis as any).Buffer ?? Buffer;
}
if (typeof window !== "undefined") {
  (window as any).Buffer = (window as any).Buffer ?? Buffer;
}