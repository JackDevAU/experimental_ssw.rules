"use client";
import type { PageQuery } from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";

interface ClientPageProps {
	data: {
		page: PageQuery["page"];
	};
	variables: {
		relativePath: string;
	};
	query: string;
}

export default function ClientPage(props: ClientPageProps) {
	const { data } = useTina({ ...props });
	return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
