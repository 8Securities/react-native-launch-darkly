import { LaunchDarkly } from "./client";
import * as React from "react";
export interface FlagsConsumerProps {
    flagsClient?: LaunchDarkly;
}
declare function withFlagsConsumer(): <P>(WrappedComponent: React.ComponentType<P & FlagsConsumerProps>) => (props: P) => JSX.Element;
export default withFlagsConsumer;
