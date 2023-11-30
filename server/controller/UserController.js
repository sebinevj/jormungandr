const UsersModel = require('../model/Usermodel');

const us = new UsersModel();

exports.loginHandler = async (req, res, next) => {

    let result;
    try{
        [result] = await us.getUserId(req.body.email)
    }
    catch(error){
        console.log(error);
    }

    let state;
    //given email was registered
    if(result){
        //compare retrived password with req.body.password
        //console.log("comparing..",req.body.password, result.password)
        if(req.body.password === result.password){
            state = {flag: true, message:""}
            //store session
            //console.log("success");
        }else{
            state = {flag: false, message:"password does not match"};
        }
    }else{
        state = {flag: false, message:"email was not registered"};
    }

    res.send({state, result});
    //console.log("result is ", result);
};

exports.registerHandler = async(req,res,next)=>{

    let user_id;
    try{
        console.log("searching for ", req.body.email);
        [user_id] = await us.checkUserEmail(req.body.email)
    }catch(error){
        console.log(error);
    }
    console.log("user_id is ", user_id);

    if(user_id){
        res.send({state: 'email already exist'});
    }else{
        //register given data , slice DOB from client for sql query.
        console.log("before registering... ", req.body, req.body.DOB.slice(0,10));

        try{
            await us.registerUser(req.body);
        }catch(error){
            console.log(error);
        }
        res.send({state: 'registered'});
    }   
    next();
}

exports.getUserIdHandler = async(req,res)=>{
    let result;
    try{
        [result] = await us.getUserId(req.body.email)
    }
    catch(error){
        console.log(error);
    }
    console.log("getUserIdHandler..", result.UserId);
    //res.send(result.UserId);
    res.send({data:result.UserId});
}


/*
exports.loginHandler = async(req,res,next)=>{

    let result;
    try{
        console.log("searching for ", req.body.email);
        [result] = await us.getUserId(req.body.email)
    }catch(error){
        console.log(error);
    }
    console.log("res is", result);

}
*/