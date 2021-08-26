import { BaseItem } from "@algolia/autocomplete-core";

export type MetaSearchItem = BaseItem & {
  metadata: Metadata;
  sys: MetaSearchItemSys;
  fields: MetaSearchItemFields;
  objectID: string;
};

type MetaSearchItemFields = {
  name: MetaSearchLanguageContent;
  type: MetaSearchLanguageContent;
  analyticsTier: MetaSearchAnalyticsTier;
  keywords: MetaSearchItemKeywords;
  category: MetaSearchLanguageContent;
  path?: MetaSearchLanguageContent;
  root?: MetaSearchLanguageContent;
};

type MetaSearchAnalyticsTier = {
  "en-US": number;
};

type MetaSearchLanguageContent = {
  "en-US": string;
};

type MetaSearchItemKeywords = {
  "en-US": string[];
};

type Metadata = {
  tags: string[];
};

type MetaSearchItemSys = {
  type: string;
  id: string;
  space: MetaSearchContentType;
  environment: MetaSearchContentType;
  contentType: MetaSearchContentType;
  revision: number;
  createdAt: Date;
  updatedAt: Date;
};

type MetaSearchContentType = {
  sys: MetaSearchContentTypeSys;
};

type MetaSearchContentTypeSys = {
  type: string;
  linkType: string;
  id: string;
};
