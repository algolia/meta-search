import Link from "next/link";

import { MetaSearchIndexItem, MetaSearchPlugin } from "./types";

import indices from "../data/T2ZX9HO66V__index_top.json";

function mapWithObjectId<TItem extends MetaSearchIndexItem>(items: TItem[]) {
  return items.map((item) => ({ objectID: item.name, ...item }));
}

function search<TItem extends MetaSearchIndexItem>(
  query: string,
  items: TItem[]
) {
  if (!query) {
    return items;
  }

  return items.filter((item) =>
    item.name.toLocaleLowerCase().includes(query.toLocaleLowerCase())
  );
}

export function createIndicesPlugin(): MetaSearchPlugin<
  MetaSearchIndexItem,
  undefined
> {
  return {
    getSources({ query: rawQuery, state }) {
      if (state.context.root !== "indices") {
        return [];
      }

      const query = rawQuery.replace("indices ", "");

      return [
        {
          sourceId: "indices",
          getItems() {
            return search(query, mapWithObjectId(indices.items));
          },
          components: {
            Header() {
              return (
                <div>
                  <span className="aa-SourceHeaderTitle">Indices</span>
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
                        <div className="aa-ItemContentTitle">{item.name}</div>
                        <div className="aa-ItemContentSubtitle">
                          {item.updatedAt}
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
                  <h1>Index</h1>
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
