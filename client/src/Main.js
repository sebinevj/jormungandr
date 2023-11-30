import { BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./Home"
import GameProfile from "./Gameprofile"
import Register from "./view/Register"
import Login from "./view/Login"
import UserProfile from "./view/UserProfile";
import PostGame from "./view/PostGame";
export default function Main() {

    return (
        <BrowserRouter>
        <Routes>

        <Route exact path="/home" element={<Home/>}/>
        <Route path="/userprofile/:id" element={<UserProfile/>} />
        <Route path="/gameprofile/:title" element={<GameProfile/>} />
        <Route path="/register"  element={<Register/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/postgame" element={<PostGame/>}/>
        </Routes>
        
        </BrowserRouter>
        )
    };

