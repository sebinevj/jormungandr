const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser");
const path = require('path');
const redis = require('redis');
const RedisStore = require("connect-redis").default;
const cookieParser = require("cookie-parser");
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5555; 
const {imageloader, gameprofileLoader} = require('./controller/controller');
const {loginHandler, registerHandler, getUserIdHandler} = require('./controller/UserController');
const {getDeveloperIdHandler, getDeveloperHandler} = require('./controller/DeveloperController');

/*
let redisClient = redis.createClient();
redisClient.connect().catch(console.error);

redisClient.on('error', (err) => console.log(`Fail to connect with redis. ${err}`));
redisClient.on('connect', () => console.log('Successful to connect with redis'));
*/


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './images')));
/*
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: 'sauce',    //The way of secret needs to be invisible to pulbic
    resave: false,
    saveUninitialized: true,
}));
*/
app.use(cookieParser());



app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`);
})


app.get("/api", loginHandler, (req,res)=>{
    console.log("reached api !");
    res.send({title: 'hello react!'});
})

app.post("/loadimages", imageloader, (req,res)=>{
    console.log("loaded images from server");
})


app.post("/requestgameprofile", gameprofileLoader,(req,res)=>{
    console.log("loaded images from server");
})

app.post("/register", registerHandler);

app.post("/login", loginHandler);

app.post("/getuserid", getUserIdHandler);

app.post("/getdeveloperid", getDeveloperIdHandler);
//app.post("/getdeveloperinfo", );
//   /user/login /user/register /user/getuserid  >>router them