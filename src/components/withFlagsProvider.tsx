import { FlagsProvider, FlagsContext } from "./context";
import * as React from "react";
import { ClientOptions, UserOptions } from "..";
import { LaunchDarkly } from "./client";
// import { initFlagsClient } from "./client";

export interface ProviderConfig {
  env: string;
  options: ClientOptions;
  user?: UserOptions;
}

function withFlagsProvider(config: ProviderConfig) {
  return function withFlagsProviderHoc<P>(
    WrappedComponent: React.ComponentType<P>
  ) {
    return class extends React.Component<P, FlagsContext> {
      readonly state: Readonly<FlagsContext>;

      constructor(props: P) {
        super(props);

        this.state = {
          flagsClient: undefined
        };
      }

      async componentDidMount() {
        const { env, options, user } = config;
        const flagsClient = new LaunchDarkly();
        await flagsClient.configure(env, options, user);
        this.setState({ flagsClient });
      }

      render() {
        return (
          <FlagsProvider value={this.state}>
            <WrappedComponent {...this.props} />
          </FlagsProvider>
        );
      }
    };
  };
}

export default withFlagsProvider;
