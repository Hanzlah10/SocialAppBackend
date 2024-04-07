const express = require('express')
const app = express()
const { connectDB } = require('./configs/config');
const bodyParser = require('body-parser');
const { Tweet } = require('./models/index')
const passport = require('passport');
const { PORT } = require('./configs/ServerConfig');
const apiRoutes = require('./routes/index');
const { passportAuth } = require('./configs/passport-config');
const { client } = require('./configs/redis-config')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ inflate: true, type: 'application/json' }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

passportAuth(passport)
app.use('/api', apiRoutes)
app.listen(PORT, async () => {
  await connectDB();
  // (async function () {
  //   await client.connect()
  // })()
  //   const response = await Tweet.findById({
  //     _id:
  // })
  // const tweet =new TweetRepository()
  // const id = '65d8ce6a1ffbc53bfefd2ede'
  //   const response =await tweet.getById(id)
  //   console.log(response);
  // create()
  //  const user = new  UserRepository()
  // await  user.create({email:"omjagtap465",password:"12345",username:"omjagtap"})
  console.log(`Sucessfully started the server on ${PORT}`);
})


