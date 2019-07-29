"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("./client");
var react_2 = __importDefault(require("react"));
var LaunchDarklyContext = react_2.default.createContext(null);
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
