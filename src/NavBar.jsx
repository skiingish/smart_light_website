import React from "react";
import './css/NavBar.css';

function NavBar() {
    return (
        <div>
            <ul class="nav-bar">
                <li style={{backgroundColor: 'grey'}}><a href="#Home">SIT314 - Smart Light Controls</a></li>
                {/* <li><a href="#HowItWorks">Dashboard</a></li> */}
            </ul>
        </div>
    )
}

export default NavBar;