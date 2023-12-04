const DeveloperModel = require('../model/Developermodel');
const SystemReqModel = require('../model/SystemRequirementModel');
const dev = new DeveloperModel();
const sys = new SystemReqModel();

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
//         gameTable:{
//             title: String,
//             price: String,
//             description: String,
//             date: String
//         },
//         genre: Array[Number],
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


    let result;
    try{
        [result] = await sys.insertSystemRequirement(req.body.gameInfo.sysTable)
    }
    catch(error){
        console.log(error);
    }

    try{
        [result] = await sys.getMostRecentSystemRequirement()
    }
    catch(error){
        console.log(error);
    }

    console.log("submitGameHandler", result);

    res.send({case:true});

}