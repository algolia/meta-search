import { AutocompletePlugin, AutocompleteSource, AutocompleteState, BaseItem, GetSourcesParams } from "@algolia/autocomplete-core"

type MetaSearchPluginSourceId =
  | 'indices'

export type MetaSearchSource<
  TItem extends BaseItem
> = AutocompleteSource<TItem> & {
  sourceId: MetaSearchPluginSourceId
  sourceData?: any
  components: {
    Header(props: {
      items: TItem[]
      state: MetaSearchState
      source: MetaSearchSource<any>
    }): JSX.Element
    Item(props: {
      item: TItem
      state: MetaSearchState
      isActive: boolean
    }): JSX.Element
    Preview?(props: { item: TItem; state: MetaSearchState }): JSX.Element
  }
}

export type MetaSearchPlugin<TItem extends BaseItem, TData> = Omit<
  AutocompletePlugin<TItem, TData>,
  'getSources'
> & {
  getSources?: (
    params: GetSourcesParams<TItem>
  ) => Array<MetaSearchSource<TItem> | boolean | undefined>
}

export type MetaSearchContext = {
  item?: any
  source?: MetaSearchSource<any>
}

export type MetaSearchState = AutocompleteState<any> & {
  context: MetaSearchContext
}