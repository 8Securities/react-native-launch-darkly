import { NativeEventEmitter, NativeModules, Platform } from "react-native";
const { RNLaunchDarkly } = NativeModules;
class LaunchDarkly {
  emitter: any;
  listeners: any;

  constructor() {
    this.emitter = new NativeEventEmitter(RNLaunchDarkly);
    this.listeners = {};
  }
  configure(apiKey: string, options: any, userOptions: any) {
    return RNLaunchDarkly.configure(apiKey, options, userOptions);
  }
  identify(userOptions: any) {
    RNLaunchDarkly.identify(userOptions);
  }
  allFlags() {
    return RNLaunchDarkly.allFlags();
  }
  boolVariation(featureName: string) {
    return RNLaunchDarkly.boolVariation(featureName);
  }
  stringVariation(featureName: string, fallback?: string) {
    return RNLaunchDarkly.stringVariation(featureName, fallback);
  }
  addFeatureFlagChangeListener(featureName: string, callback: any) {
    if (Platform.OS === "android") {
      RNLaunchDarkly.addFeatureFlagChangeListener(featureName);
    }
    if (this.listeners[featureName]) {
      return;
    }
    this.listeners[featureName] = this.emitter.addListener(
      "FeatureFlagChanged",
      ({ flagName }: { flagName: string }) => {
        if (flagName === featureName) {
          callback(flagName);
        }
      }
    );
  }
  unsubscribe() {
    Object.keys(this.listeners).forEach(featureName => {
      this.listeners[featureName].remove();
    });
    this.listeners = {};
  }
}
export default new LaunchDarkly();
