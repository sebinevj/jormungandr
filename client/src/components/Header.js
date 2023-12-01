import './Header.css';
import React, { useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";

function Header(props){


    console.log("props at Header", props, props.auth, props.auth.Developer, typeof(props.auth.Developer));

    const navigate = useNavigate();
    //const [auth, setAuth] = useState(null);

    useState(()=>{
        //setAuth(sessionStorage.getItem("session"));
    },[]);

    

    function handleSignOut(){
        sessionStorage.removeItem("session");
        props.setAuth(null);
    }

    function handleProfile(){
        
        fetch('http://localhost:5555/getuserid', {
            method: 'POST',
            body: JSON.stringify({email: props.auth.userEmail}),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(function(data){
            //console.log("at header...", data.data);
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
                {props.auth &&<button onClick={() => handleProfile()}>profile</button>}
                
                {!props.auth  && <button onClick={() => navigate('/login')}>sign in</button>}
                {!props.auth  && <button onClick={() => navigate('/register')} >sign up</button>}
                {props.auth  &&<button onClick={()=>handleSignOut()}>sign out</button>}
                
                {props.auth.Developer && <button onClick={()=>navigate('/postgame')} >post a game</button>}
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