import rehypeFigure from "@microflash/rehype-figure";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStarryNight from "rehype-starry-night";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { expect, test } from "vitest";
import remarkCustomDirective from "../lib/plugins/remark-directives";
import remarkPluginTwitter from "../lib/plugins/remark-twitter";
import remarkPluginYouTube from "../lib/plugins/remark-youtube";

test("process info directive correctly", async () => {
  const markdownContent = `::: info
This is a \\<div> using the class "info". Works the same as using a \\<p>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
:::


`;

  const markdown1 = `
::: no-border
![Figure: Image without border](https://images.unsplash.com/photo-1513677785800-9df79ae4b10b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80)
:::

`;

  const markdown = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStarryNight)
    .use(remarkPluginYouTube)
    .use(remarkPluginTwitter)
    .use(remarkCustomDirective, {
      info: { hName: "div", classes: ["info-block"] },
      greybox: { hName: "div", classes: ["greybox-block"] },
      "img-small": { hName: "div", classes: ["img-small-block"] },
      "img-medium": { hName: "div", classes: ["img-medium-block"] },
      "img-large": { hName: "div", classes: ["img-large-block"] },
      "no-border": { hName: "div", classes: ["no-border-block"] },
      "email-template": { hName: "div", classes: ["email-template-block"] },
      "email-content": { hName: "div", classes: ["email-content-block"] },
      // Add other block configurations as needed
    })
    .use(rehypeFigure)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .process(markdown1);

  const expectedHtml = `<div class="info-block"><p><br>
This is a <div> using the class "info". Works the same as using a <p>. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.<br></p></div>`;

  expect(markdown.toString().trim()).toBe(expectedHtml);
});
