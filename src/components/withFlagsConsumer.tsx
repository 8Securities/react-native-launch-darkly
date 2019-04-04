import { FlagsConsumer, FlagsContext } from "./context";
import { LaunchDarkly } from "./client";
import * as React from "react";

export interface FlagsConsumerProps {
  flagsClient?: LaunchDarkly;
}

function withFlagsConsumer() {
  return function withFlagsConsumerHoc<P>(
    WrappedComponent: React.ComponentType<P & FlagsConsumerProps>
  ) {
    return (props: P) => (
      <FlagsConsumer>
        {({ flagsClient: client }: FlagsContext) => {
          return <WrappedComponent flagsClient={client} {...props} />;
        }}
      </FlagsConsumer>
    );
  };
}

export default withFlagsConsumer;
