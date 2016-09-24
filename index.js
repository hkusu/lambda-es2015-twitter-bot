const app = require('./dist/app')

module.exports.handler = (event, context, callback) => {
  app(event, context, callback)
}
