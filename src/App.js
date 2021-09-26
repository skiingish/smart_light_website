import React from "react";
import './css/App.css';
import NavBar from './NavBar';
import RoomSelector from "./RoomSelector";

const showAddDevicePage = true;

function App() {
  return (
    <div>
      <NavBar />
      <br></br>
      <RoomSelector />
    </div>
    // <div className="App">
    // {
    //   !showAddDevicePage ?
    //   <Greeting
    //   text = "Good Morning"
    //   />
      
    //   :
    //   <Login />
    // }
    // <Login />
    // </div>
  );
}

export default App;

