import Twit from 'twit'

class Twitter {
  twit = new Twit({
    consumer_key: 'your consumer key',
    consumer_secret: 'your consumer secret',
    access_token: 'your access token',
    access_token_secret: 'your access token secret',
  })

  tweet(message) {
    return new Promise((resolve, reject) => {
      this.twit.post('statuses/update', { status: message }, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

export default Twitter
