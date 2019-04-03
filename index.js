import
{
    NativeEventEmitter,
    NativeModules,
    Platform
}
from 'react-native';
const
{
    RNLaunchDarkly
} = NativeModules;
class LaunchDarkly
{
    constructor()
    {
        this.emitter = new NativeEventEmitter(RNLaunchDarkly);
        this.listeners = {};
    }
    configure(apiKey, options, userOptions)
    {
        return RNLaunchDarkly.configure(apiKey, options, userOptions);
    }
    identify(userOptions)
    {
        RNLaunchDarkly.identify(userOptions);
    }
    allFlags()
    {
        return RNLaunchDarkly.allFlags();
    }
    boolVariation(featureName)
    {
        return RNLaunchDarkly.boolVariation(featureName);
    }
    stringVariation(featureName, fallback)
    {
        return RNLaunchDarkly.stringVariation(featureName, fallback);
    }
    addFeatureFlagChangeListener(featureName, callback)
    {
        if (Platform.OS === 'android')
        {
            RNLaunchDarkly.addFeatureFlagChangeListener(featureName);
        }
        if (this.listeners[featureName])
        {
            return;
        }
        this.listeners[featureName] = this.emitter.addListener('FeatureFlagChanged',
            (
            {
                flagName
            }) =>
            {
                if (flagName === featureName)
                {
                    callback(flagName);
                }
            }, );
    }
    unsubscribe()
    {
        Object.keys(this.listeners)
            .forEach((featureName) =>
            {
                this.listeners[featureName].remove();
            });
        this.listeners = {};
    }
}
export default new LaunchDarkly();
