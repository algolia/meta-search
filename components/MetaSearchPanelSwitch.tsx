import { MetaSearchState } from "./types";

type MetaSearchPanelSwitchProps = {
  state: MetaSearchState;
};

export function MetaSearchPanelSwitch({ state }: MetaSearchPanelSwitchProps) {
  const Preview = state.context.source?.components.Preview;

  if (Preview) {
    return <Preview item={state.context.item} state={state} />;
  }

  return null;
}
