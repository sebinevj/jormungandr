import PopularGame from './components/PopularGame';
import SmallGame from './components/SmallGame';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState, useEffect} from 'react';
import './Home.css';

function Home(){

    const [type, setType] = useState("all");
   

    /**
     * auth will contain session of user's email
     */
    const [auth, setAuth] = useState(null);

    useEffect(() => {
    
        //get session of user, if there is no session auth will be null
        let data = sessionStorage.getItem("session");
        setAuth(JSON.parse(data));
        console.log("session data:",  JSON.parse(data));
       
    }, []);


    return (
        <div className="everything">
        <Header/>
        <div className='totalWrapper'>
            <div className='backgroundHome'>
                <h1>All Games</h1>
                <PopularGame
                    type="all"
                />
                {/* <h1>Best Rated</h1>
                <PopularGame
                    type="bestRated"
                />
                <h1>Popular Games</h1>
                <PopularGame
                    type="popular"
                /> */}
                {/*}
                <SmallGame
                    type="bestRated"
                />
                */}
                <br></br>
                <Footer/>
            </div>
        </div>
        </div>
        )
    
}

export default Home; 