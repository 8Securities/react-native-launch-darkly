"use strict";

exports.__esModule = true;
exports.FlagsProvider = FlagsProvider;
exports.useFlagsClient = useFlagsClient;

var _react = _interopRequireWildcard(require("react"));

var _client = require("./client");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var LaunchDarklyContext = _react["default"].createContext(null);

function FlagsProvider(_ref) {
  var client = _ref.client,
      children = _ref.children,
      apiKey = _ref.apiKey,
      options = _ref.options,
      userOptions = _ref.userOptions;

  if (!client) {
    client = new _client.LaunchDarkly();
  }

  client.configure(apiKey, options, userOptions);
  return _react["default"].createElement(LaunchDarklyContext.Provider, {
    value: client
  }, children);
}

function useFlagsClient() {
  var client = (0, _react.useContext)(LaunchDarklyContext);
  return client;
}