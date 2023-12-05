const express = require('express');
const cors = require('cors')
const bodyParser = require("body-parser");
const path = require('path');
const redis = require('redis');
const RedisStore = require("connect-redis").default;
const cookieParser = require("cookie-parser");
const session = require('express-session');
const multer = require("multer");
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5555; 
const {imageloader, gameprofileLoader, nextgameIdHandler} = require('./controller/GameController');
const {loginHandler, registerHandler, getUserIdHandler, getPurchasedGameHandler} = require('./controller/UserController');
const {getDeveloperIdHandler, getAllDeveloperColumnHandler, getDeveloperHandler, submitGameHandler} = require('./controller/DeveloperController');
const {submitReviewHandler} = require('./controller/ReviewController');


/*
let redisClient = redis.createClient();
redisClient.connect().catch(console.error);

redisClient.on('error', (err) => console.log(`Fail to connect with redis. ${err}`));
redisClient.on('connect', () => console.log('Successful to connect with redis'));
*/


//const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({ 
    destination: function(req, file, cb) {

        //make a temporary dir
        const directory =`uploads/${GameID}`;
        //check if the temporary dir exist, if it doesn't create one
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true })
          }
        //set dir for multer
        cb(null, directory);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({storage});


//used to store generated GameID from DataBase and name filelocation for images
//GameID will always gets assigned before it gets used to make file directories for images.
let GameID;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './images')));
app.use(express.static(path.join(__dirname, './uploads')));
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
app.post("/getalldevelopercolumn", getAllDeveloperColumnHandler);
app.post("/getdeveloperinfo", getDeveloperHandler);
//   /user/login /user/register /user/getuserid  >>router them




app.post("/getuserinfo", getPurchasedGameHandler)




app.get('/getnextgameid',nextgameIdHandler);



// app.post("/postgameinfo",(req,res)=>{
//     console.log("/postgameinfo", JSON.stringify(req.body));
//     GameID = req.body.id;
//     res.send({case:true});
// })

app.post("/postgameinfo", submitGameHandler);


app.post("/postreviewinfo", submitReviewHandler);



app.post("/uploadimages", upload.array("files"), (req,res)=>{
    console.log("uploadimages", JSON.stringify(req.body), JSON.stringify(req.files));
    //res.send(req.body);
    const path = req.files[0].path;
    console.log("/uploadimages", path);
    res.send({path});
});