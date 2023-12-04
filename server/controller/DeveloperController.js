const DeveloperModel = require('../model/Developermodel');
const dev = new DeveloperModel();

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


exports.submitGameHandler = async(req,res)=>{

  
    GameID = req.body.id;
    gameInfo = req.body.gameInfo;
    console.log("/postgameinfo/submitGameHandler",GameID , JSON.stringify(gameInfo));


    let result;
    // try{
    //     [result] = await dev.getDeveloperInfo(req.body)
    // }
    // catch(error){
    //     console.log(error);
    // }
    res.send({case:true});

}