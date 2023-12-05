import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import Header from './components/Header';
import Review from './components/Review';
import ExtraImage from './components/ExtraImage';
import Footer from './components/Footer';
import Rating from '@mui/material/Rating';
import './Gameprofile.css'

export default function GameProfile(){

    const [flag, setFlag] = useState(false);
    const [extraImage, setExtraImage] = useState([2,3,4,5]);
    //rating
    const [value, setValue] = useState(0);
    //for now use title, later use id 
    //location[0] has game title,  location[1] has gameId
    const location = useLocation();
    location.search = "" 
    console.log(location)

    const [text, setText] = useState("")

    const [data, setData] = useState(null)

    const [gameName, setGameName] = useState("")
    const [auth, setAuth] = useState(null);


    const [init, setInit] = useState(true)
    

    const currgameId = location.pathname.slice(location.pathname.indexOf('/', 1) + 1);
    

    useEffect(() => {
        console.log("here");

        let sessiondata = sessionStorage.getItem("session");
        setAuth(JSON.parse(sessiondata));
        console.log("session data:",  JSON.parse(sessiondata));

        if (init) {
            setInit(false)
            fetch('http://localhost:5555/requestgameprofile', {
            method: 'POST',
            body: JSON.stringify({id: currgameId}),
            headers: {
                'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then((data) => {
                console.log(data.gameProfile.DeveloperName)
                setGameName(data.gameProfile.Name)
                setData(data)
            });
        }
    },[init]);



    useEffect(()=>{
        //after data arrive, make developer description and sysRequirments sections
        if(data){
            setFlag(true);
        }
    },[data])


    function createReview() {
        console.log("In create Review")
        console.log(text)
        console.log(value)

        console.log(auth)


        fetch('http://localhost:5555/postreviewinfo',{
                method: 'POST',
                body:JSON.stringify({GameId: currgameId, Description: text, Rating: value, Email: auth.userEmail}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then((data) => {
                console.log("done")
            })
    }

    function handleBuy() {
        console.log("Bought!")
    }



    return(
        <div className='gameProfileBackgroundContainer'>
            <Header/>
            <h1> {`${gameName}`} </h1>
            <div className='gameProfileBody'>
                <div className='contentContainer'>
                    <div className='leftcontainercontent'>
                        <img
                            width={"300px"} height={"300px"}
                            src={`http://localhost:5555/${currgameId}/${gameName}-01.png`}
                        />
                        {data && <div className='gameProfileDescription'> {data.gameProfile.Description}  </div>}

                    </div>
                    <div className='rightcontainercontent'>
                        <div className='extraImagesContainer'>
                            {data && extraImage.map((index) => {
                                return(
                                <ExtraImage gameId={`${currgameId}`} gameTitle={`${gameName}`} index={index} navigateToGameProfile={null}  setMainImageIdx={null}/>
                                )
                            })}
                        </div>
                        {data && 
                            <div className='developerContainer'>
                                <div>{data.gameProfile.DeveloperName}</div>
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
                        <div className="buyButton">
                            <button
                                onClick={handleBuy}
                                className="reviewbutton"
                            > BUY NOW</button>
                        </div>

                    </div>
                </div>
            </div>
            <h1> Reviews </h1>
            <div className='revContainer'>
                <div className='leftcontainerreview'>
                {data && data.reviews.map((review) => {
                        return(
                            <Review Name={review.Name} rating={review.Rating} description={review.Description} writtenDate={review.WrittenDate}/>
                        )
                    })}

                </div>
                <div className='rightcontainerreview'>
                    <div className='createReviewContainer'>
                        <form>
                            <label>Leave a review:</label>

                            <textarea 
                                className="reviewtext" 
                                value={text}
                                onChange={e => setText(e.target.value)} 
                            />
                            <Rating
                                value={value}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                }}
                                />

                            <div>
                                <button
                                    onClick={createReview}
                                    className="reviewbutton"
                                > submit</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            {/*
            
                <div className='contentContainer'>

                    <div className='leftContainer'>
                        <div> {`${gameName}`} </div>
                        <img
                            width={"300px"} height={"300px"}
                            src={`http://localhost:5555/${currgameId}/${gameName}-01.png`}
                        />
                        {data && <div className='gameProfileDescription'> {data.gameProfile.Description}  </div>}
                        {/*
                        
                        <img
                            width={"300px"} height={"300px"}
                            src={`http://localhost:5555/${location.state[1]}/${location.state[0]}-01.png`}
                        />

                        <div className='extraImagesContainer'>
                            {data && extraImage.map((index) => {
                                return(
                                <ExtraImage gameId={`${location.state[1]}`} gameTitle={`${location.state[0]}`} index={index} navigateToGameProfile={null}  setMainImageIdx={null}/>
                                )
                            })}
                        </div>
                    </div>
                    
                    <div className='rightContainer'>
                        
                        {data && 
                            <div className='developerContainer'>
                                <div>{data.gameProfile.DeveloperName}</div>
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
                        <label>Create a review:</label>

                        <textarea 
                            className="reviewtext" 
                            value={text}
                            onChange={e => setText(e.target.value)} 
                        />
                        <Rating
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            />
                        {value}
                        
                        <div>
                            <button
                                onClick={createReview}
                            > submit</button>
                        </div>
                    </form>
                </div>
            </div>
        */}
                
            <Footer/>
        </div>
    );
}