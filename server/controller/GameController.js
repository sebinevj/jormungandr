//import db from './DB.json';
const db = require('./DB.json');
const GameModel = require('../model/Gamemodel');
const UsersModel = require('../model/Usermodel')

const gs = new GameModel();
const us = new UsersModel()

exports.imageloader =  async (req, res, next) =>{

    if(req.body.type == "all"){

        console.log("all")

        let result;
        try{
            [result] = await gs.getAllGamesId();
        }
        catch(error){
            console.log(error);
        }

        res.send(result);

    }
    else if(req.body.type == "popular"){
        console.log("popular")

        try{
            [result] = await gs.getMostPopular();
        }
        catch(error){
            console.log(error);
        }

        res.send(result[0]);
    }
    else if(req.body.type == "onSale"){

        let result;
        try{
            [result] = await gs.getAllGamesId();
        }
        catch(error){
            console.log(error);
        }

        res.send({onsaleGame: db.gameData.slice(0,5), getAllGamesId: result})
    }
    else if(req.body.type == "bestRated"){
        console.log("bestRated");

        try{
            [result] = await gs.getBestRatedGames();
        }
        catch(error){
            console.log(error);
        }
        res.send(result[0]);
        
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


exports.buyGameHandler = async(req,res)=>{

    console.log("In buy game")

    let result;
    try{
        [result] = await us.getUserId(req.body.Email)
    }
    catch(error){
        console.log(error);
    }
    

    const transactionRow = {
        GameId: req.body.GameId,
        UserId: result.UserId,
    }
    
    try{
        revId = await gs.insertNewTransaction(transactionRow)
    }
    catch(error){
        console.log(error);
    }

    res.send({case:true});
}
