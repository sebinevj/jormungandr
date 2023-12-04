const connection  = require("../util/database");

module.exports = class GameGenreModel{

    //insert a new row record into GameGenre Table 
    //@data represents 
    insertGameGenreRow(GameGenreId, GameId){
        let stmt = `INSERT INTO GameGenre(GenreId, GameId) VALUES (?,?)`;

        return (new Promise((resolve, reject) => {
            connection.execute(stmt, [GameGenreId, GameId])
                .then(([rows, fieldData]) => {
                    resolve(rows); // return data
                })
                .catch(err => console.log(err))
                
        }));
    }

}