const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')

const getDefaults = config => {
  Object.keys(config).forEach(key => {
    config[key] = process.env[key] || config[key]
  })

  return config
}

module.exports = withPlugins([optimizedImages], {
  publicRuntimeConfig: getDefaults({
    HOST: process.env.NOW_URL || 'http://localhost',
    PORT: process.env.NOW_URL ? 443 : 3000,
    API_ROUTE: '/api',
    GRAPHQL_ENDPOINT: '/graphql',
    FACEBOOK_APP_ID: undefined,
    MAPBOX_API_KEY: undefined
  })
})
