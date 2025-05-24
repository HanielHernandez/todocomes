import { ContentfulElement } from "../common";

export interface ContentfulFlexTemplate extends ContentfulElement<"templateLanding"> {
  // @TODO: add valid possible blocks
  blocks: unknown[];
}

export type ContentfulTemplate = ContentfulFlexTemplate;
