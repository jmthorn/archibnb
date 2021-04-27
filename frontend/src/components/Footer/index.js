import React from 'react';
import './Footer.css';

function Footer (props) { 

    return(
        <>
            <div className="footer-container">
                <div className="footer-icons">
                    <a href="https://github.com/jmthorn" className="github_logo">
                        <img src={"/images/25231.png"} alt="logo"/>
                    </a>
                    <a href="https://www.linkedin.com/in/jessica-thornton-00615989/" className="github_logo">
                        <img src={"/images/linkedin-1.png"} alt="logo"/>
                    </a>
                </div>
                <div className="footer-description">
                    <p> This AirBnb clone was built as a week-long project </p>
                    <p>  for a rigorous 1000+ hour software engineering bootcamp.</p>
                </div>
            </div>
        </>
    )
}

export default Footer;