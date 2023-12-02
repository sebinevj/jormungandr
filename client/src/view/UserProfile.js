import { useNavigate } from "react-router-dom";
import Header from '../components/Header'
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
/**
 * This view gets visualized when user has logged in and clicked on 
 * profile button in header.
 * This view will be seen differently by props.Devleoper value
 * 
 * @param props will contain session:{Devleoper:Boolean, email:String}
 */
export default function UserProfile(props){

    //getting either the User is a developer or not 
    //true when they are developer
    const location = useLocation();
    const DeveloperFlag = location.state;

    console.log(DeveloperFlag ? "I am a dev :)": "I am not :(");

    useEffect(()=>{
        //if user is Developer, fetch Developer's game's name,price, description, releaseDate
        // and sysRequirments and game's genre
        if(DeveloperFlag){

            //using current path to access userId; location.pathname contains the entire /userprofile/:id
            //which is the reason for slicing.
            //currUserId has userId
            const currUserId = location.pathname.slice(location.pathname.indexOf('/', 1) + 1);
           
            //get DeveloperId
            fetch('http://localhost:5555/getdeveloperid', {
            method: 'POST',
            body: JSON.stringify({userId: currUserId}),
            headers: {
              'Content-Type': 'application/json',
            },

            })
            .then(res => res.json())
            .then((data) => {
                console.log("UserProfile loading DeveloperId..", data, data.DeveloperId); 
                
            });

        }

        

        //if user is not a Developer
        //get transactions 


    },[])


    if(DeveloperFlag){
        return(
            <div>
            <Header/>
            </div>
        )
    }else{
        return(
            <div>
            <Header/>
            </div>
        )
    }
    


}