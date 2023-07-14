# This rule allows setting a cognitive complexity threshold. 

[Cognitive Complexity](https://docs.codeclimate.com/docs/cognitive-complexity) is a concept proposed by Code Climate to measure the ease of understanding code based on circle complexity.

## Rule Details

This rule aims to reduce cognitive complexity of code and improve readability.

Suppose the cognitive complexity error threshold is set to 5.

Examples of **incorrect** code for this rule:

```js

function demo(p1, p2, p3) {
  if (p1 + p2 > p3 || p1 + p3 > p2) {
    return false
  }

  return true
}

```

Examples of **correct** code for this rule:

```js

function demo(p1, p2, p3) {
  if (p1) {
    try {
      if (p1 + p2 > p3 || p1 + p3 > p2) {
        return false
      }
    } catch (err) {
      console.log(err)
    }
  }

  return true
}

```
