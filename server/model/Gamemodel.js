const connection  = require("../util/database");

module.exports = class GameModel{

    //getting Game's table and System Table rows with given GameId
    //@data is GameId
    getGameTable(data){
        let stmt = `SELECT gm.Name, gm.Price, gm.Description, gm.RelaseDate, sys.Memory, sys.Graphics, sys.Storage, sys.Platform, dev.DeveloperName, dev.Phone, dev.Location 
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


    getAllGamesId(){
        let stmt = `select GameId, Name from Game;`
        return (new Promise((resolve, reject) => {
            connection.execute(stmt)
                .then((rows, fieldData) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
        }));
    }


    //insert a new row into Game Table with given data; gets called from DeveloperController.js
    //@data refers to Object 
    //  data = {
    //     DeveloperId: Number
    //     SysReqsId: Number
    //     game: {
    //             title: String,
    //             price: String,
    //             description: String,
    //             date: String
    //          }   
    // }
    insertNewGame(data){
        let stmt = `Insert into Game(DeveloperId, SysReqsId, Name, Price, Description, RelaseDate) 
        values(?,?,?,?,?,?);`
        return (new Promise((resolve, reject) => {
            connection.execute(stmt,[data.DeveloperId, data.SysReqsId, data.game.title, data.game.price, data.game.description, data.game.date])
                .then((rows, fieldData) => {
                    resolve(rows);
                })
                .catch(err => console.log(err))
        }));

    }


    insertNewTransaction(data){
        let stmt = `Insert into Transaction(GameId, UserId, purchaseDate) values(?,?,NOW());`
        return (new Promise((resolve, reject) => {
            connection.execute(stmt,[data.GameId, data.UserId])
                .then((rows, fieldData) => {
                    resolve(rows);
                })
                .catch(err => console.log(err))
        }));

    }
    
    //call procedure best_rated
    getBestRatedGames(){
        let stmt = 'CALL best_rated;'
        return (new Promise((resolve, reject) => {
            connection.execute(stmt)
                .then((rows, fieldData) => {
                    resolve(rows);
                })
                .catch(err => console.log(err))
        }));
    }

    //call procedure most_popular
    getMostPopular(){
        let stmt = 'CALL most_popular;'
        return (new Promise((resolve, reject) => {
            connection.execute(stmt)
                .then((rows, fieldData) => {
                    resolve(rows);
                })
                .catch(err => console.log(err))
        }));
    }

}