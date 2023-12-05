import PopularGame from './components/PopularGame';
import SmallGame from './components/SmallGame';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState, useEffect} from 'react';
import './Home.css';
import {
    InputLabel,
    MenuItem,
    Select,
    FormControl,
  } from "@mui/material";

function Home(){

    //const [curIdx, setcurIdx] = useState([0,1,2]);
    //const [array, setData] = useState(null);

    //allGameIds has all of existing GameIds in DataBase
    //const [allGameIds, setAllGameIds] = useState([]);

    const [type, setType] = useState("all");
   

    /**
     * auth will contain session of user's email
     */
    const [auth, setAuth] = useState(null);

    useEffect(() => {

        /*
        fetch('http://localhost:5555/loadimages', {
            method: 'POST',
            body: JSON.stringify({type: type}),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then((data) => {
            console.log("at home...", data);
            setData(data.onsaleGame);
            setAllGameIds(data.getAllGamesId)
            console.log("at home...", data);
        });
        */

    
        //get session of user, if there is no session auth will be null
        let data = sessionStorage.getItem("session");
        setAuth(JSON.parse(data));
        console.log("session data:",  JSON.parse(data));
       
    }, []);


    const handleChange = (event) => {
        setType(event.target.value);
        console.log(type)
    };


    /*
    function gamesOnSale(){

        function buttonClickHandler(param){

            if(param == 1){
                setcurIdx([(curIdx[2] + 1) % array.length, (curIdx[2] + 2) % array.length, (curIdx[2] + 3) % array.length]);
            }else{

            }
           
        }

        return (
            <div className='onSaleContainer'>
                <button onClick={()=>buttonClickHandler(-1)}>left</button>
                <div className='onSaleGameContainer'>
                    {array && curIdx.map((idx) => {
                        return(
                        <div className='onSaleGame'>
                            <img width={"150px"} height={"150px"} 
                            src={`http://localhost:5555/${array[idx].gameId}/${array[idx].gameTitle}-01.png`}
                            />
                            <div>{array[idx].gameTitle}</div>
                            <div>{array[idx].gamePrice}</div>
                        </div>
                        )
                    })}
                </div>
                <button onClick={()=>buttonClickHandler(1)}>right</button>
            </div>
        );
    }

    function displayAllGames(){

        const gameImg = allGameIds.map((Game) =>(
            <>
                <img width={"150px"} height={"150px"} 
                    src={`http://localhost:5555/${Game.GameId}/${Game.Name}-01.png`}
                />
            </>
            )   
        )

        return(
            <>
             {gameImg}
            </>
        )
    }
    */

    return (
        <div className='totalWrapper'>
            <div className='backgroundHome'>
                <Header/>
                {/*
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Games</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="games"
                    onChange={handleChange}
                    >
                    <MenuItem value={"all"}>All Games</MenuItem>
                    <MenuItem value={"popular"}>Most Popular</MenuItem>
                    <MenuItem value={"bestRated"}>Best Rated</MenuItem>
                    </Select>
                </FormControl>
    */}
                <h1>All Games</h1>
                <PopularGame
                    type="all"
                />
                <h1>Best Rated</h1>
                <PopularGame
                    type="bestRated"
                />
                <h1>Popular Games</h1>
                <PopularGame
                    type="popular"
                />
                <SmallGame
                    type="bestRated"
                />
                
                <Footer/>
            </div>
        </div>
        )
    
}

export default Home; 