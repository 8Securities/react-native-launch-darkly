import React, { ReactNode, ReactElement, useContext } from "react";
import { LaunchDarkly } from "./client";
import { ClientOptions, UserOptions } from "..";

const LaunchDarklyContext = React.createContext<null | LaunchDarkly>(null);

export interface FlagsProviderProps {
  readonly children?: ReactNode;
  readonly client?: LaunchDarkly;
  readonly apiKey: string;
  options: ClientOptions;
  userOptions?: UserOptions;
}

export function FlagsProvider({
  client,
  children,
  apiKey,
  options,
  userOptions
}: FlagsProviderProps): ReactElement<FlagsProviderProps> {
  if (!client) {
    client = new LaunchDarkly();
  }
  client.configure(apiKey, options, userOptions);
  return (
    <LaunchDarklyContext.Provider value={client}>
      {children}
    </LaunchDarklyContext.Provider>
  );
}

export function useFlagsClient() {
  const client = useContext(LaunchDarklyContext);

  return client;
}
