import { MetaSearchState } from "./types";

type MetaSearchNoResultsBoundaryProps = {
  state: MetaSearchState;
  fallback: JSX.Element;
  children: JSX.Element;
};

export function MetaSearchNoResultsBoundary(
  props: MetaSearchNoResultsBoundaryProps
) {
  if (props.state.status === "idle" && getItemsCount(props.state) === 0) {
    return props.fallback;
  }

  return props.children;
}

function getItemsCount(state: MetaSearchState) {
  if (state.collections.length === 0) {
    return 0;
  }

  return state.collections.reduce<number>(
    (sum, collection) => sum + collection.items.length,
    0
  );
}
