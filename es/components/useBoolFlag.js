import { useEffect, useState } from "react";
import { useFlagsClient } from "./FlagsProvider";
export function useBoolFlag(name, defaultValue) {
  if (defaultValue === void 0) {
    defaultValue = false;
  }

  var client = useFlagsClient();

  var _useState = useState(defaultValue),
      value = _useState[0],
      setValue = _useState[1];

  var updateFlag = function updateFlag(val) {
    return setValue(val);
  };

  useEffect(function () {
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