const connection  = require("../util/database");

module.exports = class GameModel{

    //data is GameId
    getGameTable(data){
        let stmt = `SELECT gm.Name, gm.Price, gm.Description, gm.RelaseDate, sys.Memory, sys.Graphics, sys.Storage, sys.Platform, dev.DevloperName, dev.Phone, dev.Location 
        FROM Game as gm
        join SystemRequirements as sys
        on gm.SysReqsId = sys.SysReqsId
        join Developer as dev 
        on gm.DeveloperId = dev.DeveloperId 
        Where GameId = ?`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
        }));
    }

    getReviewTable(data){
        let stmt = `select rev.Rating, rev.WrittenDate, rev.Description, us.Name 
        from Review as rev 
        join User as us 
        on rev.UserId = us.UserId 
        where GameId = ?`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
        }));
    }

    getMostRecentGameId(){
        let stmt = `select GameId from Game ORDER BY GameId DESC LIMIT 1;`
        return (new Promise((resolve, reject) => {
            connection.execute(stmt)
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
        }));
    }

}