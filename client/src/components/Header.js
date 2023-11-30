import './Header.css';
import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function Header(){

    const navigate = useNavigate();
    const [auth, setAuth] = useState(null);

    useState(()=>{
        setAuth(sessionStorage.getItem("session"));
    },[]);


    function handleSignOut(){
        sessionStorage.removeItem("session");
        setAuth(null);
    }

    function handleProfile(){
        fetch('http://localhost:5555/getuserid', {
            method: 'POST',
            body: JSON.stringify({email: auth}),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(function(data){
            console.log("at header...", data.data);
            navigate(`/userprofile/${data.data}`);
        });
    }

    return (
        <>
        <div className="OuterContainer">
            <div className="FirstHeader">
                <button onClick={() => navigate('/home')}>
                    logo
                </button>
                {auth &&<button onClick={() => handleProfile()}>profile</button>}
                
                {!auth  && <button onClick={() => navigate('/login')}>sign in</button>}
                {!auth  && <button onClick={() => navigate('/register')} >sign up</button>}
                {auth  &&<button onClick={()=>handleSignOut()}>sign out</button>}
                <button onClick={()=>navigate('/postgame')} >post a game</button>
            </div>
            {/* 
            <div className="SecondHeader">
                <button> new </button>
                <button> sales </button>
                <button> categories </button>
                <button> trending </button>
            </div>
            */}
        </div>
        </>
    )
}
export default Header;