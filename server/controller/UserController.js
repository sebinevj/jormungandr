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

    // async function hashPassword(){
    //     let hashedPW;
    //     try{
    //         [hashedPW] = await us.hashPassword(req.body.password);
    //     }catch(error){
    //         console.log(error);
    //     }
    //     isPasswordMatch(hashedPW);
    // }

    async function isPasswordMatch(hashedPW){

        //console.log("login handler:", Object.values(hashedPW)[0], result.password);
        if(hashedPW === result.password){
           
            state = {flag: true, message:""};
           
        }else{
            state = {flag: false, message:"password does not match"};
        }
        res.send({state, result});
    }

    let state;
    //given email was registered
    if(result){
        //compare retrived password with hashed(req.body.password)
        // let hashedPW;
        // try{
        //     [hashedPW] = await us.hashPassword(req.body.password);
        // }catch(error){
        //     console.log(error);
        // }

        console.log(result.password)
        console.log(req.body.password)
        isPasswordMatch(req.body.password);



        //on success
        // if(req.body.password === result.password){
           
        //     state = {flag: true, message:""};
           
        // }else{
        //     state = {flag: false, message:"password does not match"};
        // }

    }else{
        state = {flag: false, message:"email was not registered"};
        res.send({state, result});
    }

    
   
};

exports.registerHandler = async(req,res,next)=>{


    console.log("registerHandler: password is ", req.body.password);
    // let hashedPW;
    // try{
    //     //console.log("searching for ", req.body.email);
    //     [hashedPW] = await us.hashPassword(req.body.password);
    // }catch(error){
    //     console.log(error);
    // }


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
            //console.log("hashedPW is ", JSON.stringify(hashedPW), Object.values(hashedPW)[0]);
            //req.body.password = Object.values(hashedPW)[0];
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