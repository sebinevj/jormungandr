import { useNavigate } from "react-router-dom";
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import './UserProfile.css'
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

    const [gameList, setGameList] = useState([]);
    const [devName, setDevName] = useState("");
    const [devLoc, setDevLoc] = useState("");
    const [devPhone, setDevPhone] = useState("");

    const [transactionGames, setTransactionGames] = useState([])
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userLastPurchase, setUserLastPurchase] = useState("");


    console.log(DeveloperFlag ? "I am a dev :)": "I am not :(");

    useEffect(()=>{
        //getting UserId through router
        const currUserId = location.pathname.slice(location.pathname.indexOf('/', 1) + 1);
        console.log(currUserId)
        console.log(DeveloperFlag)

        //if user is Developer, fetch Developer's game's name,price, description, releaseDate
        // and sysRequirments and game's genre
        if(DeveloperFlag){

            //using current path to access userId; location.pathname contains the entire /userprofile/:id
            //which is the reason for slicing.
            //currUserId has userId
            
            let devId;
            //get DeveloperId
            fetch('http://localhost:8080/getalldevelopercolumn', {
            method: 'POST',
            body: JSON.stringify({userId: currUserId}),
            headers: {
              'Content-Type': 'application/json',
            },

            })
            .then(res => res.json())
            .then((data) => {
                console.log("UserProfile loading DeveloperId..", data, data.DeveloperId); 

                devId = data.data.DeveloperId;
                setDevName(data.data.DeveloperName);
                setDevLoc(data.data.Location);
                setDevPhone(data.data.Phone);

                //call another fetch to get data for all games that belongs to current DeveloperId
                fetch('http://localhost:8080/getdeveloperinfo', {
                    method: 'POST',
                    body: JSON.stringify({DeveloperId: devId}),
                    headers: {
                    'Content-Type': 'application/json',
                    },

                })
                .then(res => res.json())
                .then((data) => {
                    console.log("UserProfile loading DeveloperId..", data.data); 
                    //store into gameArry state 
                    console.log(data)
                    setGameList(data.data);

                });
            });

        }
        //if user is not a Developer
        //get transactions 
        else{

            console.log("here")


            fetch("http://localhost:8080/getuserinfo",{
                method: 'POST',
                body: JSON.stringify({UserId: currUserId}),
                headers: {
                'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then((data) => {
                //got Transaction data 
                console.log("Data")
                console.log(data);
                console.log(data.userData)

                setTransactionGames(data.transaction)
                setUserName(data.userData.Name)
                setUserEmail(data.userData.Email)
                setUserLastPurchase(data.userData.LastPurchase)
            });

        }

    },[])


    if(DeveloperFlag){

        const games = gameList.map((game)=>(
            <div className='gamecontainer'>
                <h2>{game.Name}- ${game.Price.toFixed(2)}</h2>
                <small>{game.Description}</small>
                <div>{game.Platform}</div>
                <img width={"150px"} height={"150px"} 
                    src={`http://localhost:8080/${game.GameId}/${game.Name}-01.png`} 
                />
            </div>
        ))

        return(
            <div>
                <Header/>
                <div className='gameProfileBackgroundContainer'>
                    <h1>Developer Information</h1>
                    <div className='infocontainer'>
                        <h2>{devName.toUpperCase()}</h2>
                        <div>Location: {devLoc}</div>
                        <div>Phone: {devPhone}</div>
                    </div>


                {games.length > 0 && <h1>Created Games</h1>}
                        <div className='gameProfileBody'>
                            <br></br>
                            {games}
                        </div>
                </div>
                <br></br>
            </div>
        )
    }else{
        const games = transactionGames.map((game)=>(
            <div className='gamecontainer'>
                <h2>{game.Name}</h2>
                <img width={"150px"} height={"150px"} 
                    src={`http://localhost:8080/${game.GameId}/${game.Name}-01.png`}
                />
            </div>
        ))


        return(
            <div>
            <Header/>
                <div className='gameProfileBackgroundContainer'>
                <h1>User Information</h1>
                    <div className='infocontainer'>
                        <h2>{userName.toUpperCase()}</h2>
                        <div>Email: {userEmail}</div>
                        {/* {userLastPurchase != null ? <div>Last Purchase: {userLastPurchase.substring(5,7)}/{userLastPurchase.substring(8,10)}/{userLastPurchase.substring(0,4)}</div> :  <div>Last Purchase: No purchased games</div>} */}
                    </div>
                {userLastPurchase != null && <h1>Purchased Games</h1>}
                        <div className='gameProfileBody'>
                            <br></br>
                            <div style={{display: 'flex', padding: '1rem', gap: '1rem'}}>
                            {games}
                            </div>
                        </div>
                </div>
            </div>
        )
    }
    


}