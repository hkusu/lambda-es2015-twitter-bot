import dotenv from 'dotenv'
import axios from 'axios'
import Twitter from './Twitter'

// read configuration from .env file
dotenv.config()

export default (event, context, callback) => {
  const twitter = new Twitter()

  // tweet Tokyo weather
  axios.get(`http://weather.livedoor.com/forecast/webservice/json/v1?city=${process.env.CITY}`) // livedoor Weather Hacks
    .then(res => res.data.description.text.substr(0, 140)) // get description(140 characters)
    .then(message => twitter.tweet(message)) // tweet
    .then(() => callback(null, 'success'))
    .catch(err => callback(err))
}
