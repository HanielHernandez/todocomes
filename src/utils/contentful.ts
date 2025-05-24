import { FieldsType, Entry } from "contentful";
import { getContentfulFieldType } from "./get-contentful-field-type/get-contentful-field-type";
import { ContentType } from "@/types/contentful/content-types";
/* eslint-disable @typescript-eslint/no-explicit-any */

function normalizeArray(fields: FieldsType[]) {
  return fields
    .map((f: FieldsType) =>
      f && f.sys ? normalizeContentfulEntry(f as Entry) : f
    )
    .filter(Boolean);
}

function normalizePrimitive(field: FieldsType): FieldsType {
  return field;
}

type ContentfulEntry = Record<
  string,
  unknown & { fields?: Record<string, unknown> }
>;

export const normalizeContentfulEntry = <T = ContentfulEntry>(
  entry: Entry
): T => {
  const cleanField: FieldsType = {};

  const { fields, sys } = entry;
  const { contentType, id } = sys;
  const contentTypeId = <ContentType>contentType?.sys.id;

  for (const [key, field] of Object.entries(fields)) {
    const fieldType = getContentfulFieldType(<FieldsType>field);

    if (fieldType === "array") {
      cleanField[key] = normalizeArray(<Array<FieldsType>>field);
    } else if (fieldType === "contentful-object") {
      cleanField[key] = normalizeContentfulEntry<Entry>(<Entry>field);
    } else if (fieldType === "primitive") {
      cleanField[key] = normalizePrimitive(<FieldsType>field);
    }
  }

  if (contentTypeId) {
    cleanField.contentTypeId = contentTypeId;
    cleanField.dataRegion = `${contentTypeId}-${id}`;
  }

  return {
    ...cleanField,
    entryId: id,
  } as T;
};

export const cleanContentfulEntry = <T>(data: Entry) => {
  let result: any = {};
  const { fields, sys } = data;

  if (!fields) {
    return result;
  }

  result = {
    ...result,
    CONTENT_TYPE: sys?.contentType?.sys?.id || sys.type,
    CONTENTFUL_ID: sys?.id,
    UPDATED_AT: sys?.updatedAt,
  };

  Object.keys(fields).forEach((key) => {
    const field = (fields as Record<string, any>)[key];

    if (Array.isArray(field)) {
      const hasFields = field.some((item: Entry<any>) => !!item.fields);
      const hasSys = field.some((item: Entry<any>) => !!item.sys);

      if (!hasFields && !hasSys) {
        result = { ...result, [key]: field };
        return;
      }

      if (!hasFields && hasSys) {
        result[key] = null;
        return;
      }

      result = {
        ...result,
        [key]: field
          .map((item) => {
            const cleanEntry = cleanContentfulEntry(item);
            if (!cleanEntry.CONTENT_TYPE) return undefined;
            return {
              ...cleanEntry,
              CONTENT_TYPE:
                (item.sys?.contentType?.sys.id || cleanEntry.CONTENT_TYPE) ??
                null,
              CONTENTFUL_ID: item.sys?.id ?? null,
              UPDATED_AT: item.sys?.updatedAt ?? null,
            };
          })
          .filter((x) => x !== undefined),
      };
      return;
    }

    if (field?.fields) {
      result = {
        ...result,
        [key]: {
          ...cleanContentfulEntry(field),
          CONTENT_TYPE: field.sys?.contentType?.sys.id ?? null,
          CONTENTFUL_ID: field.sys?.id ?? null,
          UPDATED_AT: field.sys?.updatedAt ?? null,
        },
      };
      return;
    } else if (!field?.fields && field?.sys) {
      result[key] = null;
      return;
    }

    result[key] = field;
  });

  return result as T;
};
