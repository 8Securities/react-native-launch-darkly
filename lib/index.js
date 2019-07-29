"use strict";

exports.__esModule = true;

var _FlagsProvider = require("./components/FlagsProvider");

exports.FlagsProvider = _FlagsProvider.FlagsProvider;
exports.FlagsProviderProps = _FlagsProvider.FlagsProviderProps;
exports.useFlagsClient = _FlagsProvider.useFlagsClient;

var _client = require("./components/client");

exports.LaunchDarkly = _client.LaunchDarkly;

var _useBoolFlag = require("./components/useBoolFlag");

exports.useBoolFlag = _useBoolFlag.useBoolFlag;