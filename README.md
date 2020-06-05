# @pointotech/pug-plain-loader

Webpack loader which compiles Pug templates to plain HTML.

## Installation

The `pug` package is required for this package, so be sure to use the latest versions of it and of this package.

### If your project uses Yarn

```sh
yarn add pug@latest pug-plain-loader@latest --dev
```

### If your project uses NPM

```sh
npm install --save-dev pug@latest pug-plain-loader@latest
```

## Usage

This loader is mostly intended to be used alongside `vue-loader` v15+, since it now requires using webpack loaders to handle template preprocessors.

If you are only using this loader for templating in single-file Vue components, configure it with:

```js
{
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "@pointotech/pug-plain-loader",
      },
    ];
  }
}
```

This will apply this loader to all `<template lang="pug">` blocks in your Vue components.

If you also intend to use it to import `.pug` files as HTML strings in JavaScript, you will need to chain `raw-loader` after this loader. Note however adding `raw-loader` would break the output for Vue components, so you need to have two rules, one of them excluding Vue components:

```js
{
  module: {
    rules: [
      {
        test: /\.pug$/,
        oneOf: [
          // this applies to pug imports inside JavaScript
          {
            exclude: /\.vue$/,
            use: ["raw-loader", "@pointotech/pug-plain-loader"],
          },
          // this applies to <template lang="pug"> in Vue components
          {
            use: ["@pointotech/pug-plain-loader"],
          },
        ],
      },
    ];
  }
}
```

## Options

See [Pug compiler options](https://pugjs.org/api/reference.html#options).

The `doctype` option is set to `html` by default, since most Vue templates are HTML fragments without explicit doctype.

An additional option `data` can be used to pass locals for the template, although this is typically not recommended when using in Vue components.

## Other packages

This is based on [https://github.com/yyx990803/pug-plain-loader](https://github.com/yyx990803/pug-plain-loader)

We forked that package in order to fix this warning:

```
warning " > pug-plain-loader@1.0.0" has incorrect peer dependency "pug@^2.0.0".
```

If the maintainers of that package apply the same fix as we did (upgrading the `pug` peer dependency to version 3) we will deprecate this package go back to using the original `pug-plain-loader`.
