import moment from 'moment'
import Twitter from './Twitter'

export default (event, context, callback) => {
  const twitter = new Twitter()
  const message = moment().utc().add(9, 'h').format('ただいま MM月DD日 HH時mm分です。') // 現在時間(日本)

  // 現在時間をツイートして終了
  twitter.tweet(message)
    .then(() => {
      callback(null, 'success')
    })
    .catch((err) => {
      callback(err)
    })
}
