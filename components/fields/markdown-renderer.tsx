import React from "react";
import { wrapFieldsWithMeta } from "tinacms";

export const MarkdownRenderer = wrapFieldsWithMeta(({ input }) => {
  console.log("MarkdownRenderer", input);

  return (
    <>
      <textarea
        rows={10}
        className={
          "shadow-inner text-base px-3 py-2 text-gray-600 resize-y focus:shadow-outline focus:border-blue-500 block w-full border border-gray-200 focus:text-gray-900 rounded-md"
        }
        id={input.name}
        {...input}
      />
    </>
  );
});
