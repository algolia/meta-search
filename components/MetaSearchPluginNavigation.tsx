import { getAlgoliaResults } from "@algolia/autocomplete-preset-algolia";

export function createMetaSearchPluginNavigation() {
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
        }
      ];
    }
  };
}
