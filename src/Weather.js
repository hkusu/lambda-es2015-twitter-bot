import axios from 'axios'

class Weather {
  static API_URL = 'http://weather.livedoor.com/forecast/webservice/json/v1' // livedoor Weather Hacks
  axios = axios

  async get(city) {
    const res = await this.httpGet(`city=${city}`)
    return res
  }

  /** @private */
  async httpGet(query) {
    const res = await this.axios.get(`${Weather.API_URL}?${query}`)
    return res
  }
}

export default Weather
