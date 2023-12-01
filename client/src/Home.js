import PopularGame from './components/PopularGame';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState, useEffect} from 'react';
import './Home.css';

function Home(){

    const [curIdx, setcurIdx] = useState([0,1,2]);
    const [array, setData] = useState(null);


   

    /**
     * auth will contain 
     */
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5555/loadimages', {
            method: 'POST',
            body: JSON.stringify({type: "onSale"}),
            headers: {
              'Content-Type': 'application/json',
            },
        })
        .then(res => res.json())
        .then(function(data){
            setData(data);
            console.log("at home...", data);
        });

        //get session of user, if there is no session auth will be null
        let data = sessionStorage.getItem("session");
        setAuth(JSON.parse(data));
        console.log("session data:",  JSON.parse(data));
       
    }, []);


   
    useEffect(() => {
        if(array !== null){
            //console.log("at ...", array[0].gameTitle);
        }

    }, [array]);

    function gamesOnSale(){

        function buttonClickHandler(param){

            if(param == 1){
                setcurIdx([(curIdx[2] + 1) % array.length, (curIdx[2] + 2) % array.length, (curIdx[2] + 3) % array.length]);
            }else{

            }


           
        }

        return (
            <div className='onSaleContainer'>
                <button onClick={()=>buttonClickHandler(-1)}>left</button>
                <div className='onSaleGameContainer'>
                    {array && curIdx.map((idx) => {
                        return(
                        <div className='onSaleGame'>
                            <img width={"150px"} height={"150px"} 
                            src={`http://localhost:5555/${array[idx].gameId}/${array[idx].gameTitle}-01.png`}
                            />
                            <div>{array[idx].gameTitle}</div>
                            <div>{array[idx].gamePrice}</div>
                        </div>
                        )
                    })}
                </div>
                <button onClick={()=>buttonClickHandler(1)}>right</button>
            </div>
        );
    }

    function category(){
        return(
            <>
            
            </>
        )
    }


    return (
        <div className='totalWrapper'>
            <div className='backgroundHome'>
                <Header/>
                <div>Popular Games</div>
                <PopularGame />
                <div>On Sale</div>
                {gamesOnSale()}
                {category()}
                <Footer/>
            </div>
        </div>
        )
    
}

export default Home; 