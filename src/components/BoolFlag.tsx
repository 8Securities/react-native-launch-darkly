import { LaunchDarkly } from "./client";
import * as React from "react";
import withFlagsConsumer, { FlagsConsumerProps } from "./withFlagsConsumer";

/**
 * Makes the value of a boolean flag available to child components
 */

interface Props {
  flagName: string;
  children(props: BoolFlagsProps): JSX.Element;
}

export interface BoolFlagsProps {
  flagValue: boolean;
}

interface State {
  flagValue?: boolean;
}

class BoolFlag extends React.Component<Props & FlagsConsumerProps, State> {
  readonly state: Readonly<State>;

  constructor(props: Props & FlagsConsumerProps) {
    super(props);

    this.state = {
      flagValue: undefined
    };
  }

  updateFlag = (data: boolean) => {
    this.setState(() => ({ flagValue: data }));
  };

  subscribeToChanges = (flagName: string, flagsClient: LaunchDarkly) => {
    flagsClient.addFeatureFlagChangeListener(flagName, this.updateFlag);
  };

  async componentDidMount() {
    const { flagsClient, flagName } = this.props;
    if (flagsClient !== undefined) {
      const flagValue = await flagsClient.boolVariation(flagName);
      this.setState({ flagValue });
      this.subscribeToChanges(flagName, flagsClient);
    } else {
      console.log("no client");
    }
  }

  componentWillUnmount() {
    // const { flagName, flagsClient } = this.props;
    // flagsClient.removeFeatureFlagChangeListener(flagName, this.updateFlag);
  }

  render() {
    const { children } = this.props;
    const { flagValue } = this.state;
    if (flagValue === undefined) {
      return null;
    } else {
      return <>{children({ flagValue })}</>;
    }
  }
}

export default withFlagsConsumer()(BoolFlag);
