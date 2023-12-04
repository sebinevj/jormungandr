const DeveloperModel = require('../model/Developermodel');
const SystemReqModel = require('../model/SystemRequirementModel');
const GameModel = require('../model/Gamemodel');
const GenreModel = require('../model/GameGenreModel');

const dev = new DeveloperModel();
const sys = new SystemReqModel();
const ga = new GameModel();
const gen = new GenreModel();

exports.getDeveloperIdHandler = async(req,res)=>{

    //console.log("getDeveloperIdHandler for ", req.body.userId);

    let result;
    try{
        [result] = await dev.getDeveloperId(req.body.userId)
    }
    catch(error){
        console.log(error);
    }
    //console.log("get DeveloperId..", JSON.stringify(result));
    res.send({data:result});
}

exports.getAllDeveloperColumnHandler = async(req,res)=>{

    let result;
    try{
        [result] = await dev.selectAllDeveloperColumn(req.body.userId)
    }
    catch(error){
        console.log(error);
    }
    //console.log("get DeveloperId..", JSON.stringify(result));
    res.send({data:result});

}


exports.getDeveloperHandler = async(req,res)=>{

    let result;
    try{
        [result] = await dev.getDeveloperInfo(req.body.DeveloperId)
    }
    catch(error){
        console.log(error);
    }

    //console.log("getDeveloperInfo", JSON.stringify(result))
    res.send({data:result});
}


//req.body will have
// gameInfo = {
//     gameTable:{
//             title: String,
//             price: String,
//             description: String,
//             date: String
//         },
//         genre: Array[Number],
//         email: String, 
//         sysTable:{
//             graphic: String,
//             memory: String,
//             storage: String,
//             system: String,
//         },   
//     }
exports.submitGameHandler = async(req,res)=>{

  
    GameID = req.body.id;
    gameInfo = req.body.gameInfo;
    console.log("/postgameinfo/submitGameHandler",GameID , JSON.stringify(gameInfo), JSON.stringify(gameInfo.sysTable), gameInfo.sysTable.memory);

    //insert a new SysReq
    let result;
    try{
        result = await sys.insertSystemRequirement(req.body.gameInfo.sysTable)
    }
    catch(error){
        console.log(error);
    }
    //after inserting new row in SysReq, get most recently created SysReqId
    let mostRecentSysReqId;
    try{
        [mostRecentSysReqId] = await sys.getMostRecentSystemRequirement()
    }
    catch(error){
        console.log(error);
    }


    //get DeveloperId of given data.email 
    let devId;
    try{
        [devId] = await dev.getDeveloperIdByEmail(req.body.gameInfo.email)
    }
    catch(error){
        console.log(error);
    }

    const gameRow = {
        DeveloperId: devId.DeveloperId,
        SysReqsId: mostRecentSysReqId.SysReqsId,
        game: req.body.gameInfo.gameTable
    }

    console.log("gameRow", gameRow);
    //with created SysReqId, retrived devId and req.body.gameInfo.gameTable; insert a new row into Game Table 
    
    try{
        devId = await ga.insertNewGame(gameRow)
    }
    catch(error){
        console.log(error);
    }

    //get most recent made GameId 
    let mostRecentGameId;
    try{
        [mostRecentGameId] = await ga.getMostRecentGameId(gameRow)
    }
    catch(error){
        console.log(error);
    }

    console.log("mostRecentGameId", mostRecentGameId);

    //insert gamegenres with req.body.gameInfo.genre with mostRecentGameId.GameId

    for(genreId of  req.body.gameInfo.genre){
        console.log("inserting genreId", genreId)
        try{
            result = await gen.insertGameGenreRow(genreId, mostRecentGameId)
        }
        catch(error){
            console.log(error);
        }
    }
    
    console.log("submitGameHandler", mostRecentSysReqId);

    res.send({case:true});

}