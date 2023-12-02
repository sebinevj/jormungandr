const connection  = require("../util/database");

module.exports = class UsersModel{

    //fetch User table by given data; email
    getUserId(data){
        //console.log("getting User data for..", data);
        let stmt = `select * from User where email = ?`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    };

    //check email address when registering 
    //if email already exist, notify user 
    checkUserEmail(email){
        let stmt = `select UserId from User where email = ?`;
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [email])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }

    registerUser(data){
        let stmt = `Insert Into User(Email, password, Name, DOB) value (?,?,?,?)`;
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data.email, data.password, data.userName, data.DOB.slice(0,10)])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }

}
