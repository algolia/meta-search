import { MetaSearchState } from "./types";

type MetaSearchPanelSwitchProps = {
  state: MetaSearchState;
  fallback: JSX.Element | null;
};

export function MetaSearchPanelSwitch({
  state,
  fallback,
}: MetaSearchPanelSwitchProps) {
  const Preview = state.context.source?.components.Preview;

  if (Preview) {
    return <Preview item={state.context.item} state={state} />;
  }

  return fallback;
}
