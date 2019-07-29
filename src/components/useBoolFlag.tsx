import { useEffect, useState } from "react";
import { useFlagsClient } from "./FlagsProvider";

export function useBoolFlag(name: string, defaultValue = false) {
  const client = useFlagsClient();
  const [value, setValue] = useState(defaultValue);
  const updateFlag = (val: boolean) => setValue(val);

  useEffect(
    () => {
      if (client) {
        client
          .boolVariation(name)
          .then(val => {
            updateFlag(val);
          })
          .catch();
        client.addFeatureFlagChangeListener(name, updateFlag);
      }
      return () => {
        // on unmount
        // client.removeFeatureFlagChangeListener(name, updateFlag)
      };
    },
    [client]
  );

  return [value];
}
