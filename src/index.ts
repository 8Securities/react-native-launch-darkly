import BoolFlag from "./components/BoolFlag";
import withFlagsConsumer, {
  FlagsConsumerProps
} from "./components/withFlagsConsumer";
import withFlagsProvider, {
  ProviderConfig
} from "./components/withFlagsProvider";
import { LaunchDarkly } from "./components/client";

export interface ClientOptions {
  streaming?: boolean;
  baseUrl?: string;
  eventsUrl?: string;
}

export interface UserOptions {
  key?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  isAnonymous?: boolean;
}

export {
  LaunchDarkly,
  BoolFlag,
  withFlagsConsumer,
  FlagsConsumerProps,
  withFlagsProvider,
  ProviderConfig
};
