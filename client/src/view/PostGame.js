import './PostGame.css'
import Footer from '../components/Footer';
import dayjs from 'dayjs';
import {useEffect, useState} from 'react';
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

    //for date picker in <devInfoContainer>
    const [dateValue, setDateValue] = useState(dayjs('2022-04-17'));

    const [selectedGenres, setSelectedGenres] = useState([]);

    useEffect(()=>{
        console.log("selectedGenres", selectedGenres);
    },[selectedGenres])

    return(
        <div className='wrapper'>
        <section className='postGameSection'>
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
        </section>

        <section className='devInfoSection'>
            <div className='devInfoContainer'>
                <div>
                    <label>
                        Title
                        <input type="text"></input>
                    </label>
                    <label>
                        Price
                        <input type="text"></input>
                    </label>
                </div>
                <label>
                    Description
                    <textarea></textarea>
                </label>

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

                    <div>
                        <button>next</button>
                    </div>
            </div>
        </section>
        <section className='sysReqSection'>



        </section>

            <Footer/>
        </div>
    );

}