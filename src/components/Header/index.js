import React from "react";
import './index.css';

export default function Header({black}) {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://www.tubefilter.com/wp-content/uploads/2016/07/Netflix_logo-1920x1131.jpg"
                    alt="Netflix" />                  
                </a>
            </div>
            <div className="header--user">
                <a href="/">
                    <img src="https://blogs.studentlife.utoronto.ca/lifeatuoft/files/2015/02/FullSizeRender.jpg" alt="User" />
                </a>
            </div>
        </header>
    );
}