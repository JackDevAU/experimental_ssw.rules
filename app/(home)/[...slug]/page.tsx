import client from "@/tina/__generated__/client";
import React from "react";
import ClientPage from "./client-page";

export default async function Page({ params }: { params: { slug: string[] } }) {
  const data = await client.queries.page({
    relativePath: `${params.slug}.md`,
  });

  return <ClientPage {...data} />;
}

export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();
  const paths = pages.data?.pageConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }));

  return paths || [];
}
