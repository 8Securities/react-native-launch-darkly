"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var client_1 = require("./client");
var LaunchDarklyContext = react_1.default.createContext(null);
function FlagsProvider(_a) {
    var client = _a.client, children = _a.children, apiKey = _a.apiKey, options = _a.options, userOptions = _a.userOptions;
    if (!client) {
        client = new client_1.LaunchDarkly();
    }
    client.configure(apiKey, options, userOptions);
    return (<LaunchDarklyContext.Provider value={client}>
      {children}
    </LaunchDarklyContext.Provider>);
}
exports.FlagsProvider = FlagsProvider;
function useFlagsClient() {
    var client = react_1.useContext(LaunchDarklyContext);
    return client;
}
exports.useFlagsClient = useFlagsClient;
