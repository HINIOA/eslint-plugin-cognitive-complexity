/**
 * @fileoverview Reduce code complexity by capping the amount of cognitive complexity allowed in a program.
 * @author xinyao.qiu
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports.rules = requireIndex(__dirname + "/rules");
module.exports.configs = {
  recommended: {
    plugins: ["cognitive-complexity"],
    rules: {
      "cognitive-complexity/cognitive-complexity": ["error", 20],
    },
  },
};
