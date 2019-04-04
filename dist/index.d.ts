declare class LaunchDarkly {
    emitter: any;
    listeners: any;
    constructor();
    configure(apiKey: string, options: any, userOptions: any): any;
    identify(userOptions: any): void;
    allFlags(): any;
    boolVariation(featureName: string): any;
    stringVariation(featureName: string, fallback?: string): any;
    addFeatureFlagChangeListener(featureName: string, callback: any): void;
    unsubscribe(): void;
}
declare const _default: LaunchDarkly;
export default _default;
