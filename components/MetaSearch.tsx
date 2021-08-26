import React from "react";

import { ClearIcon } from "./ClearIcon";
import { SearchIcon } from "./SearchIcon";
import { createListenerPlugin } from "./MetaSearchPluginListener";

import { MetaSearchPanelSwitch } from "./MetaSearchPanelSwitch";
import "@algolia/autocomplete-theme-classic";

import { createNavigationPlugin } from "./MetaSearchPluginNavigation";
import { MetaSearchSource } from "./types";
import { createDocsPlugin } from "./MetaSearchPluginDocs";
import { useCloseVirtualKeyboardOnTouchMove } from "../hooks/useCloseVirtualKeyboardOnTouchMove";

import { useAutocomplete } from "../hooks";
import { useMemo } from "react";

export function MetaSearch() {
  const plugins = useMemo(
    () => [
      createListenerPlugin({}),
      createNavigationPlugin(),
      createDocsPlugin(),
    ],
    []
  );
  const { autocomplete, state } = useAutocomplete({
    id: "meta-search",
    openOnFocus: true,
    defaultActiveItemId: 0,
    plugins,
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  useCloseVirtualKeyboardOnTouchMove({ inputRef });

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
          state.status === "stalled" && "aa-Panel--stalled",
        ]
          .filter(Boolean)
          .join(" ")}
        {...autocomplete.getPanelProps({})}
      >
        <div className="aa-PanelLayout aa-Panel--scrollable">
          {state.collections.map((collection, index) => {
            const items = collection.items;
            const source = collection.source as MetaSearchSource<any>;
            const { Header, Item } = source.components;

            return (
              items.length > 0 && (
                <section key={`source-${index}`} className="aa-Source">
                  {Header && (
                    <Header items={items} source={source} state={state} />
                  )}

                  <ul className="aa-List" {...autocomplete.getListProps()}>
                    {items.map((item) => {
                      return (
                        <li
                          key={item.objectID}
                          className="aa-Item"
                          {...autocomplete.getItemProps({ item, source })}
                        >
                          <Item item={item} source={source} state={state} />
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )
            );
          })}

          <aside>
            <MetaSearchPanelSwitch state={state} fallback={null} />
          </aside>
        </div>
      </div>
    </div>
  );
}
