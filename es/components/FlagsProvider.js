import React, { useContext } from "react";
import { LaunchDarkly } from "./client";
var LaunchDarklyContext = React.createContext(null);
export function FlagsProvider(_ref) {
  var client = _ref.client,
      children = _ref.children,
      apiKey = _ref.apiKey,
      options = _ref.options,
      userOptions = _ref.userOptions;

  if (!client) {
    client = new LaunchDarkly();
  }

  client.configure(apiKey, options, userOptions);
  return React.createElement(LaunchDarklyContext.Provider, {
    value: client
  }, children);
}
export function useFlagsClient() {
  var client = useContext(LaunchDarklyContext);
  return client;
}