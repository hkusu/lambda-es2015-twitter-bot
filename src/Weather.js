import axios from 'axios'

class Weather {
  static API_URL = 'http://weather.livedoor.com/forecast/webservice/json/v1' // livedoor Weather Hacks
  axios = axios

  async get(city) {
    return this.httpGet(`city=${city}`)
  }

  /** @private */
  async httpGet(query) {
    return this.axios.get(`${Weather.API_URL}?${query}`)
  }
}

export default Weather
