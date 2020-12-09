const pug = require('pug')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  const options = Object.assign({
    filename: this.resourcePath,
    doctype: 'html',
    compileDebug: this.debug || false
  }, loaderUtils.getOptions(this))

  const cleanSource = source
    .replace(/(?<=\:\w+\=(["'][{[]))[\s\S]*?[}\]]["']/g, templateSanitizer)
    .trim();

  const template = pug.compile(cleanSource, options)
  template.dependencies.forEach(this.addDependency)

  return template(options.data || {})
}

function templateSanitizer(source) {
  return source.replace(/(\n|\s{2,})*/g, '')
}