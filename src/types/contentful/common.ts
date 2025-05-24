import { ContentType } from "./content-types";

export type Domain = "www" | "alumni" | "exed" | "intranet";

export interface ContentfulElement<T extends ContentType> {
  contentTypeId: T;
  entryId: string;
  dataRegion: string;
}
