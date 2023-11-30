import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Review from './components/Review';
import ExtraImage from './components/ExtraImage';
import Footer from './components/Footer';
import Rating from '@mui/material/Rating';
import './Gameprofile.css'

export default function GameProfile(){

    const [curIdx, setcurIdx] = useState(0);
    const [data, setData] = useState(null);
    const [flag, setFlag] = useState(false);
    const [extraImage, setExtraImage] = useState([2,3,4,5,6,7]);
    //rating
    const [value, setValue] = useState(2);
    //for now use title, later use id 
    //location[0] has game title,  location[1] has gameId
    const location = useLocation(); 
    console.log("GameProfile location...", location.state, typeof(location.state));

    useEffect(() => {
        console.log("here");
        //ask server to give data for current game 
        
        fetch('http://localhost:5555/requestgameprofile', {
            method: 'POST',
            body: JSON.stringify({id: 2}),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(function(data){
            setData(data);
            console.log("in game profile received..", data,  typeof(data));
            console.log("description...", data.gameProfile.Description);
        });

        //if review exist 

    },[]);


    useEffect(()=>{
        //after data arrive, make developer description and sysRequirments sections
        if(data){
            setFlag(true);
        }
    },[data])



    return(
        <div className='gameProfileBackgroundContainer'>

            <div className='gameProfileBody'>
            <Header/>
                <div className='contentContainer'>

                    <div className='leftContainer'>
                        <div> {`${location.state[0]}`} </div>

                        <div className='extraImagesContainer'>
                            {data && extraImage.map((index) => {
                                return(
                                <ExtraImage gameId={`${location.state[1]}`} gameTitle={`${location.state[0]}`} index={index} navigateToGameProfile={null}  setMainImageIdx={null}/>
                                )
                            })}
                        </div>
                        {data && <div className='gameProfileDescription'> {data.gameProfile.Description}  </div>}
                    </div>
                    
                    <div className='rightContainer'>
                        <img
                            width={"250px"} height={"250px"}
                            src={`http://localhost:5555/${location.state[1]}/${location.state[0]}-01.png`}
                        />
                        {data && 
                            <div className='developerContainer'>
                                <div>{data.gameProfile.DevloperName}</div>
                                <div>{data.gameProfile.Location}</div>
                                <div>{data.gameProfile.Phone}</div>
                            </div>
                        }
                        {data && 
                            <div className='sysReqContainer'>
                                <div>{data.gameProfile.Memory}</div>
                                <div>{data.gameProfile.Graphics}</div>
                                <div>{data.gameProfile.Storage}</div>
                                <div>{data.gameProfile.Platform}</div>
                            </div>
                        }
                    </div>
                </div>
                <div className='reviewListContainer'>
                    {data && data.reviews.map((review) => {
                        return(
                            <Review Name={review.Name} rating={review.Rating} description={review.Description} writtenDate={review.WrittenDate}/>
                        )
                    })}
                </div>
                <div className='createReviewContainer'>
                    <form>
                        <textarea className="reviewtext"type='text'/>
                        
                        <div>
                            <button> comment</button>
                            <Rating
                                name="simple-controlled"
                                value={value}
                                onChange={(event, newValue) => {
                                setValue(newValue);
                                }}
                            />
                        </div>
                        
                    </form>
                    
                </div>
                <Footer/>
            </div>
          
        </div>
    );
}