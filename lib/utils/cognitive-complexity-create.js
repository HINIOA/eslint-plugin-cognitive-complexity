const astUtils = require("../utils/ast-utils.js");

const getCreateFn = (isForced) => (context) => {
  const option = context.options[0];
  let THRESHOLD = 10;

  if (
    typeof option === "object" &&
    Object.prototype.hasOwnProperty.call(option, "max")
  ) {
    THRESHOLD = option.max;
  } else if (typeof option === "number") {
    THRESHOLD = option;
  }

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------

  // Using a stack to store complexity (handling nested functions)
  const functionComplexities = [];
  const functionDepths = [];

  /**
   * When parsing a new function, store it in our function stack
   * @returns {void}
   * @private
   */
  function startFunction() {
    functionComplexities.push(0);
    functionDepths.push(0);
  }

  /**
   * Evaluate the node at the end of function
   * @param {ASTNode} node node to evaluate
   * @returns {void}
   * @private
   */
  function endFunction(node) {
    functionDepths.pop();
    const complexity = functionComplexities.pop();

    if (complexity > THRESHOLD) {
      context.report({
        node,
        message: `此函数的认知复杂度为 ${complexity}，超过了${
          isForced ? "允许" : "推荐"
        }的最大值 ${THRESHOLD}！`,
      });
    }
  }

  /**
   * Increase the complexity of the function in context
   * @returns {void}
   * @private
   */
  function increaseComplexity() {
    if (functionComplexities.length) {
      const depth = functionDepths[functionDepths.length - 1]; // 嵌套层级
      functionComplexities[functionComplexities.length - 1] += depth + 1; // 认知复杂度 = 嵌套层级 + 判断语句
    }
  }

  /**
   * Decrease the complexity of the function in context
   * @returns {void}
   * @private
   */
  function decreaseComplexity() {
    if (functionComplexities.length) {
      functionComplexities[functionComplexities.length - 1]--;
    }
  }

  /**
   * Save the block and Evaluate the node
   * @param {ASTNode} node node to evaluate
   * @returns {void}
   * @private
   */
  function pushBlock() {
    ++functionDepths[functionDepths.length - 1];
  }

  /**
   * Pop the saved block
   * @returns {void}
   * @private
   */
  function popBlock() {
    --functionDepths[functionDepths.length - 1];
  }

  function isInIfCondition(node) {
    if (!node || !node.parent) {
      return false;
    }

    // 在逻辑块中，就不可能在 if 语句中
    if (node.parent.type === "BlockStatement") {
      return false;
    }

    if (node.parent.type === "IfStatement") {
      return true;
    }

    return isInIfCondition(node.parent);
  }

  return {
    Program: startFunction,
    FunctionDeclaration: startFunction,
    FunctionExpression: startFunction,
    ArrowFunctionExpression: startFunction,

    SwitchStatement: pushBlock,
    TryStatement: pushBlock,
    WithStatement: pushBlock,

    SwitchCase: increaseComplexity,
    CatchClause: increaseComplexity,
    DefaultClause: increaseComplexity,
    ConditionalExpression: increaseComplexity,
    LogicalExpression(node) {
      increaseComplexity();

      // 如果逻辑语句在 if 条件语句中，就要减去一个复杂度。因为这里已经加了一个嵌套层级。
      if (isInIfCondition(node)) {
        decreaseComplexity();
      }
    },
    AssignmentExpression(node) {
      if (astUtils.isLogicalAssignmentOperator(node.operator)) {
        increaseComplexity();
      }
    },

    IfStatement(node) {
      increaseComplexity();
      if (node.parent.type !== "IfStatement") {
        pushBlock();
      }
    },
    ForStatement() {
      increaseComplexity();
      pushBlock();
    },
    ForInStatement() {
      increaseComplexity();
      pushBlock();
    },
    ForOfStatement() {
      increaseComplexity();
      pushBlock();
    },
    DoWhileStatement() {
      increaseComplexity();
      pushBlock();
    },
    WhileStatement() {
      increaseComplexity();
      pushBlock();
    },

    "SwitchCase:exit": popBlock,
    "SwitchStatement:exit": popBlock,
    "TryStatement:exit": popBlock,
    "WhileStatement:exit": popBlock,
    "IfStatement:exit": popBlock,
    "ForStatement:exit": popBlock,
    "ForInStatement:exit": popBlock,
    "ForOfStatement:exit": popBlock,
    "DoWhileStatement:exit": popBlock,
    "WithStatement:exit": popBlock,

    "FunctionDeclaration:exit": endFunction,
    "FunctionExpression:exit": endFunction,
    "ArrowFunctionExpression:exit": endFunction,
    "Program:exit": () => functionDepths.pop(),
  };
};

module.exports = {
  getCreateFn,
};
