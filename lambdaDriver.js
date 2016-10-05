var index = require('./index')

var event = {}
// var event = { city: 140010 }
var context = {}
var callback = function (err, result) {
  if (err) {
    console.log(err.message)
  } else {
    console.log(result)
  }
}

index.handler(event, context, callback)
