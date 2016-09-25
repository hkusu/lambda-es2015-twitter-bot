const main = require('./dist/main')

module.exports.handler = (event, context, callback) => {
  main(event, context, callback)
}
