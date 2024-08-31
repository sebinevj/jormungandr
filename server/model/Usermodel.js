const connection  = require("../util/database");

module.exports = class UsersModel{

    //fetch User table by given data; email
    getUserId(data){
        //console.log("getting User data for..", data);
        let stmt = `select * from user where email = ?`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    console.log(rows);
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    };

    //fetch User's email and name by given data; UserId
    getUserInfoById(data){
        let stmt = `select Email, Name from user where UserId = ?`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }

    purchaseGame(data)
    {
        let stmt = 'INSERT INTO Transaction(GameId, UserId, purchaseDate) VALUES(?, ?, NOW());'
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data.GameId, data.UserId])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }

    leaveReview(data)
    {
        let stmt = 'INSERT INTO Review(GameId, UserId, Description, WrittenDate, Rating) VALUES(?, ?, ?, NOW(), ?);'
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data.GameId, data.UserId, data.Description, data.Rating])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));

    }


    //check email address when registering 
    //if email already exist, notify user 
    checkUserEmail(email){
        let stmt = `select UserId from user where email = ?`;
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [email])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }

    //@data represents password from user
    hashPassword(data){
        let stmt = `select md5(?)`;
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }


    registerUser(data){

        let stmt = `Insert Into user(Email, password, Name, DOB) value (?,?,?,?)`;
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data.email, data.password, data.userName, data.DOB.slice(0,10)])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }

    //@data represnets UserID 
    // loadUserProfile(data)
    // {
    //     //console.log("Usermodel.loadUserProfile()")

    //     let stmt = 'SELECT t.purchaseDate, g.Name, g.Description, g.AvgRating FROM Game AS g JOIN Transaction As t ON g.GameId = t.GameId WHERE UserId = ?';

    //     return (new Promise((resolve, reject) => {
    //         connection.execute(stmt, [data])
    //             .then((rows, fieldData) => {
    //                 resolve(rows); // return data
    //             })
    //             .catch(err => console.log(err))
                
    //     }));

    // }

    //@data represnets UserID 
    UserTransactions(data)
    {
        let stmt = `SELECT ts.purchaseDate, ga.Name, ga.GameId FROM transaction as ts 
        Join game as ga 
        on ts.GameId = ga.GameId
        where UserId = ?`

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then((rows, fieldData) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));

    }

    UserTransactionsIdOnly(data)
    {
        let stmt = `SELECT ga.GameId FROM transaction as ts 
        Join game as ga 
        on ts.GameId = ga.GameId
        where UserId = ?`

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then((rows, fieldData) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));

    }
 
}
