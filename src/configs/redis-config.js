const { createClient } = require('redis');
const { REDIS_PASSWORD, REDIS_DB_LOCATION } = require('./ServerConfig');

const client = createClient({
    password: REDIS_PASSWORD,
    socket: {
        host: REDIS_DB_LOCATION,
        port: 18816
    }
});
client.on('connect', () => {
    console.log("Redis Connected");
})
client.on('ready', () => {
    console.log("Redis is Ready to Use");
})
client.on('error', (err) => {


    console.log(`Connection Error ${err}`);
})
client.on('end', () => {


    console.log(`Connection End `);
})
module.exports = { client }