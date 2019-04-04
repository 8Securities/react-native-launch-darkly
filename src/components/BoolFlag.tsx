import { LaunchDarkly } from "./client";
import * as React from "react";
import withFlagsConsumer, { FlagsConsumerProps } from "./withFlagsConsumer";

/**
 * Makes the value of a boolean flag available to child components
 */

interface Props {
  flagName: string;
  children(state: BoolFlagsProps): JSX.Element;
}

export interface BoolFlagsProps {
  flagValue: boolean;
}

class BoolFlag extends React.Component<
  Props & FlagsConsumerProps,
  BoolFlagsProps
> {
  readonly state: Readonly<BoolFlagsProps>;

  constructor(props: Props & FlagsConsumerProps) {
    super(props);

    this.state = {
      flagValue: false
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
    }
  }

  componentWillUnmount() {
    // const { flagName, flagsClient } = this.props;
    // flagsClient.removeFeatureFlagChangeListener(flagName, this.updateFlag);
  }

  render() {
    const { children } = this.props;
    const { flagValue } = this.state;
    return <>{children({ flagValue })}</>;
  }
}

export default withFlagsConsumer()(BoolFlag);
