const connection  = require("../util/database");

module.exports = class ReviewModel{


    insertNewReview(data){
        let stmt = `Insert into review(GameId, UserId, Description, WrittenDate, Rating) 
        values(?,?,?,NOW(),?);`
        return (new Promise((resolve, reject) => {
            connection.execute(stmt,[data.GameId, data.UserId, data.Description, data.Rating])
                .then((rows, fieldData) => {
                    resolve(rows);
                })
                .catch(err => console.log(err))
        }));
    }


}