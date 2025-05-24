import { ContentfulElement, Domain } from "../common";

export interface ContentfulSite extends ContentfulElement<"site"> {
  baseUrl?: string;
  domain?: Domain;
  // header?: ContentfulHeader;
  // footer?: ContentfulFooter;
}
