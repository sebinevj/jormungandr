import './Header.css';
import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function Header(props){

    const [auth, setAuth] = useState(null);
    const navigate = useNavigate();
   

    useState(()=>{
        let data = sessionStorage.getItem("session");
        setAuth(JSON.parse(data));
    },[]);

    

    function handleSignOut(){
        sessionStorage.removeItem("session");
        setAuth(null);
        navigate(`/login`);

    }

    function handleProfile(){
        //route to userprofile with email:String and Develop:Boolean data
        //email:String will be passed to server 
        //Develop:Boolean will be passed with navigate
        fetch('http://localhost:8080/getuserid', {
            method: 'POST',
            body: JSON.stringify({email: auth.userEmail}),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(function(data){
            //console.log("at header...", data.data);
            navigate(`/userprofile/${data.data}`,{ state:auth.Developer});
        });
    }

    return (
        <>
            <header className="FirstHeader">
                    <div className='logo'>
                        <button className="but" onClick={() => navigate('/home')}>
                            <p>Jörmungandr</p>
                        </button>
                    </div>
                   
                    <div className='rightButtons'>
                        {auth &&<button onClick={() => handleProfile()}>profile</button>}
                        {!auth  && <button onClick={() => navigate('/login')}>sign in</button>}
                        {!auth  && <button onClick={() => navigate('/register')} >sign up</button>}
                        {auth  &&<button onClick={()=>handleSignOut()}>sign out</button>}
                        {auth && auth.Developer && <button onClick={() => navigate('/postgame')} >post a game</button>}
                    </div>
            </header>
        </>
    )
}
export default Header;