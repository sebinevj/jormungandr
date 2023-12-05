//import db from './DB.json';
const db = require('./DB.json');
const ReviewModel = require('../model/ReviewModel');
const UsersModel = require('../model/Usermodel');

const rm = new ReviewModel();
const us = new UsersModel();

exports.submitReviewHandler = async(req,res)=>{

    console.log("In review controller")


    let result;
    try{
        [result] = await us.getUserId(req.body.Email)
    }
    catch(error){
        console.log(error);
    }
    

    console.log("result",result)


    const reviewRow = {
        GameId: req.body.GameId,
        UserId: result.UserId,
        Description: req.body.Description,
        Rating: req.body.Rating
    }
    console.log("reviewRow", reviewRow);
    
    try{
        revId = await rm.insertNewReview(reviewRow)
    }
    catch(error){
        console.log(error);
    }

    res.send({case:true});
}