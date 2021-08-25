import { BaseItem } from "@algolia/autocomplete-core";

import { MetaSearchPlugin } from "./types";

type PluginProps = {};

export function createListenerPlugin<TItem extends BaseItem>(
  props: PluginProps
): MetaSearchPlugin<TItem, undefined> {
  return {
    subscribe({ onActive, setContext }) {
      onActive(({ item, source }) => {
        setContext({ source, item });
      });
    },
  };
}
