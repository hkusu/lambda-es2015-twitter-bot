import dotenv from 'dotenv'
import axios from 'axios'
import moment from 'moment'
import Twitter from './Twitter'

// read configuration from .env file
dotenv.config()

export default (event, context, callback) => {
  let { city } = event // case of via API Gateway
  if (!city) {
    city = process.env.CITY // city in .env file
  }

  const twitter = new Twitter()
  const currentTimeStr = moment().utc().add(9, 'h').format('《MM月DD日 HH時mm分》') // current time (Japan)

  // tweet weather
  axios.get(`http://weather.livedoor.com/forecast/webservice/json/v1?city=${city}`) // livedoor Weather Hacks
    .then(res => {
      let message = currentTimeStr + res.data.description.text
      message = message.replace(/\r?\n/g, '') // remove return code
      message = message.replace(/ /g, '') // remove space
      return message.substr(0, 140) // 140 characters from the head (limited by Twitter)
    })
    .then(message => twitter.tweet(message)) // tweet
    .then(() => callback(null, 'success'))
    .catch(err => callback(err))
}
