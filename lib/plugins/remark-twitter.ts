import { visit } from "unist-util-visit";

function remarkPluginTwitter() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (!parent) {
        return;
      }

      // Check if the node is a code block and starts with twitter:
      if (
        node.tagName === "code" &&
        node.children &&
        node.children.length > 0
      ) {
        const codeNode = node.children[0];

        if (codeNode.type === "text" && codeNode.value.startsWith("twitter:")) {
          const url = codeNode.value.slice(8).trim();

          const tweetEmbedUrl = `https://platform.twitter.com/embed/Tweet.html?id=${url
            .split("/")
            .pop()}`;

          const iframe = {
            type: "element",
            tagName: "div",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "iframe",
                properties: {
                  class: "w-full aspect-video rounded-lg shadow-lg",
                  src: tweetEmbedUrl,
                  frameborder: "0",
                  allowfullscreen: true,
                },
                children: [],
              },
            ],
          };

          // Replace the code block with the iframe
          const nodeIndex = parent.children.indexOf(node);
          if (nodeIndex !== -1) {
            parent.children.splice(nodeIndex, 1, iframe);
          }
        }
      }
    });
  };
}

export default remarkPluginTwitter;
