/**
 * @fileoverview This rule allows setting a cognitive complexity threshold.
 * @author xinyao.qiu
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const { getCreateFn } = require('../utils/cognitive-complexity-create')

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "This rule allows setting a cognitive complexity threshold.",
      category: "Fill me in",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        oneOf: [
          {
            type: "integer",
            minimum: 0,
          },
          {
            type: "object",
            properties: {
              max: {
                type: "integer",
                minimum: 0,
              },
            },
            additionalProperties: false,
          },
        ],
      },
    ],
  },

  create: getCreateFn(true),
};
