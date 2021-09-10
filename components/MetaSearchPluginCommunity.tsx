import { getAlgoliaResults } from "@algolia/autocomplete-js";
import Link from "next/link";
import * as Icon from "react-feather";

import { searchClientCommunity } from "../src/searchClientCommunity";
import { MetaSearchPlugin } from "./types";

export function createCommunityPlugin(): MetaSearchPlugin<any, undefined> {
  return {
    getSources({ query }) {
      if (!query) {
        return [];
      }

      return [
        {
          sourceId: "community",
          getItems() {
            return getAlgoliaResults({
              searchClient: searchClientCommunity,
              queries: [
                {
                  indexName: "community.algolia.com",
                  query,
                  params: {
                    hitsPerPage: 3,
                  },
                },
              ],
            });
          },
          components: {
            Header() {
              return (
                <div>
                  <span className="aa-SourceHeaderTitle">Community</span>
                  <div className="aa-SourceHeaderLine"></div>
                </div>
              );
            },
            Item({ item }) {
              return (
                <Link href="#">
                  <a className="aa-ItemLink">
                    <div className="aa-ItemContent">
                    <div className="border border-indigo-200 rounded flex items-center p-2 text-indigo-500" style={{width:40, height:40}}>
                      <Icon.GitHub/>
                    </div>
                      <div className="aa-ItemContentBody">
                        <div className="aa-ItemContentTitle">{item.name}</div>
                        <div className="aa-ItemContentSubtitle text-gray-500">
                          {item.category}
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
