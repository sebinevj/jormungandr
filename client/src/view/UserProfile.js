import { useNavigate } from "react-router-dom";
import Header from '../components/Header'
import { useLocation } from 'react-router-dom';
/**
 * This view will be seen differently by props.Devleoper value
 * 
 * @param props will contain session:{Devleoper:Boolean, email:String}
 */
export default function UserProfile(props){

    //getting either the User is a developer or not 
    //true when they are developer
    const location = useLocation();
    const DevleoperFlag = location.state;

    console.log(DevleoperFlag ? "I am a dev :)": "I am not :(");

    return(
        <>
        <Header/>
        </>
    )

}