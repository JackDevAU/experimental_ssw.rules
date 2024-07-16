import type { TinaField } from "tinacms";

export const FooterField: TinaField = {
	type: "object",
	label: "Footer",
	name: "footer",
	fields: [
		{
			type: "object",
			label: "Social Links",
			name: "social",
			fields: [
				{
					type: "string",
					label: "Display Name",
					name: "name",
				},
				{
					type: "string",
					label: "Icon Name",
					ui: {
						description: "See Icon list and copy the name here",
					},
					name: "icon",
				},
			],
		},
	],
};
