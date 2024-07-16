import remarkCustomBlocks from "@/lib/plugins/remark-directives";
import remarkPluginTwitter from "@/lib/plugins/remark-twitter";
import remarkPluginYouTube from "@/lib/plugins/remark-youtube";
import client from "@/tina/__generated__/client";
import rehypeFigure from "@microflash/rehype-figure";
import React from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeReact from "rehype-react";
import rehypeStarryNight from "rehype-starry-night";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkImages from "remark-images";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import RuleClientPage from "./client-page";

export default async function RulePage({
  params,
}: {
  params: { slug: string[] };
}) {
  console.log("RulePage", params);

  const data = await client.queries.rule({
    relativePath: `${params.slug}.md`,
  });

  const markdown = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStarryNight)
    .use(remarkPluginYouTube)
    .use(remarkPluginTwitter)
    .use(remarkCustomBlocks, {
      info: { hName: "div", classes: ["bg-blue-400"] },
      greybox: { hName: "div", classes: ["bg-gray-600"] },
      highlight: { hName: "div", classes: ["highlight-block"] },
      china: { hName: "div", classes: ["china-block"] },
      codeauditor: { hName: "div", classes: ["codeauditor-block"] },
      todo: { hName: "div", classes: ["todo-block"] },
      "img-small": { hName: "div", classes: ["img-small-block"] },
      "img-medium": { hName: "div", classes: ["img-medium-block"] },
      "img-large": { hName: "div", classes: ["img-large-block"] },
      "no-border": { hName: "div", classes: ["no-border-block"] },
      bad: { hName: "div", classes: ["bad-block"] },
      ok: { hName: "div", classes: ["ok-block"] },
      good: { hName: "div", classes: ["good-block"] },
      "email-template": { hName: "div", classes: ["email-template"] },
      "email-content": { hName: "div", classes: ["email-content"] },
    })
    .use(rehypeFigure)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .process(data.data.rule?.body || "");

  return <RuleClientPage {...data} removeMe={markdown.toString()} />;
}

export async function generateStaticParams() {
  const pages = await client.queries.ruleConnection();
  const paths = pages.data?.ruleConnection?.edges?.map((edge) => ({
    filename: edge?.node?._sys.breadcrumbs,
  }));

  return paths || [];
}
