export default {
  port: process.env.PORT || 5000,
  apiUrl: process.env.API_URL || 'http://localhost',
  apiVersion: process.env.API_VERSION || 'v1',
  mongoUrl:
    process.env.MONGO_URL || `mongodb://localhost:27017/node-clean-arch`,
}
