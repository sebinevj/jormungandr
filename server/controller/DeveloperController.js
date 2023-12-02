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

exports.getDeveloperHandler = async(req,res)=>{

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