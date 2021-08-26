import { getAlgoliaResults } from "@algolia/autocomplete-js";
import Link from "next/link";

import { searchClientDocs } from "../src/searchClientDocs";
import { MetaSearchPlugin } from "./types";

export function createDocsPlugin(): MetaSearchPlugin<any, undefined> {
  return {
    getSources({ query }) {
      if (!query) {
        return [];
      }

      return [
        {
          sourceId: "docs",
          getItemInputValue: ({ state }) => state.query,
          getItems() {
            return getAlgoliaResults({
              searchClient: searchClientDocs,
              queries: [
                {
                  indexName: "documentation_production",
                  query,
                  params: {
                    hitsPerPage: 5,
                  },
                },
              ],
            });
          },
          components: {
            Header() {
              return (
                <div>
                  <span className="aa-SourceHeaderTitle">Documentation</span>
                  <div className="aa-SourceHeaderLine"></div>
                </div>
              );
            },
            Item({ item }) {
              return (
                <Link href="#">
                  <a className="aa-ItemLink">
                    <div className="aa-ItemContent">
                      <div className="aa-ItemContentBody">
                        <div className="aa-ItemContentTitle">{item.title}</div>
                        <div className="aa-ItemContentSubtitle">
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
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
                        </svg>
                      </button>
                    </div>
                  </a>
                </Link>
              );
            },
            Preview({ item }) {
              return (
                <div>
                  <h1>Docs</h1>
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
