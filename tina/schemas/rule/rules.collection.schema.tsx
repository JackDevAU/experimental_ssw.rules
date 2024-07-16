import type { Collection } from "tinacms";
import { MarkdownRenderer } from "../../../components/fields/markdown-renderer";

export const RuleSchema: Collection = {
  name: "rule",
  label: "Rules",
  path: "content/rules",
  ui: {
    router: ({ document }) => {
      return `/rule/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "rich-text",
      name: "abstract",
      label: "Abstract",
      isBody: true,
    },
    {
      description: "TODO: This should ideally be a rich-text field",
      type: "string",
      name: "body",
      label: "Body",
      ui: {
        component: MarkdownRenderer,
      },
    },
  ],
};
