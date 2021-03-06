import { getAlgoliaResults } from "@algolia/autocomplete-js";

import { searchClient } from "../src/searchClient";
import { toItemUrl } from "../utils/toItemUrl";
import { MetaSearchPlugin } from "./types";
import { MetaSearchItemWrapper } from "./MetaSearchItemWrapper";
import indexSettings from "../data/T2ZX9HO66V__dev_meta.json";
import apps from "../data/apps.json";
import indexTop from "../data/T2ZX9HO66V__index_top.json";
import * as Icon from "react-feather";

export function createNavigationPlugin(): MetaSearchPlugin<any, undefined> {
  return {
    onStateChange({ state, setQuery }) {
      const { tags, setTags } = state.context.tagsPlugin;

      const roots = {
        configure: ["configure", "configuration"],
        apps: ["applications", "apps", "app"],
        index: ["index", "indexes", "indices"],
        monitoring: ["monitoring"],
      };

      Object.keys(roots).forEach((root) => {
        const tokens = roots[root as keyof typeof roots];

        if (tokens.map((token) => `${token} `).includes(state.query)) {
          setQuery("");
          setTags([{ label: root }]);
        }
      });
    },
    getSources({ state, query, setQuery }) {
      if (state.context.root === "apps" || state.context.root === "indices") {
        return [];
      }

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
                    hitsPerPage: 15,
                    highlightPreTag: "<mark>",
                    highlightPostTag: "</mark>",
                    facets: ["fields.type.en-US"],
                    facetFilters: state.context.root
                      ? [
                          [
                            `fields.type.en-US:${state.context.root}`,
                            state.context.root === "scope" &&
                              "fields.type.en-US:shortcut",
                          ].filter(Boolean),
                        ]
                      : [],
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
            if (!item.fields.path && item.fields.root) {
              state.context.tagsPlugin.setTags([
                { label: item.fields.root["en-US"] },
              ]);
              setQuery("");
            }
          },
          components: {
            Header() {
              const header =
                !state.context.root || state.context.root === "scope"
                  ? "Navigation"
                  : ["Navigation", state.context.root].join(" > ");

              return (
                <div>
                  <span className="aa-SourceHeaderTitle">{header}</span>
                  <div className="aa-SourceHeaderLine"></div>
                </div>
              );
            },
            Item({ item }) {
              const IconFeatherName =
                (item.fields.icon && item.fields.icon["en-US"]) || "Link";
              const IconItem = Icon[IconFeatherName];
              return (
                <MetaSearchItemWrapper item={item}>
                  <div className="aa-ItemContent">
                    <div className="border border-indigo-200 rounded flex items-center p-2 text-indigo-500" style={{width:40, height:40}}>
                      {item.fields.path ? <IconItem /> : <Icon.ArrowRightCircle/>}
                    </div>
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
                  <div className="aa-ItemActions flex items-center">
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
              const IconFeatherName =
                (item.fields.icon && item.fields.icon["en-US"]) || "Link";
              const IconItem = Icon[IconFeatherName];
              return (
                <div>
                  <div
                    className="flex items-center m-auto bg-gray-200 text-gray-700 rounded-full"
                    style={{ width: 40, height: 40 }}
                  >
                    <IconItem
                      className="m-auto"
                      style={{ width: 18, height: 18 }}
                    />
                  </div>
                  <div className="text-center text-xs text-gray-500 pt-4">
                    {item.fields.category["en-US"]}
                  </div>
                  <h1 className="text-xl text-center pb-4">
                    {item.fields.name["en-US"]}
                  </h1>
                  <div className="m-auto w-10/12 text-sm text-gray-600 mb-4">
                    {item.fields.description &&
                      item.fields.description["en-US"].content[0].content[0]
                        .value}
                  </div>
                  <div>
                    {item.fields.params &&
                      item.fields.params["en-US"] &&
                      item.fields.params["en-US"].map((param) => {
                        return (
                          <div
                            className="flex py-4 border-b border-gray-300 text-gray-800 text-sm items-center"
                            key={param}
                          >
                            <code className="flex-shrink-0 bg-gray-200 border-gray-300 border px-1 pt-0.5 rounded-lg text-xs font-semibold">
                              {param}
                            </code>
                            <div className=" text-gray-500 text-right flex-grow flex-nowrap">
                              Current Value:{" "}
                              <code className=" text-gray-800">
                                {JSON.stringify(indexSettings[param], null, 2)}
                              </code>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  {item.fields.type &&
                    item.fields.type["en-US"] == "scope" &&
                    item.fields.root &&
                    item.fields.root["en-US"] == "apps" &&
                    apps.map((app) => {
                      return (
                        <div
                          className="flex w-full p-2 bg-white shadow mb-1"
                          key={app.application_id}
                        >
                          <div
                            className="flex flex-shrink-0 items-center m-auto bg-green-300 rounded-md"
                            style={{ width: 40, height: 40 }}
                          >
                            <div className="w-full text-center">
                              {app.application_id.slice(0, 2)}
                            </div>
                          </div>
                          <div className="flex-grow pl-2">
                            <div className="pb-1">{app.name}</div>
                            <div className="text-gray-500 text-sm">
                              {app.application_id}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {item.fields.type &&
                    item.fields.type["en-US"] == "scope" &&
                    item.fields.root &&
                    item.fields.root["en-US"] == "index" &&
                    indexTop.items.map((index) => {
                      return (
                        <div
                          className="flex w-full p-2 bg-white shadow mb-1"
                          key={index.name}
                        >
                          <div
                            className="flex flex-shrink-0 items-center m-auto bg-gray-200 text-gray-700 rounded-full"
                            style={{ width: 40, height: 40 }}
                          >
                            <Icon.Server
                              className="m-auto"
                              style={{ width: 18, height: 18 }}
                            />
                          </div>
                          <div className="flex-grow pl-2">
                            <div className="pb-1">{index.name}</div>
                            <div className="text-gray-500 text-sm">
                              {index.entries} records
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  {item.fields.type &&
                    item.fields.type["en-US"] == "shortcut" &&
                    item.fields.root &&
                    item.fields.root["en-US"] == "keys" &&
                    [
                      "Search",
                      "Write",
                      "Analytics API key",
                      "Usage API key",
                      "Monitoring API key",
                    ].map((keyName) => {
                      return (
                        <div
                          className="flex w-full p-2 bg-white shadow mb-1"
                          key={keyName}
                        >
                          <div className="flex-grow pl-2">
                            <div className="pb-1">{keyName}</div>
                          </div>
                          <Icon.Copy
                            className="m-auto text-gray-500"
                            style={{ width: 18, height: 18 }}
                          />
                        </div>
                      );
                    })}
                </div>
              );
            },
          },
        },
      ];
    },
  };
}
