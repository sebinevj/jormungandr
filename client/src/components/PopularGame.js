
import React, { useState, useEffect} from 'react';
import "./PopularGame.css";
import { useNavigate } from "react-router-dom";
import ExtraImage from './ExtraImage';

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

//props=type
function PopularGame(props){
    const [typeGame, setTypeGame] = useState(props.type)
    const [flag, setTempFlag] = useState(false);
    const [curIdx, setcurIdx] = useState(0);
    //array refers to fetched data from  /loadimages
    const [array, setData] = useState(null);
    const [mainImageIdx, setMainImageIdx] = useState(1);
    const [extraImage, setExtraImage] = useState([2,3,4,5,6,7]);

    //used for saving a session 
    const [auth, setAuth] = useState(null);
    const [transactions, setTransactions] = useState([])

    //used for saving a session 
    const [authFlag, setAuthFlag] = useState(false);
    //const array = DB.gameData;
    //let array;
    let extraImages; 

    useEffect(() => {
        //fetch POST loadImages , cant do GET since we have some data to send? 
        fetch('http://localhost:8080/loadimages', {
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
    
    useEffect(() => {
        if (auth) {
            fetch('http://localhost:8080/getusertransactions', {
                method: 'POST',
                body: JSON.stringify({Email: auth.userEmail}),
                headers: {
                    'Content-Type': 'application/json',
                    },
                })
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                    let ids = []
                    for (let i = 0; i < data.transactions.length; i++){
                        ids.push(String(data.transactions[i].GameId))
                    }
                    console.log(ids)
                    setTransactions(ids)
                });
        }
    },[auth])


    useEffect(() => {
        console.log("array changed");
        if(array) setTempFlag(true);
    },[array]);
    useEffect(() => {
        console.log("flag changed", flag);
        if(flag){
            console.log(`${array[curIdx].gameTitle}`);
            //extraImages =  extraImage.map((index) => <ExtraImage gameId={`${array[curIdx].gameId}`} gameTitle={`${array[curIdx].gameTitle}`} index={index} navigateToGameProfile={navigateToGameProfile}/>);
            console.log("extraImages", extraImages);
        }
    },[flag]);
    useEffect(()=>{
       
        if(!auth){
            setAuthFlag(true);
        }
        else if(!auth.Developer){
            setAuthFlag(true);
        }
        else{
            setAuthFlag(false);
        }

    },[auth])

    //handles button 
    function ButtonHandler(idx){
        if(curIdx + idx < 0){
            setcurIdx(array.length - 1);
            return;
        }
        if(curIdx + idx > array.length - 1){
            setcurIdx(0);
            return;
        }
        setcurIdx(curIdx + idx);
    }
    const navigate = useNavigate();
    const navigateToGameProfile = () => {
        navigate(`/gameprofile/${array[curIdx].GameId}`,  {state: [array[curIdx].Name, array[curIdx].GameId]});
    
    };
    function handleBuy(){
        if(!auth){
            alert("You must login to purchase a game");
        }
        else if (transactions.includes(array[curIdx].GameId)){
            alert("You already bought this game");
        }
        else{
            fetch('http://localhost:8080/buygame',{
                method: 'POST',
                body:JSON.stringify({GameId: array[curIdx].GameId, Email: auth.userEmail}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then(() => {
                console.log("done")
                alert(`${array[curIdx].Name} bought successfully`);
            })
        }
    }

    //if(mountedFlag){
    return(
        <div className='PopularGameContainer'>
           
            <div className='backgroundContainer'>
            <button className='buttonOnSide' onClick={() => ButtonHandler(-1)}>

<FaChevronLeft size={40}/>
</button>  
            <div className='contentContainer'>  
            <div className='pictureContainer'>
            <div className='leftContainer'>
           
            {array && <div className="name"> {array[curIdx].Name} </div>}
               {array &&
                <img
                width={"350px"} height={"350px"}
                //src={`http://localhost:8080/${array[curIdx].gameTitle}/${array[curIdx].gameTitle}-01.png`}
                src={`http://localhost:8080/${array[curIdx].GameId}/${array[curIdx].Name}-0${mainImageIdx}.png`}
                onClick={navigateToGameProfile}
                />
               }
                
            </div>  
            <div className='rightContainer'>
                <div className='extraImagesContainer'>
                    {/*{flag && extraImages}*/}
                    {flag && extraImage.map((index) => {
                    return(
                    <ExtraImage gameId={`${array[curIdx].GameId}`} gameTitle={`${array[curIdx].Name}`} index={index} navigateToGameProfile={navigateToGameProfile}  setMainImageIdx={setMainImageIdx}/>
                    )
                    })}
                </div>
                <div className='purchaseContainer'>
                    {array && <div className="name"> ${array[curIdx].Price.toFixed(2)} </div>}
                    
                    
                    {authFlag &&
                            <button
                                onClick={handleBuy}
                                className="reviewbbutton"
                            > Buy now</button>
                    }
                </div>
            </div>
            </div> 
            <div className='bottomContainer'>
                {array && <div> {array[curIdx].Description} </div>}
                
            </div>
            </div> 
            <button className='buttonOnSide' onClick={() => ButtonHandler(1)}><FaChevronRight size={40}/></button>
            </div>
        </div>
    )
    }
export default PopularGame;
