import { NativeEventEmitter, NativeModules, Platform } from "react-native";
import { ClientOptions, UserOptions } from "..";
const { RNLaunchDarkly } = NativeModules;

export class LaunchDarkly {
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
    return RNLaunchDarkly.boolVariation(featureName).then((result: any) => {
      if (Array.isArray(result)) {
        return result[0];
      } else {
        return result;
      }
    });
  }

  stringVariation(featureName: string, fallback?: string): Promise<string> {
    return RNLaunchDarkly.stringVariation(featureName, fallback).then(
      (result: any) => {
        if (Array.isArray(result)) {
          return result[0];
        } else {
          return result;
        }
      }
    );
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
