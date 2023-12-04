import React, { useState, useEffect} from 'react';
import "./PopularGame.css";
import { useNavigate } from "react-router-dom";
import ExtraImage from './ExtraImage';

function PopularGame(){

   

    const [flag, setTempFlag] = useState(false);
    const [curIdx, setcurIdx] = useState(0);

    //array refers to fetched data from  /loadimages
    const [array, setData] = useState(null);
    const [mainImageIdx, setMainImageIdx] = useState(1);
    const [extraImage, setExtraImage] = useState([2,3,4,5,6,7]);

    //used for saving a session 
    const [auth, setAuth] = useState(null);


    //used for saving a session 
    const [authFlag, setAuthFlag] = useState(false);

    //const array = DB.gameData;
    //let array;
    let extraImages; 

   

    //this function saves fetched data from /loadimages
    async function loadArray(data){
        await setData(data);
        console.log("data arrrived.. from local DB for now..", data);
       
    }


    useEffect(() => {

        //fetch POST loadImages , cant do GET since we have some data to send? 
        fetch('http://localhost:5555/loadimages', {
            method: 'POST',
            body: JSON.stringify({type: "popular"}),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then((data) => {
           
            loadArray(data)

        })
        .catch((error)=>console.log(error));

        //getting session and storing it into auth
        let data = sessionStorage.getItem("session");
        setAuth(JSON.parse(data));
       
    },[]);



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

        navigate(`/gameprofile/${array[curIdx].gameId}`,  {state: [array[curIdx].gameTitle, array[curIdx].gameId]});
    
    };

    function buyHandler(){
        if(!auth){
            alert("you must login to purchase a game");
        }else{

        }
    }


    //if(mountedFlag){
    return(
        <div className='PopularGameContainer'>
           
            <div className='backgroundContainer'>
            <button className='buttonOnSide' onClick={() => ButtonHandler(-1)}>left</button>  

            <div className='contentContainer'>  

            <div className='pictureContainer'>
            <div className='leftContainer'>
           
            {array && <div> {array[curIdx].Name} </div>}

               {array &&
                <img
                width={"350px"} height={"350px"}
                //src={`http://localhost:5555/${array[curIdx].gameTitle}/${array[curIdx].gameTitle}-01.png`}
                src={`http://localhost:5555/${array[curIdx].GameId}/${array[curIdx].Name}-0${mainImageIdx}.png`}
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
                    {array && <div> ${array[curIdx].Price.toPrecision(4)} </div>}
                    
                    
                    {authFlag && <button onClick={buyHandler}>Buy Now</button>}
                </div>
            </div>
            </div> 

            <div className='bottomContainer'>
                {array && <div> {array[curIdx].Description} </div>}
                
            </div>
            </div> 

            <button className='buttonOnSide' onClick={() => ButtonHandler(1)}>right</button>
            </div>
        </div>
    )
    }
//}

export default PopularGame;