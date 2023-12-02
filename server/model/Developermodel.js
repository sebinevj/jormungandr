const connection  = require("../util/database");

module.exports = class DeveloperModel{

    //select DeveloperId in Developer table with given data, UserId
    getDeveloperId(data){
        let stmt = `select DeveloperId from User where UserId = ?`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }
    //select all columns in Developer table with given data, UserId
    selectAllDeveloperColumn(data){
        let stmt = `select * from User where UserId = ?`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }

    //select Developer's game's name,price, description, releaseDate from Developer table 
    //and select sysRequirments and game's genre with DeveloperId
    //@data represents DeveloperId
    getDeveloperInfo(data){
        let stmt = 
        `SELECT ga.Name, ga.Price, ga.RelaseDate, ga.Description, sys.Graphics, sys.Memory, sys.Platform, sys.Storage FROM Developer as dev 
        join Game as ga
        on dev.DeveloperId = ga.DeveloperId
        join SystemRequirements as sys
        on ga.SysReqsId = sys.SysReqsId
        where dev.DeveloperId = ?`;
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }
}