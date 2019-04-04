import { ClientOptions, UserOptions } from "..";
declare class LaunchDarkly {
    private emitter;
    private listeners;
    constructor();
    configure(apiKey: string, options: ClientOptions, userOptions?: UserOptions): Promise<void>;
    identify(userOptions: any): void;
    allFlags(): any;
    boolVariation(featureName: string): Promise<boolean>;
    stringVariation(featureName: string, fallback?: string): Promise<string>;
    addFeatureFlagChangeListener(featureName: string, callback: any): void;
    unsubscribe(): void;
}
declare const initFlagsClient: (env: string, options: ClientOptions, user?: UserOptions | undefined) => Promise<{
    flagsClient: LaunchDarkly;
}>;
export { initFlagsClient, LaunchDarkly };
