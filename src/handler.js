import dotenv from 'dotenv'
import axios from 'axios'
import moment from 'moment'
import Twitter from './Twitter'

dotenv.config() // read configuration from .env file

export default (event, context, callback) => {
  let { city } = event // case of via API Gateway
  if (!city) {
    city = process.env.CITY // city in .env file
  }

  const twitter = new Twitter()
  const currentTimeStr = moment().utc().add(9, 'h').format('《MM月DD日 HH時mm分》') // current time (Japan)

  const run = async () => {
    const res = await axios.get(`http://weather.livedoor.com/forecast/webservice/json/v1?city=${city}`) // livedoor Weather Hacks

    let message = currentTimeStr + res.data.description.text
    message = message.replace(/\r?\n/g, '') // remove return code
    message = message.replace(/ /g, '') // remove space
    message = message.substr(0, 140) // 140 characters from the head (limited by Twitter)

    await twitter.tweet(message) // tweet
  }

  // tweet weather
  run()
    .then(() => callback(null, 'success'))
    .catch(err => callback(err))
}
