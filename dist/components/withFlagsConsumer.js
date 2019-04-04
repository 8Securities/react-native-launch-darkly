"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("./context");
var React = __importStar(require("react"));
function withFlagsConsumer() {
    return function withFlagsConsumerHoc(WrappedComponent) {
        return function (props) { return (<context_1.FlagsConsumer>
        {function (_a) {
            var client = _a.flagsClient;
            return <WrappedComponent flagsClient={client} {...props}/>;
        }}
      </context_1.FlagsConsumer>); };
    };
}
exports.default = withFlagsConsumer;
