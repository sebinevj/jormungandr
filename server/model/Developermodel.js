const connection  = require("../util/database");

module.exports = class DeveloperModel{

    //select DeveloperId in Developer table with given data, UserId
    //@data represents UserId
    getDeveloperId(data){
        let stmt = `select DeveloperId from user where UserId = ?`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }

    //select DeveloperId in Developer table with given data, email
    //@data represents email
    getDeveloperIdByEmail(data){
        let stmt = `select DeveloperId from user where Email = ?`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }


    //select all columns in Developer table with given data, UserId
    //it uses Developer, User table joined by DeveloperId
    //@data represents UserId
    selectAllDeveloperColumn(data){
        let stmt = 
        `SELECT dev.DeveloperId, dev.DeveloperName, dev.Location, dev.Phone FROM developer as dev 
        join user as us 
        on dev.DeveloperId = us.DeveloperId 
        where us.UserId = ?`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }

    //select Developer's game id, name,price, description, releaseDate from Developer table 
    //and select sysRequirments and game's genre with DeveloperId
    //@data represents DeveloperId
    getDeveloperInfo(data){
        console.log("getDeveloperInfo", JSON.stringify(data))

        let stmt = 
        `SELECT ga.GameId, ga.Name, ga.Price, ga.RelaseDate, ga.Description, sys.Graphics, sys.Memory, sys.Platform, sys.Storage FROM Developer as dev 
        join game as ga
        on dev.DeveloperId = ga.DeveloperId
        join systemrequirements as sys
        on ga.SysReqsId = sys.SysReqsId
        where dev.DeveloperId = ?`;
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then((rows, fieldData) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }
}