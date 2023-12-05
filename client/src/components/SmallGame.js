import React, { useState, useEffect} from 'react';
import "./smallGames.css";
import { useNavigate } from "react-router-dom";


function SmallGame(props){

    const [auth, setAuth] = useState(null);

    const [typeGame, setTypeGame] = useState(props.type)
    const [curIdx, setcurIdx] = useState([0,1,2]);


    const [navIdx, setNavIdx] = useState(0);

    const navigate = useNavigate();


    const [array, setData] = useState(null);


    useEffect(() => {

        //fetch POST loadImages , cant do GET since we have some data to send? 
        fetch('http://localhost:5555/loadimages', {
            method: 'POST',
            body: JSON.stringify({type: typeGame}),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then((data) => {
            console.log("data", data)
            setData(data)

        })
        .catch((error)=>console.log(error));

        //getting session and storing it into auth
        let data = sessionStorage.getItem("session");
        setAuth(JSON.parse(data));
    },[]);

    function buttonClickHandler(param){

        if(param == 1){
            setcurIdx([(curIdx[2] + 1) % array.length, (curIdx[2] + 2) % array.length, (curIdx[2] + 3) % array.length]);
        }else{
            setcurIdx([(curIdx[2] - 3) % array.length, (curIdx[2] - 2) % array.length, (curIdx[2] - 1) % array.length]);
        }
       
    }

    const navigateToGameProfile= (idx) => {
        console.log(idx)
        navigate(`/gameprofile/${array[idx].GameId}`,  {state: [array[idx].Name, array[idx].GameId]});
    
    };


    return (
        <div className='onSaleContainer'>
            <button onClick={()=>buttonClickHandler(-1)}>left</button>
            <div className='onSaleGameContainer'>
                {array && curIdx.map((idx) => {
                    return(
                    <div className='onSaleGame'>
                        <img width={"150px"} height={"150px"} 
                        src={`http://localhost:5555/${array[idx].GameId}/${array[idx].Name}-01.png`}
                        onClick={navigateToGameProfile}
                        />
                        <div>{array[idx].Name.substring(0,15)}</div>
                    </div>
                    )
                })}
            </div>
            <button onClick={()=>buttonClickHandler(1)}>right</button>
        </div>
    );
}

export default SmallGame;