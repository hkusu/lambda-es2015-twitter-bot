import Twit from 'twit'

class Twitter {
  twit = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  })

  async tweet(message) {
    return new Promise((resolve, reject) => {
      this.twit.post('statuses/update', { status: message }, err => {
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
