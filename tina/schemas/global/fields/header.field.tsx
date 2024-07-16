import type { TinaField } from "tinacms";

export const HeaderField: TinaField = {
	type: "object",
	label: "Header",
	name: "header",
	fields: [
		{
			type: "string",
			label: "Todo",
			name: "todo",
		},
	],
};
