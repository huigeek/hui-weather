const Configstore = require('configstore')
const packageJson = require('../package.json')

const config = new Configstore(packageJson.name)

const setConfigApiKey = apikey => apikey && config.set('apiKey', apikey)

const setConfigCity = city => city && config.set('city', city)

module.exports = { config, setConfigApiKey, setConfigCity }
