import {
  AutocompleteOptions,
  createAutocomplete,
} from "@algolia/autocomplete-core";
import { useMemo, useState } from "react";

import { MetaSearchItem, MetaSearchState } from "../components/types";

export function useAutocomplete(props: AutocompleteOptions<MetaSearchItem>) {
  const [state, setState] = useState<MetaSearchState>(() => ({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: "",
    activeItemId: null,
    status: "idle",
  }));

  const autocomplete = useMemo(
    () =>
      createAutocomplete<
        MetaSearchItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        ...props,
        onStateChange(params) {
          props.onStateChange?.(params);
          setState(params.state);
        },
      }),
    []
  );

  return { autocomplete, state };
}
