import { visit } from "unist-util-visit";

const remarkCustomDirective = (options = {}) => {
  const directiveTypes = Object.keys(options);
  let checkingInDirective = false;

  const processChildren = (
    children,
    inDirective = false,
    directiveConfig = null,
    startDirectiveIndex = -1
  ) => {
    const wrappedChildren = [];
    let endDirectiveIndex = -1;
    let divNode = null;
    let paragraphNode = null;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];

      if (child.type === "text") {
        const trimmedValue = child.value.replace(/^\s+|\s+$/g, ""); // Remove leading and trailing whitespace except newline
        console.log("inDirective", inDirective, trimmedValue);

        if (!inDirective) {
          const directiveMatch = trimmedValue.match(/^::: ([\w-]+)/); // Updated regex to include hyphens
          console.log("directiveMatch", directiveMatch);

          if (directiveMatch && directiveTypes.includes(directiveMatch[1])) {
            console.log("Made it!");

            inDirective = true;
            const directiveType = directiveMatch[1];
            directiveConfig = options[directiveType];

            // Create new nodes
            divNode = {
              type: "element",
              tagName: "div",
              properties: { className: directiveConfig.classes },
              children: [],
            };

            paragraphNode = {
              type: "element",
              tagName: "p",
              properties: {},
              children: [],
            };

            divNode.children.push(paragraphNode);

            // Remove the opening ::: directive
            child.value = child.value.replace(/^::: [\w-]+\n?/, "");
            startDirectiveIndex = i;
          }
        }

        if (inDirective) {
          console.log("inDirective", inDirective, child);

          // Look for the closing ::: directive
          if (trimmedValue.match(/\n?:::$/)) {
            child.value = child.value.replace(/\n?:::$/, "");
            endDirectiveIndex = i;
            inDirective = false;
          }

          wrappedChildren.push(child);
        }
      } else {
        console.log("inDirective", inDirective, child);

        if (inDirective) {
          wrappedChildren.push(child);
        }

        // Recursively process nested children
        if (child.children && child.children.length > 0) {
          const nestedResult = processChildren(
            child.children,
            inDirective,
            directiveConfig,
            startDirectiveIndex
          );

          wrappedChildren.push(...nestedResult.wrappedChildren);
          if (nestedResult.foundClosingDirective) {
            endDirectiveIndex = i;
            inDirective = false;
          }

          // Replace the original children with the processed children
          child.children = nestedResult.children;
        }
      }
    }

    if (startDirectiveIndex >= 0 && endDirectiveIndex >= 0) {
      // Wrap the collected children in the paragraph and div nodes
      paragraphNode?.children.push(...wrappedChildren);

      // Replace the original nodes with the new div node
      children.splice(
        startDirectiveIndex,
        endDirectiveIndex - startDirectiveIndex + 1,
        divNode
      );
    }
    checkingInDirective = inDirective;
    return {
      children,
      wrappedChildren,
      foundClosingDirective: endDirectiveIndex >= 0,
    };
  };

  return (tree) => {
    visit(tree, "element", (node) => {
      processChildren(node.children, checkingInDirective);
    });
  };
};

export default remarkCustomDirective;
// Working
