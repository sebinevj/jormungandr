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

        //on success
        if(req.body.password === result.password){
           
            state = {flag: true, message:""};
           
        }else{
            state = {flag: false, message:"password does not match"};
        }
    }else{
        state = {flag: false, message:"email was not registered"};
    }

    res.send({state, result});
   
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

exports.loadUserProfileHandler = async (req, res) =>
{
    let result;
    try {
        [result] = await us.loadUserProfile(req.body.UserId)
    } catch (error) {
        console.log(error)
    }
    
    res.send({ data: result });
}


//get Transaction table data with given UserId 
//and get User table data with given UserId
exports.getPurchasedGameHandler = async(req,res)=>{
    let transactionRes;
    try {
        [transactionRes] = await us.UserTransactions(req.body.UserId)
    } catch (error) {
        console.log(error)
    }

    let userData;
    try {
        [userData] = await us.getUserInfoById(req.body.UserId)
    } catch (error) {
        console.log(error)
    }
    
    res.send({transaction: transactionRes, userData: userData});
}


exports.getTransactionsByEmail = async(req,res)=>{

    let result;
    try{
        [result] = await us.getUserId(req.body.Email)
    }
    catch(error){
        console.log(error);
    }
        
    let transactionRes;
    try {
        [transactionRes] = await us.UserTransactionsIdOnly(result.UserId)
    } catch (error) {
        console.log(error)
    }

    res.send({transactions: transactionRes});
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