import Twit from 'twit'
import moment from 'moment'

const T = new Twit({
  consumer_key: 'your consumer key',
  consumer_secret: 'your consumer secret',
  access_token: 'your access token',
  access_token_secret: 'your access token secret',
})

const app = (event, context, callback) => {
  const message = moment().utc().add(9, 'h').format('ただいま MM月DD日 HH時mm分です。')

  T.post('statuses/update', { status: message }, (err) => {
    if (err) {
      callback(err)
    } else {
      callback(null, 'success')
    }
  })
}

module.exports = app
