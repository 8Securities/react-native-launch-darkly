import { ClientOptions, UserOptions } from "..";
export declare class LaunchDarkly {
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
