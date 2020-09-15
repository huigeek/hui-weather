const { weather } = require('./weather')
const { setConfigApiKey, setConfigCity } = require('./configure')

function cli(argsArray) {
  const args = argsArray.slice(2)
  const apiKeyRegExp = /apikey=(\w*)/ig
  const cityRegExp = /(city=)?([\u4E00-\u9FA5]{1,4})$/
  let cmd = {}

  args.map(item => {
    let [apikey, city] = [apiKeyRegExp.exec(item), cityRegExp.exec(item)]
    apikey !== null && (cmd.apikey = apikey[1])
    city !== null && (cmd.city = city[2])
  })

  cmd.apikey && setConfigApiKey(cmd.apikey)
  cmd.city && setConfigCity(cmd.city)

  weather()
}

module.exports = { cli }
