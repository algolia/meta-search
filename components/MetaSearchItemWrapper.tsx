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
  if (item.fields.route) {
    return (
      <Link href={toItemUrl(item.fields.route["en-US"])}>
        <a className="aa-ItemLink">{children}</a>
      </Link>
    );
  }

  return <div className="aa-MetaSearchItemWrapper">{children}</div>;
}
