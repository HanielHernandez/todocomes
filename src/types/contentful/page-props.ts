import { ComponentType } from "./content-types";

export default interface PageProps {
  blocks: Array<{ CONTENT_TYPE: ComponentType }>;
  title: string;
  slug: string;
}
