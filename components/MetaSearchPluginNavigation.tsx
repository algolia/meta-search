import { getAlgoliaResults } from "@algolia/autocomplete-js";

import { searchClient } from "../src/searchClient";
import { toItemUrl } from "../utils/toItemUrl";
import { MetaSearchPlugin } from "./types";
import { MetaSearchItemWrapper } from "./MetaSearchItemWrapper";

export function createNavigationPlugin(): MetaSearchPlugin<any, any> {
  return {
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
                    highlightPostTag: "</mark>",
                    facets: ["fields.type.en-US"],
                    facetFilters: ["fields.type.en-US:view"],
                  },
                },
              ],
            });
          },
          getItemUrl({ item }) {
            if (!item.fields.route) {
              return undefined;
            }

            return toItemUrl(item.fields.route["en-US"]);
          },
          components: {
            Item({ item }) {
              return (
                <MetaSearchItemWrapper item={item}>
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
                  <h1>Navigation</h1>
                  <pre>
                    <code>{JSON.stringify(item, null, 2)}</code>
                  </pre>
                </div>
              );
            },
          },
        },
      ];
    },
  };
}
