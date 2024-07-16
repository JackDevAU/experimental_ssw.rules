import type { Collection } from "tinacms";
import { FooterField, HeaderField } from "./fields";

export const GlobalSchema: Collection = {
	name: "global",
	label: "Global Settings",
	path: "content/global",
	format: "json",
	ui: {
		global: true,
	},

	fields: [
		HeaderField,
		FooterField,
		{
			type: "boolean",
			label: "Display Beta Banner",
			name: "isBeta",
		},
	],
};
