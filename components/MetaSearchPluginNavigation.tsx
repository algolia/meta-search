import { getAlgoliaResults } from "@algolia/autocomplete-js";

import { searchClient } from "../src/searchClient";
import { toItemUrl } from "../utils/toItemUrl";
import { MetaSearchPlugin } from "./types";
import { MetaSearchItemWrapper } from "./MetaSearchItemWrapper";
import indexSettings from "../data/T2ZX9HO66V__dev_meta.json";

export function createNavigationPlugin(): MetaSearchPlugin<any, undefined> {
  return {
    getSources({ state, query, setContext, setQuery }) {
      return [
        {
          sourceId: "navigation",
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: "dev_meta",
                  query,
                  params: {
                    hitsPerPage: 5,
                    highlightPreTag: "<mark>",
                    highlightPostTag: "</mark>",
                    facets: ["fields.type.en-US"],
                    facetFilters: [`fields.type.en-US:${state.context.root}`],
                  },
                },
              ],
            });
          },
          getItemUrl({ item }) {
            if (!item.fields.path) {
              return undefined;
            }

            return toItemUrl(item.fields.path["en-US"]);
          },
          onSelect({ item }) {
            if (item.fields.root?.["en-US"]) {
              setContext({ root: item.fields.root["en-US"] });
              setQuery(`${item.fields.root["en-US"]} `);
            }
          },
          components: {
            Header() {
              return (
                <div>
                  <span className="aa-SourceHeaderTitle">
                    Navigation ({state.context.root})
                  </span>
                  <div className="aa-SourceHeaderLine"></div>
                </div>
              );
            },
            Item({ item }) {
              return (
                <MetaSearchItemWrapper item={item}>
                  <div className="aa-ItemContent">
                    <div className="aa-ItemContentBody">
                      <div className="aa-ItemContentTitle">
                        {item.fields.name["en-US"]}
                      </div>
                      {item.fields.category && (
                        <div className="aa-ItemContentSubtitle text-gray-500">
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
                      <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                      </svg>
                    </button>
                  </div>
                </MetaSearchItemWrapper>
              );
            },
            Preview({ item }) {
              return (
                <div>
                  <h1 className="text-xl text-center pb-2">
                    {item.fields.name["en-US"]}
                  </h1>
                  <div>
                    {item.fields.params &&
                      item.fields.params["en-US"] &&
                      item.fields.params["en-US"].map((param) => {
                        return (
                          <div key={param}>
                            <div className="pb-1 text-lg">{param}:</div>
                            <pre className="pb-3">
                              <code>
                                {JSON.stringify(indexSettings[param], null, 2)}
                              </code>
                            </pre>
                          </div>
                        );
                      })}
                  </div>
                </div>
              );
            },
          },
        },
      ];
    },
  };
}
