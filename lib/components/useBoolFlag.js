"use strict";

exports.__esModule = true;
exports.useBoolFlag = useBoolFlag;

var _react = require("react");

var _FlagsProvider = require("./FlagsProvider");

function useBoolFlag(name, defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = false;
  }

  var client = (0, _FlagsProvider.useFlagsClient)();

  var _useState = (0, _react.useState)(defaultValue),
      value = _useState[0],
      setValue = _useState[1];

  var updateFlag = function updateFlag(val) {
    return setValue(val);
  };

  (0, _react.useEffect)(function () {
    if (client) {
      client.boolVariation(name).then(function (val) {
        updateFlag(val);
      })["catch"]();
      client.addFeatureFlagChangeListener(name, updateFlag);
    }

    return function () {// on unmount
      // client.removeFeatureFlagChangeListener(name, updateFlag)
    };
  }, [client]);
  return [value];
}