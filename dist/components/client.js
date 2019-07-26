"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var RNLaunchDarkly = react_native_1.NativeModules.RNLaunchDarkly;
var LaunchDarkly = /** @class */ (function () {
    function LaunchDarkly() {
        this.emitter = new react_native_1.NativeEventEmitter(RNLaunchDarkly);
        this.listeners = {};
    }
    LaunchDarkly.prototype.configure = function (apiKey, options, userOptions) {
        var u = userOptions || { isAnonymous: true };
        return RNLaunchDarkly.configure(apiKey, options, u);
    };
    LaunchDarkly.prototype.identify = function (userOptions) {
        RNLaunchDarkly.identify(userOptions);
    };
    LaunchDarkly.prototype.allFlags = function () {
        return RNLaunchDarkly.allFlags();
    };
    LaunchDarkly.prototype.boolVariation = function (featureName) {
        return RNLaunchDarkly.boolVariation(featureName).then(function (result) {
            if (Array.isArray(result)) {
                return result[0];
            }
            else {
                return result;
            }
        });
    };
    LaunchDarkly.prototype.stringVariation = function (featureName, fallback) {
        return RNLaunchDarkly.stringVariation(featureName, fallback).then(function (result) {
            if (Array.isArray(result)) {
                return result[0];
            }
            else {
                return result;
            }
        });
    };
    LaunchDarkly.prototype.addFeatureFlagChangeListener = function (featureName, callback) {
        if (react_native_1.Platform.OS === "android") {
            RNLaunchDarkly.addFeatureFlagChangeListener(featureName);
        }
        if (this.listeners[featureName]) {
            return;
        }
        this.listeners[featureName] = this.emitter.addListener("FeatureFlagChanged", function (_a) {
            var flagName = _a.flagName;
            if (flagName === featureName) {
                callback(flagName);
            }
        });
    };
    LaunchDarkly.prototype.unsubscribe = function () {
        var _this = this;
        Object.keys(this.listeners).forEach(function (featureName) {
            _this.listeners[featureName].remove();
        });
        this.listeners = {};
    };
    return LaunchDarkly;
}());
exports.LaunchDarkly = LaunchDarkly;
