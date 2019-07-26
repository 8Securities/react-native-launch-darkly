"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var FlagsProvider_1 = require("./FlagsProvider");
function useBoolFlag(name, defaultValue) {
    if (defaultValue === void 0) { defaultValue = false; }
    var client = FlagsProvider_1.useFlagsClient();
    var _a = react_1.useState(defaultValue), value = _a[0], setValue = _a[1];
    var updateFlag = function (val) { return setValue(val); };
    react_1.useEffect(function () {
        if (client) {
            client
                .boolVariation(name)
                .then(function (val) {
                updateFlag(val);
            })
                .catch();
            client.addFeatureFlagChangeListener(name, updateFlag);
        }
        return function () {
            // on unmount
            // client.removeFeatureFlagChangeListener(name, updateFlag)
        };
    }, [client]);
    return [value];
}
exports.useBoolFlag = useBoolFlag;
