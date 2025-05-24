import { ContentfulElement } from "../common";
import { ContentfulSite } from "./site";
import { ContentfulTemplate } from "./template";

export interface ContentfulPage extends ContentfulElement<"page"> {
  title?: string;
  metaTitle?: string;
  metaDescription?: string;
  opengraphDescription?: string;
  // opengraphImage?: ContentfulImage
  noIndex?: boolean;
  noFollow?: boolean;
  canonicalLink?: string;
  convertId?: string;
  site?: ContentfulSite;
  parentPage?: ContentfulPage;
  slug?: string;
  fullSlug?: string;
  template?: ContentfulTemplate;
}
