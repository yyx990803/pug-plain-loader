const pug = require('pug')
const loaderUtils = require('loader-utils')
const merge = require('webpack-merge')

module.exports = function (source) {
  const options = Object.assign({
    filename: this.resourcePath,
    doctype: 'html',
    compileDebug: this.debug || false
  }, loaderUtils.getOptions(this))

  var params = []
  if (this.resourceQuery) {
    params = loaderUtils.parseQuery(this.resourceQuery)
  }

  var resultOptions = merge(options, params)

  const template = pug.compile(source, options)
  template.dependencies.forEach(this.addDependency)
  return template(resultOptions.data || {})
}
