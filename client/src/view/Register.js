import {useRef, useState} from 'react';
import './Register.css';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useNavigate } from "react-router-dom";
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Register(){

    const navigate = useNavigate();

    const userNameRef = useRef();



    const [userName, setUserName] = useState("");
    const [userNameMsg, setUserNameMsg] = useState("")

    const [password, setPassword] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("")

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("")

    const [email, setEmail] = useState("");
    const [emailMsg, setEmailMsg] = useState("")

    const [errorMessage, setErrorMessage] = useState(false);

    //for date picker 
    const [dateValue, setDateValue] = useState(dayjs('2022-04-17'));


    //for the switch
    const [checked, setChecked] = useState(false);

    const toggleChecked = () => {
        setChecked((prev) => !prev);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(userName, password, confirmPassword, email);
        console.log(isEmailValid, isUserNameValid, isPasswordValid);

        //if all the input is valid call the server
        if(isUserNameValid !== null && isPasswordValid !== null && isPasswordConfirmValid() && isEmailValid){
            console.log("ready to send to the server");

            fetch('http://localhost:5555/register', {
            method: 'POST',
            body: JSON.stringify({userName: userName, password: password, email: email, DOB: dateValue}),
            headers: {
              'Content-Type': 'application/json',
            },
            })
            .then(res => res.json())
            .then(function(data){
                console.log(data);

                if(data.state === "email already exist"){
                    setErrorMessage(true);
                }else{
                    naviateToLogin();
                }
            });

        }
    }

    const validateUserName = (username) => {
        return username
          .toLowerCase()
          .match(/^[|a-z|A-Z|0-9|].{1,8}$/)
    }

    const validateEmail = (email) => {
        const reg = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        return reg.test(email.toLowerCase());
        /*
        return email
        .toLowerCase()
        .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
        */
    }

    const validatePwd = (password) => {
        return password
          .toLowerCase()
          .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{1,25}$/);
    }


    const isUserNameValid = validateUserName(userName);
    const isPasswordValid = validatePwd(password);

    //returns true when confirmPassword is valid and password, confirmPassword matches 
    function isPasswordConfirmValid (){
        console.log("isPassword", password, confirmPassword, (validatePwd(confirmPassword)!== null && password === confirmPassword));

        return (validatePwd(confirmPassword)!== null && password === confirmPassword);
    } 

    const isEmailValid = validateEmail(email);

   
    const onUserNameHandler = (event) => {
        const currNickname = event.currentTarget.value;
    
        setUserName(currNickname);

        if(currNickname == ""){
            setUserNameMsg("");
        }else{
            if (!validateUserName(currNickname)) {
                setUserNameMsg("please submit user name that is longer than 1 character and less than 9 characters")
            } else if(validateUserName(currNickname)){
                setUserNameMsg("correct user name format");
            }
        }
    };


    const onEmailHandler = (event) => {
        const currEmail = event.currentTarget.value;

        setEmail(currEmail);

        if(currEmail == ""){
            setEmailMsg("");
        }else{
            if (!validateEmail(currEmail)) {
                setEmailMsg("please submit valid email format")
            } else if(validateEmail(currEmail)){
                setEmailMsg("correct email format");
            }
        }
    }

    const onPasswordHandler = (event) => {
        const currPassword = event.currentTarget.value;

        setPassword(currPassword);

        if(currPassword == ""){
            setPasswordMsg("");
        }else{
            if (!validatePwd(currPassword)) {
                setPasswordMsg("please submit valid password")
            } else if(validatePwd(currPassword)){
                setPasswordMsg("correct password format");
            }
        }

    }

    const onConfirmPasswordHandler = (event) => {
        const currPassword = event.currentTarget.value;

        setConfirmPassword(currPassword);

        if(currPassword == ""){
            setConfirmPasswordMsg("");
        }else{
            if (password !== currPassword) {
                setConfirmPasswordMsg("password does not match")
            } else if(validatePwd(currPassword)){
                setConfirmPasswordMsg("password matches");
            }
        }

    }

  
    function naviateToLogin(){
        navigate('/login');
    }
    const label = { inputProps: { 'aria-label': 'Switch demo' } };

 

    return(
        <div className='background'>
        <div className='title'> sign up </div>
        <div className='registercontainer'>
        <FormGroup>
            <FormControlLabel control={<Switch color="secondary" onChange={toggleChecked}/>} label={`${checked? 'Sign up as Developer':'Sign up as User'}`} labelPlacement="top" />
        </FormGroup>
        {errorMessage && <div className='errorMessage'>given email is already registerd</div>}
        <form onSubmit={handleSubmit}>

            <div className='innerContainer'>
                <div className='labelContainer'>
                <label className="userNameLabel" htmlFor="username">Enter your user name </label>
                </div>
               
                <input 
                    type="text" 
                    id="username" 
                    placeholder='Enter user name'
                    value={userName} 
                    onChange={onUserNameHandler}
                    ref={userNameRef}
                />
                { userNameMsg !== "" && <div className={isUserNameValid ? 'validMessage':'invalidMessage'}  > {userNameMsg} </div>}
            </div>

            <div className='innerContainer'>
                <label htmlFor="password">Enter your password </label>
                <input 
                type="text" 
                id="password"
                value={password}
                onChange={onPasswordHandler}
                />
                { passwordMsg !== "" && <div className={isPasswordValid ? 'validMessage':'invalidMessage'}  > {passwordMsg} </div>}
            </div>

            <div className='innerContainer'>
                <label className='confirmPasswordLabel'>Confirm your password </label>
                <input 
                type="text" 
                name="confirmPassword" 
                value={confirmPassword}
                onChange={onConfirmPasswordHandler}
                />
                { confirmPasswordMsg !== "" && <div className={isPasswordConfirmValid() ? 'validMessage':'invalidMessage'}  > {confirmPasswordMsg} </div>}
            </div>
            
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

            <div className='innerLastContainer'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                label="Controlled picker"
                value={dateValue}
                onChange={(newValue) => setDateValue(newValue)}
                sx={
                    {"& .MuiInputLabel-root.Mui-focused": { color: "#FFFFFF" },
                    "& .MuiOutlinedInput-root": {
                        "&:hover > fieldset": { borderColor: "#FFFFFF" }
                    }
                    }
                }
                />
            </LocalizationProvider>
            <input type="submit" />
            <div className='lastContainer'>
                <div className='alreadyHave'>already have an account?</div>
                <button onClick={naviateToLogin}>sign in</button>
            </div>
            
            </div>
        </form>
        </div>
        </div>
    )
}