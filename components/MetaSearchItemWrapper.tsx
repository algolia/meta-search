import Link from "next/link";
import { toItemUrl } from "../utils/toItemUrl";

import { MetaSearchItem } from "./types";

type MetaSearchItemWrapperParams = {
  item: MetaSearchItem;
  children: React.ReactNode;
};

export function MetaSearchItemWrapper({
  item,
  children,
}: MetaSearchItemWrapperParams) {
  if (item.fields.path) {
    return (
      <Link href={toItemUrl(item.fields.path["en-US"])}>
        <a className="aa-ItemLink">{children}</a>
      </Link>
    );
  }

  return <div className="aa-ItemWrapper">{children}</div>;
}
