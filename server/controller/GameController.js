//import db from './DB.json';
const db = require('./DB.json');
const GameModel = require('../model/Gamemodel');

const gs = new GameModel();

exports.imageloader =  (req, res, next) =>{

    if(req.body.type == "popular"){
        //console.log("popular in imageloader", JSON.stringify(db.gameData));
        res.send(db.gameData.filter((game) =>  game.gameId % 2 == 0))
    }
    else if(req.body.type == "onSale"){
        console.log("onSale");
        res.send(db.gameData.slice(0,5))
    }

}

exports.nextgameIdHandler = async (req,res,next)=>{

    //console.log("most recent GameId", req);
    let result;
    try{
        [result] = await gs.getMostRecentGameId();
    }
    catch(error){
        console.log(error);
    }
    console.log("most recent GameId here",result);
    res.send({GameId: result});
}


exports.gameprofileLoader =  async (req, res, next) =>{
    const newtitle = req.body.id;

    console.log("gameprofileLoader is..", newtitle);
    //get * with gameId 

    
    let result;
    try{
        [result] = await gs.getGameTable(req.body.id);
    }
    catch(error){
        console.log(error);
    }

    //get sysReq with gameId 
    let reviewResult;
    try{
        reviewResult = await gs.getReviewTable(req.body.id);
    }
    catch(error){
        console.log(error);
    }

    //get developer with gameId 

    //get review with gameId  

    console.log("getting.. gameprofileLoader", result);
    console.log("getting.. reviewResult", reviewResult);
    console.log("now.. ", db.gameData[newtitle]);

    res.send({gameProfile: result, reviews: reviewResult});
    //res.send(db.gameData[newtitle]);
}