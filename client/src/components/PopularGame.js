import React, { useState, useEffect} from 'react';
import "./PopularGame.css";
import { useNavigate } from "react-router-dom";
import ExtraImage from './ExtraImage';

function PopularGame(){

    //console.log("props at PopularGame", props, props.auth, props.auth.Developer, typeof(props.auth.Developer));

    const [mountedFlag, setMountedFlag] = useState(false);
    const [flag, setTempFlag] = useState(false);
    const [curIdx, setcurIdx] = useState(0);
    const [array, setData] = useState(null);
    const [mainImageIdx, setMainImageIdx] = useState(1);
    const [extraImage, setExtraImage] = useState([2,3,4,5,6,7]);

    const [auth, setAuth] = useState(null);


    //const array = DB.gameData;
    //let array;
    let extraImages; 

   
    function loadExtraImages(){
        //console.log(`${array[curIdx].gameTitle}`);
        //extraImages = extraImage.map((index) => <ExtraImage gameTitle={`${array[curIdx].gameTitle}`} index={index} navigateToGameProfile={navigateToGameProfile}/>)
    }

    async function loadArray(data){
        await setData(data);
        console.log("data arrrived.. from local DB for now..", data);
       
    }


    useEffect(() => {

        //fetch POSt loadImages , cant do GET since we have some data to send? 
        fetch('http://localhost:5555/loadimages', {
            method: 'POST',
            body: JSON.stringify({type: "popular"}),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then((data) => {
           
            //setData(data);
            loadArray(data)
            .then(()=>{
                console.log("loadExtraImages");
                loadExtraImages();
                }
            )
            //console.log("loadExtraImages");
            //console.log(data);
            
        });

        //getting session and storing it into auth
        let data = sessionStorage.getItem("session");
        setAuth(JSON.parse(data));
       
    },[]);


    useEffect(()=>{
        if(auth){
            setMountedFlag(true);
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

    /*
    useEffect(() => {
        console.log("loadExtraImages");
        //extraImages = extraImage.map((index) => <ExtraImage gameTitle={array[curIdx].gameTitle} index={index} navigateToGameProfile={navigateToGameProfile}/>)
    },[flag]);
    */

    //fetch the data and store into array 
    //data will be [{"title": "xx", "mainPic": xx.jpg, "detailedPic": [xx.jpg, xy.jpg, ...], "price":  23.23}]


    //array that represents fixed number of popular games 


    //holds current index of array 

    //show the very first index in the list when first rendered 

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

    //swtiches main picture with given hovered image's id 
    const switchMainImage=(id)=>{

    }

    function buyHandler(){
        if(!auth){
            alert("you must login to purchase a game");
        }else{

        }
    }


    if(mountedFlag){
    return(
        <div className='PopularGameContainer'>
           
            <div className='backgroundContainer'>
            <button className='buttonOnSide' onClick={() => ButtonHandler(-1)}>left</button>  

            <div className='contentContainer'>  

            <div className='pictureContainer'>
            <div className='leftContainer'>
            {/*<div>popular games</div>*/}
            {array && <div> {array[curIdx].gameTitle} </div>}

               {array &&
                <img
                width={"350px"} height={"350px"}
                //src={`http://localhost:5555/${array[curIdx].gameTitle}/${array[curIdx].gameTitle}-01.png`}
                src={`http://localhost:5555/${array[curIdx].gameId}/${array[curIdx].gameTitle}-0${mainImageIdx}.png`}
                onClick={navigateToGameProfile}
                />
               }
                
            </div>  
            <div className='rightContainer'>
                <div className='extraImagesContainer'>
                    {/*{flag && extraImages}*/}
                    {flag && extraImage.map((index) => {
                    return(
                    <ExtraImage gameId={`${array[curIdx].gameId}`} gameTitle={`${array[curIdx].gameTitle}`} index={index} navigateToGameProfile={navigateToGameProfile}  setMainImageIdx={setMainImageIdx}/>
                    )
                    })}
                </div>
                <div className='purchaseContainer'>
                    {array && <div> ${array[curIdx].gamePrice} </div>}
                    
                    
                    {!auth.Developer && <button onClick={buyHandler}>Buy Now</button>}
                </div>
            </div>
            </div> 

            <div className='bottomContainer'>
                {array && <div> {array[curIdx].gameDescription} </div>}
                
            </div>
            </div> 

            <button className='buttonOnSide' onClick={() => ButtonHandler(1)}>right</button>
            </div>
        </div>
    )
    }
}

export default PopularGame;