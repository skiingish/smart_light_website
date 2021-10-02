import React, {useState} from "react";
import './css/App.css';
import NavBar from './NavBar';
import RoomSelector from "./RoomSelector";
import AddDeviceForm from "./AddDeviceForm";

function App() {
  const [showAddDevicePage, updateAddDevicePage] = useState(false);
  const [toggleSwitchName, updateSwitchName] = useState('Add Device')

  const toggleAddDevicePage = () => {
    if (showAddDevicePage) {
      updateAddDevicePage(false);
      updateSwitchName('Add Device');
      
    }
    else {
      updateAddDevicePage(true);
      updateSwitchName('Toggle Lights');
    }
  }

  return (
    <div>
      <NavBar />
      <br></br>
      <div className='buttonContainer'>
        <button className='toggle-page-button' onClick={toggleAddDevicePage}>{toggleSwitchName}</button>
      </div>
      <br></br>
      <br></br>
      {showAddDevicePage
        ? <div>
          <AddDeviceForm />
        </div>
        : <RoomSelector />
      }
    </div>
  );
}

export default App;

