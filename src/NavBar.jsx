import React from "react";
import './css/NavBar.css';

function NavBar() {
    return (
        <div>
            <ul class="nav-bar">
                <li style={{backgroundColor: 'grey'}}><a href="#Home">Smart Lights Rego</a></li>
                <li><a href="#HowItWorks">Dashboard</a></li>
                <li><a href="#PostaTask">Add A New Device</a></li>
                <li><a href="#BecomeAnExpert">Add A New Apartment</a></li>
                <li><a href="#FindTasks">Add A New Room</a></li>
            </ul>
        </div>
    )
}

export default NavBar;