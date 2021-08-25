import React, { Fragment } from "react";
import Link from "next/link";
import {
  AutocompleteOptions,
  AutocompleteState,
  createAutocomplete
} from "@algolia/autocomplete-core";
import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";
import { Hit } from "@algolia/client-search";
import algoliasearch from "algoliasearch/lite";

import { ClearIcon } from "./ClearIcon";
import { SearchIcon } from "./SearchIcon";
import { toItemUrl } from "../utils/toItemUrl";

import "@algolia/autocomplete-theme-classic";

const searchClient = algoliasearch(
  "T2ZX9HO66V",
  "e96fadfb2ec42760dfe83bd9e46209ad"
);

// algolia docs
const algoliaDocsSearchClient = algoliasearch(
  "B1G2GM9NG0",
  "3ec8b05f457a8e2637cb430fb3806569"
);

type ItemWrapperParams = {
  item: AutocompleteItem;
  children: React.ReactNode;
};

function ItemWrapper({ item, children }: ItemWrapperParams) {
  if (item.fields.route) {
    return (
      <Link href={toItemUrl(item.fields.route["en-US"])}>
        <a className="aa-ItemLink">{children}</a>
      </Link>
    );
  }

  return <div className="aa-ItemWrapper">{children}</div>;
}

type AutocompleteItem = Hit<{
  fields: Record<string, any>;
}>;

export function Autocomplete(
  props: Partial<AutocompleteOptions<AutocompleteItem>>
) {
  const [autocompleteState, setAutocompleteState] = React.useState<
    AutocompleteState<AutocompleteItem>
  >({
    collections: [],
    completion: null,
    context: {},
    isOpen: false,
    query: "",
    activeItemId: null,
    status: "idle"
  });
  const autocomplete = React.useMemo(
    () =>
      createAutocomplete<
        AutocompleteItem,
        React.BaseSyntheticEvent,
        React.MouseEvent,
        React.KeyboardEvent
      >({
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: "navigation",
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: "dev_meta",
                      query,
                      params: {
                        hitsPerPage: 5,
                        highlightPreTag: "<mark>",
                        highlightPostTag: "</mark>"
                      }
                    }
                  ]
                });
              },
              getItemUrl({ item }) {
                if (!item.fields.route) {
                  return undefined;
                }

                return toItemUrl(item.fields.route["en-US"]);
              }
            },
            {
              // ----------------
              // Algolia Docs
              // ----------------
              sourceId: "docs",
              getItemInputValue: ({ state }) => state.query,
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient: algoliaDocsSearchClient,
                  queries: [
                    {
                      indexName: "documentation_production",
                      query,
                      params: {
                        hitsPerPage: 5
                      }
                    }
                  ]
                });
              }
            }
          ];
        },
        ...props
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
      panelElement: panelRef.current
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

      {autocompleteState.isOpen && (
        <div
          ref={panelRef}
          className={[
            "aa-Panel",
            "aa-Panel--desktop",
            autocompleteState.status === "stalled" && "aa-Panel--stalled"
          ]
            .filter(Boolean)
            .join(" ")}
          {...autocomplete.getPanelProps({})}
        >
          <div className="aa-PanelLayout aa-Panel--scrollable">
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;

              return (
                <section key={`source-${index}`} className="aa-Source">
                  <div>
                    <span className="aa-SourceHeaderTitle">
                      {source.sourceId}
                    </span>
                    <div className="aa-SourceHeaderLine"></div>
                  </div>
                  {items.length > 0 && (
                    <ul className="aa-List" {...autocomplete.getListProps()}>
                      {items.map((item) => {
                        return (
                          <li
                            key={item.objectID}
                            className="aa-Item"
                            {...autocomplete.getItemProps({ item, source })}
                          >
                            {source.sourceId === "navigation" && (
                              <ItemWrapper item={item}>
                                <div className="aa-ItemContent">
                                  <div className="aa-ItemContentBody">
                                    <div className="aa-ItemContentTitle">
                                      {item.fields.name["en-US"]}
                                    </div>
                                    {item.fields.category && (
                                      <div className="aa-ItemContentSubtitle">
                                        {item.fields.category["en-US"]}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="aa-ItemActions">
                                  <button
                                    className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                                    type="button"
                                    title="Select"
                                    style={{ pointerEvents: "none" }}
                                  >
                                    <svg
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                                    </svg>
                                  </button>
                                </div>
                              </ItemWrapper>
                            )}
                            {source.sourceId === "docs" && (
                              <Link href="#">
                                <a className="aa-ItemLink">
                                  <div className="aa-ItemContent">
                                    <div className="aa-ItemContentBody">
                                      <div className="aa-ItemContentTitle">
                                        {item.title}
                                      </div>
                                      <div class="aa-ItemContentSubtitle">
                                        {item.content_structure.lvl0} &gt;{" "}
                                        {item.content_structure.lvl1}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="aa-ItemActions">
                                    <button
                                      className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                                      type="button"
                                      title="Select"
                                      style={{ pointerEvents: "none" }}
                                    >
                                      <svg
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                                      </svg>
                                    </button>
                                  </div>
                                </a>
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
