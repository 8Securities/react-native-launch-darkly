"use strict";

exports.__esModule = true;
exports.LaunchDarkly = void 0;

var _reactNative = require("react-native");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RNLaunchDarkly = _reactNative.NativeModules.RNLaunchDarkly;

var LaunchDarkly =
/*#__PURE__*/
function () {
  function LaunchDarkly() {
    _defineProperty(this, "emitter", void 0);

    _defineProperty(this, "listeners", void 0);

    this.emitter = new _reactNative.NativeEventEmitter(RNLaunchDarkly);
    this.listeners = {};
  }

  var _proto = LaunchDarkly.prototype;

  _proto.configure = function configure(apiKey, options, userOptions) {
    var u = userOptions || {
      isAnonymous: true
    };
    return RNLaunchDarkly.configure(apiKey, options, u);
  };

  _proto.identify = function identify(userOptions) {
    RNLaunchDarkly.identify(userOptions);
  };

  _proto.allFlags = function allFlags() {
    return RNLaunchDarkly.allFlags();
  };

  _proto.boolVariation = function boolVariation(featureName) {
    return RNLaunchDarkly.boolVariation(featureName).then(function (result) {
      if (Array.isArray(result)) {
        return result[0];
      } else {
        return result;
      }
    });
  };

  _proto.stringVariation = function stringVariation(featureName, fallback) {
    return RNLaunchDarkly.stringVariation(featureName, fallback).then(function (result) {
      if (Array.isArray(result)) {
        return result[0];
      } else {
        return result;
      }
    });
  };

  _proto.addFeatureFlagChangeListener = function addFeatureFlagChangeListener(featureName, callback) {
    if (_reactNative.Platform.OS === "android") {
      RNLaunchDarkly.addFeatureFlagChangeListener(featureName);
    }

    if (this.listeners[featureName]) {
      return;
    }

    this.listeners[featureName] = this.emitter.addListener("FeatureFlagChanged", function (_ref) {
      var flagName = _ref.flagName;

      if (flagName === featureName) {
        callback(flagName);
      }
    });
  };

  _proto.unsubscribe = function unsubscribe() {
    var _this = this;

    Object.keys(this.listeners).forEach(function (featureName) {
      _this.listeners[featureName].remove();
    });
    this.listeners = {};
  };

  return LaunchDarkly;
}();

exports.LaunchDarkly = LaunchDarkly;