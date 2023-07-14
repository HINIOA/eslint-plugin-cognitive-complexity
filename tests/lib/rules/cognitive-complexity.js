/**
 * @fileoverview This rule allows setting a cognitive complexity threshold.
 * @author xinyao.qiu
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/cognitive-complexity"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("cognitive-complexity", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: ".",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
