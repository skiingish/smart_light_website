import React, {useState} from "react";
import './css/App.css';
import NavBar from './NavBar';
import RoomSelector from "./RoomSelector";
import AddDeviceForm from "./AddDeviceForm";


function App() {
  const [showAddDevicePage, updateAddDevicePage] = useState(false);

  const toggleAddDevicePage = () => {
    if (showAddDevicePage) {
      updateAddDevicePage(false);
      
    }
    else {
      updateAddDevicePage(true);
    }
  }

  return (
    <div>
      <NavBar />
      <br></br>
      <button onClick={toggleAddDevicePage}>Toggle</button>
      <br></br>
      <br></br>
      {showAddDevicePage
        ? <div>
          <h1>Add Device</h1>
          <AddDeviceForm />
        </div>
        : <RoomSelector />
      }
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

