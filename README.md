# PostCSS Opacity Percentage

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/dreamseer/postcss-opacity-percentage/Test/main)
[![Coverage Status](https://coveralls.io/repos/github/Dreamseer/postcss-opacity-percentage/badge.svg?branch=main)](https://coveralls.io/github/Dreamseer/postcss-opacity-percentage?branch=main)
[![Install size](https://packagephobia.now.sh/badge?p=postcss-opacity-percentage)](https://packagephobia.now.sh/result?p=postcss-opacity-percentage)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![MIT license](https://img.shields.io/github/license/dreamseer/postcss-opacity-percentage.svg)](https://github.com/Dreamseer/postcss-opacity-percentage/blob/main/LICENSE.md)

[PostCSS](https://github.com/postcss/postcss) plugin to transform percentage-based opacity values to more compatible floating-point values.

## Install

Using [npm](https://www.npmjs.com/get-npm):

```bash
npm install --save-dev postcss postcss-opacity-percentage
```

Using [yarn](https://yarnpkg.com/):

```bash
yarn add --dev postcss postcss-opacity-percentage
```

## Example

```css
/* Input */
.foo {
  opacity: 45%;
}
```

```css
/* Output */
.foo {
  opacity: 0.45;
}
```

## Usage

```js
postcss([
  require('postcss-opacity-percentage'),
]);
```

See [PostCSS](https://github.com/postcss/postcss) documentation for examples for your environment.

## License

MIT © [Marc Görtz](https://marcgoertz.de/)
