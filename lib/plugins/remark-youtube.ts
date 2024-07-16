import { visit } from "unist-util-visit";

function remarkPluginYouTube() {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (!parent) {
        return;
      }

      // Check if the node is a code block and starts with youtube:
      if (
        node.tagName === "code" &&
        node.children &&
        node.children.length > 0
      ) {
        const codeNode = node.children[0];

        if (codeNode.type === "text" && codeNode.value.startsWith("youtube:")) {
          const url = codeNode.value.slice(8).trim();

          // Look for the description in the parent
          let description = "";
          for (let i = 0; i < parent.children.length; i++) {
            if (
              parent.children[i] === node &&
              parent.children[i + 1] &&
              parent.children[i + 1].type === "text"
            ) {
              description = parent.children[i + 1].value.trim();
              break;
            }
          }

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
                  src: url,
                  frameborder: "0",
                  allowfullscreen: true,
                },
                children: [],
              },
              {
                type: "element",
                tagName: "p",
                properties: {
                  className: "mt-2 text-center font-semibold",
                },
                children: [
                  {
                    type: "text",
                    value: description,
                  },
                ],
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

export default remarkPluginYouTube;
