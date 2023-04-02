var config

if (process.env.NODE_ENV === 'production') {
  config = require('./prod')
  console.log('prod')
} else {
  console.log('devo')

  config = require('./dev')
}
config.isGuestMode = true

module.exports = config
