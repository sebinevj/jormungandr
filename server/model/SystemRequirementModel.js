const connection  = require("../util/database");

module.exports = class SystemRequirementModel{

    //returns most recently made SystemRequirement
    getMostRecentSystemRequirement(){

        let stmt = 'SELECT SysReqsId FROM systemrequirements order by SysReqsId Desc Limit 1';
        return (new Promise((resolve, reject) => {
            connection.execute(stmt)
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
        }));
    }

    //@data represents 
    //sysTable:{
    //             graphic: String,
    //             memory: String,
    //             storage: String,
    //             system: String,
    //         },   
    insertSystemRequirement(data){
        console.log("insertSystemRequirement", JSON.stringify(data), data.memory);

        let stmt = `insert into systemrequirements(Memory, Graphics, Storage, Platform) 
        values(?, ?, ?, ?);`
        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [data.memory, data.graphic, data.storage, data.platform])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
        }));
    }
}