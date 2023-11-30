import { FaApple } from "react-icons/fa";
import { IoLogoAndroid } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import './Footer.css';


function Footer(){
    return(
        <div className="FooterContainer">
        <section className="FooterSection">

            <div className="FooterSectionDiv">
                <h2>OUR COMPANY</h2>
                <ul className="FooterListContainer">
                    <li>About Us</li>
                    <li>Careers</li>
                    <li>News</li>
                    <li>Investor Relations</li>
                </ul>
            </div>
            
            <div>
                <h2>SUPPORT</h2>
                <ul className="FooterListContainer">
                    <li>Contact Support</li>
                </ul>
            </div>

            <div>
                <h2>LEGAL</h2>
                <ul className="FooterListContainer">
                    <li>Privacy Policy</li>
                    <li>Terms of Use</li>
                    <li>Your Privacy Choices</li>
                </ul>
            </div>

            <div>
                <h2>DOWNLOAD THE APP</h2>
                <ul className="FooterListContainer">
                    <li><FaApple/>iOS</li>
                    <li><IoLogoAndroid/>Android</li>
                </ul>

                <h2>SOCIAL</h2>
                <ul className="FooterListContainer SOCIAL">
                    <li><FaInstagram/></li>
                    <li><FaFacebook/></li>
                    <li><FaTwitter/></li>
                    <li><FaTiktok/></li>
                </ul>
            </div>

        </section>
        </div>
    )
}

export default Footer;