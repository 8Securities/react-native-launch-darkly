/// <reference types="react" />
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
declare const _default: (props: Props) => JSX.Element;
export default _default;
