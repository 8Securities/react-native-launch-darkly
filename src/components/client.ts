import { NativeEventEmitter, NativeModules, Platform } from "react-native";
import { ClientOptions, UserOptions } from "..";
const { RNLaunchDarkly } = NativeModules;

class LaunchDarkly {
  private emitter: any;
  private listeners: any;

  constructor() {
    this.emitter = new NativeEventEmitter(RNLaunchDarkly);
    this.listeners = {};
  }
  configure(
    apiKey: string,
    options: ClientOptions,
    userOptions?: UserOptions
  ): Promise<void> {
    const u = userOptions || { isAnonymous: true };
    return RNLaunchDarkly.configure(apiKey, options, u);
  }
  identify(userOptions: any) {
    RNLaunchDarkly.identify(userOptions);
  }
  allFlags() {
    return RNLaunchDarkly.allFlags();
  }
  boolVariation(featureName: string): Promise<boolean> {
    return RNLaunchDarkly.boolVariation(featureName);
  }
  stringVariation(featureName: string, fallback?: string): Promise<string> {
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

// export interface FeatureFlagsCollection {
//   [key: string]: FlagValue;
// }

// export interface FlagsClient {
//   identify(user: UserOptions): void;
//   allFlags(): Promise<FeatureFlagsCollection>;
//   boolVariation(flag: string): Promise<boolean>;
//   stringVariation(flag: string, defaultValue: string): Promise<string>;
//   addFeatureFlagChangeListener(
//     flag: string,
//     listener: (...args: any[]) => void,
//   ): void;
//   removeFeatureFlagChangeListener(
//     flag: string,
//     listener: (...args: any[]) => void,
//   ): void;
// }

const initFlagsClient = (
  env: string,
  options: ClientOptions,
  user?: UserOptions
): Promise<{ flagsClient: LaunchDarkly }> => {
  return new Promise(resolve => {
    const ld = new LaunchDarkly();
    ld.configure(env, options, user).then(async () => {
      resolve({ flagsClient: ld });
    });
  });
};

export { initFlagsClient, LaunchDarkly };
