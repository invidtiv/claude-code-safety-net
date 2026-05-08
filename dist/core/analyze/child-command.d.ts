export interface ChildCommandContext {
    cwd: string | undefined;
    envAssignments?: ReadonlyMap<string, string>;
}
export declare function normalizeChildCommand(tokens: readonly string[], context: ChildCommandContext): {
    tokens: string[];
    cwd: string | undefined;
    wrapperCwd: string | null | undefined;
    envAssignments: Map<string, string>;
    head: string;
};
export declare function collectCommandTemplate(tokens: readonly string[], start: number): {
    markerIndex: number;
    templateTokens: string[];
};
