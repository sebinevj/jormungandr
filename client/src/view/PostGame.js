import './PostGame.css'
import Footer from '../components/Footer';
import dayjs from 'dayjs';
import {useEffect, useState, useRef} from 'react';
import Box from '@mui/material/Box';


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

    //const [tempImg, setTempImg] = useState(null);
    
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



    //this function handles submitting pictures from user
    //and send them to server by using fetch 
    function handleUpload(){
        if(!files){
            alert("No files are selected");
        }

        const fd = new FormData();
        for(let i = 0; i < files.length; i++){
            fd.append(`files`, files[i]);
        }
        console.log("file is ", files[0] instanceof File, files[0] instanceof Blob, files[0])


        fetch('http://localhost:5555/postgameinfo',{
            method: 'POST',
            body:JSON.stringify({id:55}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then((data) => {
            //data will have recently created GameId which will be used for file location

            //send another fetch to server to store submitted files 
            fetch('http://localhost:5555/uploadimages',{
                method: 'POST',
                body: fd,
                
            })
            .then(res => res.json())
            .then((data) => {
                //console.log("after posting", data);
                //setTempImg(data.path);
                
            })
            .catch((err) => ("Error occured", err));


        })
        .catch((error)=>console.log(error))

        



        

    }




    //setting genres from <devInfoContainer>
    const [selectedGenres, setSelectedGenres] = useState([]);


    const [sys, setSys] = useState('');

    const handleChange = (event) => {
        setSys(event.target.value);
    };

    useEffect(()=>{
        console.log("selectedGenres", selectedGenres);
    },[selectedGenres])

    return(
        <div className='wrapper'>
            <header className={isFix ?'menuNavFixed postGameSection' : `menuNav postGameSection`} ref={navRef} >
                <nav>
                    <div>
                    <div className='title nav postGame'>Jörmungandr</div>
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

            <section className='devInfoSection'>
                <div className='devInfoContainer'>
                    <div>
                        <label>
                            <text>Title</text>
                            <input type="text"></input>
                        </label>
                        <label>
                            <text>Price</text>
                            <input type="text"></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            <text>Description</text>
                            <textarea></textarea>
                        </label>
                    </div>
                    <div>
                        <FormControl sx={{ m: 1, width: 500 }}>
                        <InputLabel>Multiple Select</InputLabel>
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

                        <div className='buttonContainer'>
                            <button>next</button>
                        </div>
                </div>
            </section>
            <section className='sysReqSection'>
            <div>
                <label>
                    <span>Graphic</span>
                    <input type="text"></input>
                </label>
                <label>
                    <span>Memory</span>
                    <input type="text"></input>
                </label>
                <label>
                    <span>Storage</span>
                    <input type="text"></input>
                </label>
                <div>
                <Box sx={{ minWidth: 120, maxWidth: 220 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">platform</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sys}
                    label="platform"
                    onChange={handleChange}
                    >
                    <MenuItem value={10}>Windows</MenuItem>
                    <MenuItem value={20}>Mac</MenuItem>
                    <MenuItem value={30}>Linux</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                </div>
                <div className='buttonContainer'>
                    <button>next</button>
                </div>
            </div>

            </section>
            <section className='imageUploadSection'>
                <div>
                    <input onChange={(e)=>setFiles(e.target.files)}  type='file' multiple={true}/>
                    <div className='buttonContainer'>
                        <button onClick={handleUpload}>submit files</button>
                    </div>
                </div>
                {/*tempImg && <img 
                width={"350px"} height={"350px"}
                        src={`http://localhost:5555/task_3.JPG`}/>*/}
                
            </section>
            <section className='agreementSection'>
                <div>
                    <h2>Game Submission Agreement</h2>
                    <p>Before submitting your game, please carefully read and agree to the following terms and conditions. By signing below, you acknowledge your understanding and acceptance of the terms outlined in this agreement.</p>
                    
                </div>
                <button>I agree</button>
            </section>

            <Footer/>
        </div>
    );

}