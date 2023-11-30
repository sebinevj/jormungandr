import './PostGame.css'
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function PostGame(){
    return(
        <section className='postGameSection'>
            <nav>
                <div>
                <div className='title nav postGame'>Jörmungandr</div>
                <ul>
                    <li>Devleoper's information</li>
                    <li>System requirement</li>
                    <li>pictures</li>
                    <li>Agreement</li>
                </ul>
                </div>
            </nav>

                <div>
                    <div className='leftContainer'>
                        <label>
                            Title
                            <input type="text"></input>
                        </label>
                        <label>
                            Price
                            <input type="text"></input>
                        </label>
                        <label>
                            Description
                            <textarea></textarea>
                        </label>
                        
                    </div>
                    <div className='rightContainer'>

                    </div>
                </div>
            <Footer/>
        </section>
    );

}