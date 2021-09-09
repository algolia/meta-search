import React, { useMemo, useEffect } from "react";
import { createTagsPlugin } from "@algolia/autocomplete-plugin-tags";
import { useKey } from "react-use";

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
import { LoadingIcon } from "./LoadingIcon";

type MetaSearchProps = {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
};

export function MetaSearch({ isOpen, onOpen, onClose }: MetaSearchProps) {
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
        // Next line is only necessary for now because we're using the former
        // version of `@algolia/autocomplete-shared-utils`, not the new one that
        // will go out with the Tags plugin. This former version doesn't export
        // `noop` as the new version does, so the default value of `onChange` is
        // undefined and it results in a runtime error.
        // I will remove once the Tags plugin is released.
        onChange() {},
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
  const { tags, setTags } = state.context.tagsPlugin || {
    tags: [],
    setTags: () => {},
  };
  const hasItems = state.collections.some(({ items }) => items.length > 0);

  useCloseVirtualKeyboardOnTouchMove({ inputRef });

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      // @todo This conflicts with the `Escape` key being used to close the modal.
      // We might use a different key for this behavior.
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

  useEffect(() => {
    // We need to use the DOM API
    // because Next.js doesn't let us access the `body`
    document.querySelector("body")?.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  useKey(
    (event) => event.key === "k" && event.metaKey,
    (event) => {
      event.preventDefault();

      if (isOpen) {
        onClose();
      } else {
        onOpen();
      }
    },
    undefined,
    [isOpen]
  );

  useKey(
    "Escape",
    () => {
      if (isOpen) {
        onClose();
      }
    },
    undefined,
    [isOpen]
  );

  if (!isOpen) {
    return null;
  }

  const inputProps = autocomplete.getInputProps({
    inputElement: inputRef.current,
  });

  return (
    <div>
      <div
        className="absolute inset-0 bg-gray-500 bg-opacity-40"
        onClick={onClose}
      >
        <div
          onClick={(event) => event.stopPropagation()}
          className="mt-0 h-full sm:h-auto sm:mt-44 mx-auto w-full max-w-3xl"
        >
          <div
            className="aa-Autocomplete w-full h-full bg-white rounded flex flex-col overflow-hidden"
            {...autocomplete.getRootProps({})}
          >
            <div className="flex items-stretch p-2 space-x-6 flex-none">
              <form
                ref={formRef}
                className="aa-Form"
                {...autocomplete.getFormProps({
                  inputElement: inputRef.current,
                })}
              >
                <div className="aa-InputWrapperPrefix">
                  <label
                    className="aa-Label"
                    {...autocomplete.getLabelProps({})}
                  >
                    <button
                      className="aa-SubmitButton"
                      type="submit"
                      title="Submit"
                    >
                      {["loading", "stalled"].includes(state.status) ? (
                        <LoadingIcon className="aa-LoadingIcon mx-auto" />
                      ) : (
                        <SearchIcon className="aa-SubmitIcon mx-auto" />
                      )}
                    </button>
                  </label>
                  {tags.length > 0 && (
                    <div className="mr-1">
                      <ul className="list-none flex items-center space-x-1">
                        {tags.map((tag) => (
                          <li
                            key={tag.label}
                            className="flex capitalize items-center space-x-2 py-2 px-3 bg-blue-100 text-blue-800 rounded text-sm leading-none"
                          >
                            <span>{tag.label}</span>
                            <svg
                              className="h-3 w-3 cursor-pointer"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              onClick={() => tag.remove()}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
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
                    {...inputProps}
                    onKeyDown={(event) => {
                      inputProps.onKeyDown(event);

                      if (
                        event.key === "Backspace" &&
                        inputRef.current?.selectionStart === 0 &&
                        inputRef.current?.selectionEnd === 0
                      ) {
                        const newTags = tags.slice(0, -1);

                        setTags(newTags);
                      }
                    }}
                    autoFocus={true}
                  />
                </div>
                <div className="aa-InputWrapperSuffix">
                  <button
                    className="aa-ClearButton"
                    title="Clear"
                    type="reset"
                    onClick={() => setTags([])}
                  >
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
            {hasItems && (
              <div
                ref={panelRef}
                className={[
                  // @todo There's a bug where the status gets stalled when adding
                  // tags from the navigation plugin's onStateChange lifecyle.
                  // Until it's resolved, no need to show the class
                  //state.status === "stalled" && "aa-Panel--stalled",
                  "aa-Panel relative flex-grow",
                ]
                  .filter(Boolean)
                  .join(" ")}
                {...autocomplete.getPanelProps({})}
              >
                <div className="aa-PanelLayout flex max-h-full">
                  <div
                    className={`w-6/12 aa-Panel--scrollable h-full sm:max-h-96 max-h-full`}
                  >
                    {state.collections.map((collection, index) => {
                      const items = collection.items;
                      const source = collection.source as MetaSearchSource<any>;
                      const { Header, Item } = source.components;
                      return (
                        items.length > 0 && (
                          <section
                            key={`source-${index}`}
                            className="aa-Source"
                          >
                            {Header && (
                              <Header
                                items={items}
                                source={source}
                                state={state}
                              />
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
                                    {...autocomplete.getItemProps({
                                      item,
                                      source,
                                    })}
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
                  <aside className="bg-gray-100 w-6/12 p-4 aa-Panel--scrollable h-full sm:max-h-96 max-h-full">
                    <MetaSearchPanelSwitch state={state} fallback={null} />
                  </aside>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
