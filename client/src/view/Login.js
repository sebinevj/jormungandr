import "./Login.css";
import {useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function Login(){

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [emailMsg, setEmailMsg] = useState("")

    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();

        if(isEmailValid){
            fetch('http://localhost:5555/login', {
            method: 'POST',
            body: JSON.stringify({email: email, password: password}),
            headers: {
              'Content-Type': 'application/json',
            },
            })
            .then(res => res.json())
            .then(function(data){
                console.log("login data is..", data);

                //if email did not exist, put an error message 
                
                if(data.state.flag === false){
                    setErrorMessage(data.state.message);

                //log in success
                }else{

                    console.log("at Login", data, data.result.DeveloperId);
                    //it is developer's id 
                    let sess;
                    if(data.result.DeveloperId){
                        console.log("user is a developer");
                        sess = {userEmail: email, Developer: true}
                    }
                    //it is normal user id
                    else{
                        console.log("user is not a developer");
                        sess = {userEmail: email, Developer: false}
                    }
                    
                    sessionStorage.setItem("session", JSON.stringify(sess));

                    //on success go to /home 
                    alert("success!");   
                    navigate('/home');
                }
                //else check feteched password with current user given password 

            });

        }
    }


    const validateEmail = (email) => {
        const reg = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return reg.test(email.toLowerCase());
    }

    const onEmailHandler = (event) => {
        const currEmail = event.currentTarget.value;

        setEmail(currEmail);

        if(currEmail == ""){
            setEmailMsg("");
        }else{
            if (!validateEmail(currEmail)) {
                setEmailMsg("Please submit valid email format")
            } else if(validateEmail(currEmail)){
                setEmailMsg("Correct email format");
            }
        }
    }

    const isEmailValid = validateEmail(email);

    const onPasswordHandler = (event) => {
        const currPassword = event.currentTarget.value;
        setPassword(currPassword);
    }

    function naviateToRegister(){
        navigate('/register');
    }
     function navigateHome(){
        navigate('/home');
    }




    return(
        <div className='background'>
            <div className='logincontainer'>
            <div className='title'> log in </div>
            <form onSubmit={handleSubmit}>
                <div className='innerContainer'>
                    <label>Enter your email </label>
                    <input 
                    type="text" 
                    name="email" 
                    value={email} 
                    onChange={onEmailHandler}
                    />
                    { emailMsg !== "" && <div className={isEmailValid ? 'validMessage':'invalidMessage'}  > {emailMsg} </div>}
                </div>

                <div className='innerContainer'>
                    <label htmlFor="password">Enter your password </label>
                    <input 
                    type="text" 
                    id="password"
                    value={password}
                    onChange={onPasswordHandler}
                    />
                </div>
                {errorMessage && <div className='invalidMessage'>Login failed</div>}
            <input type="submit" />
            </form>
            <div className='lastContainer'>
                <div className='alreadyHave'>Don't have an account?</div>
                <button onClick={naviateToRegister} className='reviewbbutton'>Register</button>
                <button onClick={navigateHome} className='homeButton'>Continue as guest</button>
            </div>

            </div>
        </div>
    );
}