import type { EntrySys, FieldsType } from "contentful";

export type Domain = "www" | "alumni" | "exed" | "intranet";

export interface ContentfulContentType {
  id?: string;
  name?: string;
  contentTypeId?: string;
  CONTENTFUL_ID?: string;
}

export interface ContentfulEntryQuery {
  [key: string]: string | number;
}

export interface ContentfulEntry {
  contentTypeId: string;
  fields: FieldsType;
  sys: EntrySys;
}

export interface ContentfulAsset extends ContentfulContentType {
  url: string;
  details: {
    size: number;
    image: {
      width: number;
      height: number;
    };
  };
}

export interface Page extends ContentfulContentType {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  opengraphDescription?: string;
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalLink?: string;
  slug?: string;
  fullSlug?: string;
}
