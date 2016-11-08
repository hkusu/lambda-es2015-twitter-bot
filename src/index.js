/* eslint import/prefer-default-export: "off" */
import dotenv from 'dotenv'
import moment from 'moment'
import Weather from './Weather'
import Twitter from './Twitter'

dotenv.config() // read configuration from .env file

export function handler(event, context, callback) {
  let { city } = event // case of via API Gateway
  if (!city) {
    city = process.env.CITY // city in .env file
  }

  const weather = new Weather()
  const twitter = new Twitter()
  const currentTimeStr = moment().utc().add(9, 'h').format('《MM月DD日 HH時mm分》') // current time (Japan)

  const promise = (async () => {
    const weatherData = await weather.get(city)

    let message = currentTimeStr + weatherData.data.description.text
    message = message.replace(/\r?\n/g, '') // remove return code
    message = message.replace(/ /g, '') // remove space
    message = message.substr(0, 140) // 140 characters from the head (limited by Twitter)

    await twitter.tweet(message) // tweet
  })()

  // tweet weather
  promise
    .then(() => callback(null, 'success'))
    .catch(err => callback(err))
}
