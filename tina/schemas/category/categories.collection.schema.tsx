import type { Collection } from "tinacms";

export const CategorySchema: Collection = {
	name: "category",
	label: "Categories",
	path: "content/categories",
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
			type: "rich-text",
			name: "body",
			label: "Body",
			isBody: true,
		},
	],
};
