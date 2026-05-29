export declare const REASON_SAFETY_NET_FAILED_CLOSED = "Safety Net failed closed because command analysis failed unexpectedly.";
export declare function readHookInput<T>(outputDeny: (reason: string) => void): Promise<T | null>;
export declare function parseHookJson<T>(inputText: string, outputDeny: (reason: string) => void, strictReason: string): T | null;
export declare function handleBlockedHookCommand(command: string, cwd: string, sessionId: string | undefined, outputDeny: (reason: string, command?: string, segment?: string) => void): void;
