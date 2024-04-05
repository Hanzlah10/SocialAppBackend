const dotenv = require('dotenv')
dotenv.config()
module.exports = {
    MONGO_CONNECTION_URL: process.env.MONGO_CONNECTION_URL,
    PORT: process.env.PORT,
    JWT_KEY: process.env.JWT_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    REDIS_DB_LOCATION: process.env.REDIS_DB_LOCATION


}