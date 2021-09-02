import React, { useMemo, useEffect } from "react";
import { createTagsPlugin } from "@algolia/autocomplete-plugin-tags";

import { ClearIcon } from "./ClearIcon";
import { SearchIcon } from "./SearchIcon";
import { createListenerPlugin } from "./MetaSearchPluginListener";

import { MetaSearchPanelSwitch } from "./MetaSearchPanelSwitch";

import { createNavigationPlugin } from "./MetaSearchPluginNavigation";
import { createDocsPlugin } from "./MetaSearchPluginDocs";
import { createApplicationsPlugin } from "./MetaSearchPluginApplications";
import { createIndicesPlugin } from "./MetaSearchPluginIndices";
import { MetaSearchSource } from "./types";
import { useCloseVirtualKeyboardOnTouchMove } from "../hooks/useCloseVirtualKeyboardOnTouchMove";

import { useAutocomplete } from "../hooks";

type MetaSearchProps = {
  isOpen: boolean;
  onClose(): void;
};

export function MetaSearch({ isOpen, onClose }: MetaSearchProps) {
  const plugins = useMemo(
    () => [
      createListenerPlugin({}),
      createNavigationPlugin(),
      createApplicationsPlugin(),
      createIndicesPlugin(),
      createDocsPlugin(),
      createTagsPlugin({
        transformSource() {
          return undefined;
        },
      }),
    ],
    []
  );
  const { autocomplete, state } = useAutocomplete({
    id: "meta-search",
    openOnFocus: true,
    defaultActiveItemId: 0,
    plugins,
    initialState: {
      context: {
        root: "scope",
      },
    },
    reshape({ sourcesBySourceId, state }) {
      const { apps, indices, ...rest } = sourcesBySourceId;

      switch (state.context.root) {
        case "apps":
          return [apps];
        case "index":
          return [indices];
        default:
          return Object.values(rest);
      }
    },
  });
  const inputRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  useCloseVirtualKeyboardOnTouchMove({ inputRef });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && state.context.root !== "scope") {
        event.preventDefault();
        event.stopPropagation();

        autocomplete.setContext({ root: "scope" });
        autocomplete.refresh();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    autocomplete.setIsOpen(isOpen);

    if (!isOpen) {
      autocomplete.setCollections([]);
      autocomplete.setContext({});
      autocomplete.setQuery("");
      autocomplete.setActiveItemId(null);
      autocomplete.setStatus("idle");
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div>
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 opacity-40"
        onClick={onClose}
      />
      <div className="absolute top-40 left-80 right-80">
        <div
          className="aa-Autocomplete w-full bg-white rounded"
          {...autocomplete.getRootProps({})}
        >
          <div className="flex items-stretch p-2 space-x-6">
            <form
              ref={formRef}
              className="aa-Form"
              {...autocomplete.getFormProps({ inputElement: inputRef.current })}
            >
              <div className="aa-InputWrapperPrefix">
                <label className="aa-Label" {...autocomplete.getLabelProps({})}>
                  <button
                    className="aa-SubmitButton"
                    type="submit"
                    title="Submit"
                  >
                    <SearchIcon className="aa-SubmitIcon mx-auto" />
                  </button>
                </label>
                {state.context.tagsPlugin.tags.length > 0 && (
                  <div className="mr-2">
                    <ul className="list-none flex items-center space-x-1">
                      {state.context.tagsPlugin.tags.map((tag) => (
                        <li
                          key={tag.label}
                          className="block py-2 px-3 bg-blue-100 text-blue-800 rounded text-sm leading-none"
                        >
                          {tag.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="aa-InputWrapper">
                <input
                  className="aa-Input"
                  ref={inputRef}
                  {...autocomplete.getInputProps({
                    inputElement: inputRef.current,
                  })}
                  autoFocus={true}
                />
              </div>
              <div className="aa-InputWrapperSuffix">
                <button className="aa-ClearButton" title="Clear" type="reset">
                  <ClearIcon className="aa-ClearIcon" />
                </button>
              </div>
            </form>
            <div>
              <button
                onClick={onClose}
                className="py-2 px-4 -ml-4 h-full text-gray-600"
              >
                Close
              </button>
            </div>
          </div>
          <div
            ref={panelRef}
            className={[state.status === "stalled" && "aa-Panel--stalled"]
              .filter(Boolean)
              .join(" ")}
            {...autocomplete.getPanelProps({})}
          >
            <div className="aa-PanelLayout flex">
              <div className={`w-6/12 aa-Panel--scrollable`}>
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
                        <ul
                          className="aa-List"
                          {...autocomplete.getListProps()}
                        >
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
                                  state={state}
                                />
                              </li>
                            );
                          })}
                        </ul>
                      </section>
                    )
                  );
                })}
              </div>
              <aside className="bg-gray-100 w-6/12 p-4">
                <MetaSearchPanelSwitch state={state} fallback={null} />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
