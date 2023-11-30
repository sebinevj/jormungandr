import './Review.css';
import { useState} from 'react';
import Rating from '@mui/material/Rating';

export default function Review(props){

    const [popUpMenu, setPopUpMenu] = useState(false);

    //converts sql dateTime datetype into js datetype format 
    function date(props){
        
        let date = props.slice(0,9).split( /[-]/);
        console.log("date...", date);
        date[1] -=1;
        let jsDate = new Date(...date);
        const styledDate = jsDate.toLocaleString('en-us',{month:'short', year:'numeric', day:'numeric'});
        console.log("after date...", jsDate, jsDate.toLocaleString('en-us',{month:'short', year:'numeric', day:'numeric'}), typeof(jsDate.toLocaleString('en-us',{month:'short', year:'numeric', day:'numeric'})));
        return(
            <div>
                {styledDate}
            </div>
        )
    }


    //changes given numeric ratings into graphical ratings 
    function ratingStars(props){
        return(
            <Rating name="read-only" value={props} precision={1} readOnly />
        )
    }

    function PopUpMenu() {
        return (
          <button className='popUpMenuButton'> add as a friend</button>
        );
      }

    return(
        <div className="reviewContainer">
            <div className="firstContainer">
                <div onClick={() => setPopUpMenu(!popUpMenu)} >{props.Name}</div>
                {popUpMenu && PopUpMenu()}
                {ratingStars(props.rating)}
            </div>
            <div className="secondContainer">
                {props.description}
            </div>
            <div className="thirdContainer">
                {/*props.writtenDate*/}
                {date(props.writtenDate)}
            </div>
        </div>
    )
}