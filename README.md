# eslint-plugin-cognitive-complexity

本 ESlint 插件可以分析代码中函数的认知复杂度，当复杂度超过 15 时将警告，超过 20 时将报错。

> 认知复杂度（[Cognitive Complexity](https://docs.codeclimate.com/docs/cognitive-complexity)）是 Code Climate 公司基于圈复杂度提出的一个用于衡量代码理解难易程度的概念。

## 安装

首先需要按照 [ESLint](https://eslint.org/):

```sh
npm install eslint --save-dev
```

然后，安装 `eslint-plugin-cognitive-complexity`:

```sh
npm install eslint-plugin-cognitive-complexity --save-dev
```

## 使用

### 使用默认配置

添加 `plugin:cognitive-complexity/recommended` 到 `.eslintrc.js` 配置文件的 `extends` 中:

```json
{
  extends: [
    'plugin:cognitive-complexity/recommended',
  ],
}
```

### 自定义认知复杂度阈值

添加如下代码到 `.eslintrc.js` 配置文件中：

```json
{
  plugins: ['cognitive-complexity'],
  rules: {
    'cognitive-complexity/cognitive-complexity-forced': ['error', 20],
    'cognitive-complexity/cognitive-complexity-recommended': ['warn', 15]
  }
}
```

然后，

将上面的 `20` 替换为你想要的最大限制值
将上面的 `15` 替换为你想要的最大推荐值
