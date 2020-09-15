const https = require('https')
const { config } = require('./configure')
const { table } = require('table')

const weather = () => {
  const apikey = config.get('apiKey')
  if (!apikey) return

  const city = encodeURI(config.get('city'))
  const options = {
    hostname: 'api.map.baidu.com',
    port: 443,
    path: `/telematics/v3/weather?location=${city}&output=json&ak=${apikey}`,
    method: 'GET'
  }
  const request = https.request(options, (response) => {
    let chunks = []
    response.on('data', chunk => chunks.push(chunk))
    response.on('end', () => {
      const string = Buffer.concat(chunks).toString()
      const object = JSON.parse(string)
      let data = []
      data.push([`当前城市：${object.results[0].currentCity}`, '', '', ''])
      let i = 0
      let arr = object.results[0].weather_data
      let len = arr.length
      while (i < len) {
        data.push([arr[i].date, arr[i].weather, arr[i].wind, arr[i].temperature])
        i++
      }
      const output = table(data)
      console.log(output)
    });
  })

  request.end()
}

module.exports = { weather }
