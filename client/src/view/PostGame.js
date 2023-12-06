import './PostGame.css'
import Footer from '../components/Footer';
import Header from '../components/Header'
import {useEffect, useState, useRef} from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";

import {
    OutlinedInput,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    Stack,
    Chip
  } from "@mui/material";
  import CancelIcon from "@mui/icons-material/Cancel";


const genres = [
    "Action",
    "Adventure",
    "Strategy",
    "RPG",
    "Simulation",
    "Puzzle",
    "Racing",
    "Sports"
]

export default function PostGame(){

    const navigate = useNavigate();

    const [auth, setAuth] = useState(null);
    useState(()=>{
        let data = sessionStorage.getItem("session");
        setAuth(JSON.parse(data));
    },[]);


    const titleRef = useRef(null);
    const titleChange=(e)=>{titleRef.current.value = e.target.value };


    const priceRef = useRef(null);
    const priceChange=(e)=>{priceRef.current.value = e.target.value };

 
    const desRef = useRef(null);
    const desChange=(e)=>{desRef.current.value = e.target.value };

    //setting genres from <devInfoContainer>
    const [selectedGenres, setSelectedGenres] = useState([]);


    useEffect(()=>{

        //console.log("selectedGenres", selectedGenres);
        let idx = [];
        if(selectedGenres.length > 0){
            selectedGenres.forEach((genre)=>{
                const i = genres.indexOf(genre) + 1;
                idx.push(i);
            })
        console.log("selectedGenres", selectedGenres, idx);

        }

    }, [selectedGenres])

    const graphicRef = useRef(null);
    const graphicChange=(e)=>{graphicRef.current.value = e.target.value };

   
    const memoryRef = useRef(null);
    const memoryChange=(e)=>{memoryRef.current.value = e.target.value };
    

    const storageRef = useRef(null);
    const storageChange =(e)=>{storageRef.current.value = e.target.value };

    //setting system information from <sysRequirements>
    const [sys, setSys] = useState('');


    const navRef = useRef(null);
    //setting nav's display style 
    const [isFix, setFix] = useState(false);
    function setFixed(){
        //setWindowYSize(window.scrollY );
        const y = window.scrollY;
        //console.log(y);
        if(y >= 82.66667){
            
            //document.getElementById("root").addClassList();
            document.getElementById("root").style.paddingTop = navRef.offsetHeight;
            setFix(true);

        }else{
            setFix(false);
        }
        
    }
    window.addEventListener("scroll", setFixed);

  
    //used to store files from <input>
    const [files, setFiles] = useState(null);



    async function getMostRecentGameId() {
        
        const response = await fetch('http://localhost:5555/getnextgameid');

        if (!response.ok) {
            const message = `An error has occured: ${response.status}`;
            throw new Error(message);
        }

        const gameIdJson = await response.json();
        return gameIdJson;
    }


    //this function handles submitting pictures from user
    //and send them to server by using fetch 
    function handleUpload(){
       
        //make  selectedGenres into numeric values 

        let idx = [];
        selectedGenres.forEach((genre)=>{
            const i = genres.indexOf(genre) + 1;
            idx.push(i);
        })

        const dateObj = new Date();
        const monthNow = dateObj.getMonth();
        const dateNow = dateObj.getDate();

        const dateToSend = "" +2023+ "-" + (monthNow + 1) + "-" + (dateNow + 1);
        

        // const dateToSend = {
        //     year: 2023,
        //     month: monthNow + 1,
        //     date: dateNow + 1
        // }

        console.log(dateToSend);

        const gameInfo = {
            gameTable:{
                title: titleRef.current.value,
                price: priceRef.current.value,
                description: desRef.current.value,
                date: dateToSend
            },
            genre: idx,
            email: auth.userEmail,
            sysTable:{
                graphic: graphicRef.current.value,
                memory: memoryRef.current.value,
                storage: storageRef.current.value,
                platform: sys,
            },
            
        }
        console.log("refs", gameInfo);

        if(!files){
            alert("No files are selected");
        }

        const fd = new FormData();
        //saving multiple files into FormData
        for(let i = 0; i < files.length; i++){
            fd.append(`files`, files[i]);
        }
        

        getMostRecentGameId().then((retrivedGameId)=>{
           
            console.log("retrivedGameId :", retrivedGameId)
            //after retriving moust Recent GameId, save that in to server.js local variable in order to
            //make dir according to upload images' GameId
            
            //1st putting Game's information; SQL will auto generate GameId but we are passing retrivedGameId
            //to save into local variable in server.js for future images FormData
            fetch('http://localhost:5555/postgameinfo',{
                method: 'POST',
                body:JSON.stringify({id: retrivedGameId.GameId.GameId + 1, gameInfo: gameInfo}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => res.json())
            .then((data) => {
                //after inserting Game's data
                //send another fetch to server to store submitted image files 
                fetch('http://localhost:5555/uploadimages',{
                    method: 'POST',
                    body: fd,
                    
                })
                .then(res => res.json())
                .then((data) => {
                    
                })
                .catch((err) => ("Error occured", err));
            })
            .catch((error)=>console.log(error))
            }
        );

        getMostRecentGameId().catch((error) => {
            console.log(error); // 'An error has occurred: 404'
          });


          alert("Game submitted successfully!")

    }

    const handleChange = (event) => {
        setSys(event.target.value);
    };

    // useEffect(()=>{
    //     console.log("selectedGenres", selectedGenres);
    // },[selectedGenres])

    return (
        <div className='wrapper'>
            <Header />
            {/*<header className={isFix ?'menuNavFixed postGameSection' : `menuNav postGameSection`} ref={navRef} >
                <nav>
                    <div>
                    <div className='title nav postGame' onClick={() => navigate('/home')}>Jörmungandr</div>
                    <div className='listContainer'>
                        <ul>
                            <li>Devleoper's information</li>
                            <li>System requirement</li>
                            <li>pictures</li>
                            <li>Agreement</li>
                        </ul>
                    </div>
                    </div>
                </nav>
            </header>
    */}
            <div className='devInfoContainer'>
                <div className="insideInfoContainer">
                    <h1>Post Game</h1>
                    <label>
                        <text>Game Title</text>
                        <input ref={titleRef} onChange={titleChange} type="text"></input>
                    </label>
                    <label>
                        <text>Game Price</text>
                        <input ref={priceRef} onChange={priceChange} type="text"></input>
                    </label>
                </div>
                <div className="insideInfoContainer">
                    <label>
                        <text>Description</text>
                        <textarea ref={desRef} onChange={desChange} ></textarea>
                    </label>
                </div>
                <div className="insideInfoContainer">
                    <FormControl sx={{ m: 1, width: 400}}>
                        <InputLabel>Select Genre</InputLabel>
                        <Select
                            multiple
                            value={selectedGenres}
                            onChange={(e) => setSelectedGenres(e.target.value)}
                            input={<OutlinedInput label="Multiple Select" />}
                            renderValue={(selected) => (
                                <Stack gap={1} direction="row" flexWrap="wrap">
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            onDelete={() =>
                                                setSelectedGenres(
                                                    selectedGenres.filter((item) => item !== value)
                                                )
                                            }
                                            deleteIcon={
                                                <CancelIcon
                                                    onMouseDown={(event) => event.stopPropagation()}
                                                />
                                            }
                                        />
                                    ))}
                                </Stack>
                            )}
                        >
                            {genres.map((name) => (
                                <MenuItem key={name} value={name}>
                                    {name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                {/*
                        <div>
                            <button className='submitbbutton'
                            >Next</button>
                        </div>
                        */}
            </div>
            <div className='sysReqSection'>
                <div className='insideSys'>
                    <label>
                        <span>Graphics</span>
                        <input ref={graphicRef} onChange={graphicChange} type="text"></input>
                    </label>
                    <label>
                        <span>Memory</span>
                        <input ref={memoryRef} onChange={memoryChange} type="text"></input>
                    </label>
                    <label>
                        <span>Storage</span>
                        <input ref={storageRef} onChange={storageChange} type="text"></input>
                    </label>
                    </div>
                    <div className="box">
                        <Box>
                            <FormControl sx={{ m: 1, width: 400 }}>
                                <InputLabel id="demo-simple-select-label">Platform</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={sys}
                                    label="platform"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"Windows"}>Windows</MenuItem>
                                    <MenuItem value={"Mac"}>Mac</MenuItem>
                                    <MenuItem value={"Linux"}>Linux</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </div>
                    {/*
                <div className='buttonContainer'>
                    <button>next</button>
                </div>
                    */}

            </div>
            <div className='imageUploadSection'>
                <input onChange={(e) => setFiles(e.target.files)} type='file' multiple={true} />
                <div>
                    <button className="submitbbutton" onClick={handleUpload}>Submit</button>
                </div>
                {/*tempImg && <img 
                width={"350px"} height={"350px"}
                        src={`http://localhost:5555/task_3.JPG`}/>*/}
                <br></br>
                <br></br>
                <Footer />
            </div>
        </div>
    );

}