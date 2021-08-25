import React from "react";
import {
  AutocompleteOptions,
  createAutocomplete,
} from "@algolia/autocomplete-core";
import { Hit } from "@algolia/client-search";

import { ClearIcon } from "./ClearIcon";
import { SearchIcon } from "./SearchIcon";
import { createListenerPlugin } from "./MetaSearchPluginListener";

import { MetaSearchPanelSwitch } from "./MetaSearchPanelSwitch";
import "@algolia/autocomplete-theme-classic";

import { createNavigationPlugin } from "./MetaSearchPluginNavigation";
import { MetaSearchItem, MetaSearchSource, MetaSearchState } from "./types";
import { createDocsPlugin } from "./MetaSearchPluginDocs";

export function Autocomplete(
  props: Partial<AutocompleteOptions<MetaSearchItem>>
) {
  const [autocompleteState, setAutocompleteState] =
    React.useState<MetaSearchState>({
      collections: [],
      completion: null,
      context: {},
      isOpen: false,
      query: "",
      activeItemId: null,
      status: "idle",
    });
  const autocomplete = React.useMemo(
    () =>
      createAutocomplete<
        MetaSearchItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        id: "meta-search",
        openOnFocus: true,
        defaultActiveItemId: 0,
        plugins: [
          createListenerPlugin({}),
          createNavigationPlugin(),
          createDocsPlugin(),
        ],
        onStateChange({ state }) {
          setAutocompleteState(state);
        },

        ...props,
      }),
    [props]
  );
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const { getEnvironmentProps } = autocomplete;

  React.useEffect(() => {
    if (!formRef.current || !panelRef.current || !inputRef.current) {
      return undefined;
    }

    const { onTouchStart, onTouchMove } = getEnvironmentProps({
      formElement: formRef.current,
      inputElement: inputRef.current,
      panelElement: panelRef.current,
    });

    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [getEnvironmentProps, formRef, inputRef, panelRef]);

  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <form
        ref={formRef}
        className="aa-Form"
        {...autocomplete.getFormProps({ inputElement: inputRef.current })}
      >
        <div className="aa-InputWrapperPrefix">
          <label className="aa-Label" {...autocomplete.getLabelProps({})}>
            <button className="aa-SubmitButton" type="submit" title="Submit">
              <SearchIcon />
            </button>
          </label>
        </div>
        <div className="aa-InputWrapper">
          <input
            className="aa-Input"
            ref={inputRef}
            {...autocomplete.getInputProps({ inputElement: inputRef.current })}
          />
        </div>
        <div className="aa-InputWrapperSuffix">
          <button className="aa-ClearButton" title="Clear" type="reset">
            <ClearIcon />
          </button>
        </div>
      </form>

      <div
        ref={panelRef}
        className={[
          "aa-Panel",
          "aa-Panel--desktop",
          autocompleteState.status === "stalled" && "aa-Panel--stalled",
        ]
          .filter(Boolean)
          .join(" ")}
        {...autocomplete.getPanelProps({})}
      >
        <div className="aa-PanelLayout aa-Panel--scrollable">
          {autocompleteState.collections.map((collection, index) => {
            const items = collection.items;
            const source = collection.source as MetaSearchSource<any>;
            const { Header, Item } = source.components;

            return (
              items.length > 0 && (
                <section key={`source-${index}`} className="aa-Source">
                  {Header && (
                    <Header
                      items={items}
                      source={source}
                      state={autocompleteState}
                    />
                  )}

                  <ul className="aa-List" {...autocomplete.getListProps()}>
                    {items.map((item) => {
                      return (
                        <li
                          key={item.objectID}
                          className="aa-Item"
                          {...autocomplete.getItemProps({ item, source })}
                        >
                          <Item
                            item={item}
                            source={source}
                            state={autocompleteState}
                          />
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )
            );
          })}

          <aside>
            <MetaSearchPanelSwitch state={autocompleteState} fallback={null} />
          </aside>
        </div>
      </div>
    </div>
  );
}
