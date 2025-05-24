import { BLOCKS, Document } from "@contentful/rich-text-types";

export const document: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.PARAGRAPH,
      data: {},
      content: [
        {
          nodeType: "text",
          value: "Ut reprehenderit reprehenderit incididunt exercitation eu",
          marks: [],
          data: {},
        },
      ],
    },
  ],
};
