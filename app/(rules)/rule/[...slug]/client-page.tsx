"use client";
import type { RuleQuery } from "@/tina/__generated__/types";
import { useTina } from "tinacms/dist/react";
import "./code-highlight.css";

interface RuleClientPageProps {
  data: {
    rule: RuleQuery["rule"];
  };
  variables: {
    relativePath: string;
  };
  query: string;
  removeMe: string;
}

export default function RuleClientPage(props: RuleClientPageProps) {
  const { data } = useTina({ ...props });
  const { rule } = data;

  return (
    <div className="prose lg:prose-xl prose-strong:text-foreground prose-headings:text-foreground prose-a:text-accent-foreground prose-blockquote:text-muted-foreground mx-auto container text-foreground">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <div dangerouslySetInnerHTML={{ __html: props.removeMe }} />
    </div>
  );

  // return <></>;
}
