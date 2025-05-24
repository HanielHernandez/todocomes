import { FieldsType } from "contentful";

export type ContentfulFieldType = "array" | "contentful-object" | "primitive";

export function getContentfulFieldType(
  field: FieldsType
): ContentfulFieldType | undefined {
  if (Array.isArray(field)) return "array";

  const fieldType = typeof field;

  if (["string", "number", "boolean", "bigint"].includes(fieldType))
    return "primitive";

  if (fieldType === "object" && field && "sys" in field)
    return "contentful-object";

  // At this point it means is either a Rich Text or an Asset
  if (fieldType === "object") return "primitive";
}
