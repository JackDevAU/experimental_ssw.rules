import remarkCustomBlocks from "remark-custom-blocks";

interface BlockOptions {
  [key: string]: {
    classes: string;
    title?: "optional";
  };
}

interface PluginOptions {
  blocks: BlockOptions;
}

const remarkCustomBlocksPlugin = (options = {}) => {
  // Using native JavaScript to check if 'blocks' is a property of options
  if (!options.blocks) {
    throw new Error(`missing required "blocks" option`);
  }
  return [[remarkCustomBlocks, options.blocks]];
};

export default remarkCustomBlocksPlugin;
