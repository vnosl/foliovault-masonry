/// <reference types="vite/client" />

declare module '@chenglou/pretext' {
  export function prepare(input: string, options?: Record<string, unknown>): unknown
  export function layout(input: unknown, options?: Record<string, unknown>): unknown
}
