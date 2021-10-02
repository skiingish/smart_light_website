import React, {useState} from "react";
import axios from "axios";
import './css/RoomSelector.css';

// The base API
const baseAPIurl = "http://smartlights-api-backend-lb-1879228982.us-east-1.elb.amazonaws.com:8000";

// The room selector component
const RoomSelector = () => {

    // The starting states. 
    const [apartments, setApartments] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [devices, setDevices] = useState(null);
    const [lights, setLights] = useState(null);
    const [lightLookupURL, changeURL] = useState(`${baseAPIurl}/list/lights/`) 
    const [apartment_id, updateApartmentID] = useState('');
    const [room_id, updateRoomID] = useState('');
    const [device_id, updateDeviceID] = useState('');
    const [showroomsSelector, updateRoomSelector] = useState(false);
    const [showDeviceSelector, updateDeviceSelector] = useState(false);

    // Used to call the device lists on load.
    const getapartmentURL = `${baseAPIurl}/list/apartments/`;
    const getroomsURL = `${baseAPIurl}/list/rooms/apartment/testapartment/`;

    // Upon choosing an apartment set the choosen apartment ID and pull the rooms data. 
    const setApartmentIDGetRoomsData = async (e) => {
        //apartmentID = e.target.value;
        updateApartmentID(e.target.value);
        await axios.get(`${baseAPIurl}/list/rooms/apartment/${e.target.value}/`)
            .then((response) => {
                setRooms(response.data);
                updateRoomSelector(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Upon choosing an room set the choosen room ID and pull the device data. 
    const setRoomsIDGetLightData = (e) => {
        //apartmentID = e.target.value;
        updateRoomID(e.target.value);
        axios.get(`${baseAPIurl}/list/lights/room/${e.target.value}/`)
            .then((response) => {
                setLights(response.data);
                updateDeviceSelector(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Upon choosing an device set the choosen device ID and\. 
    const setDeviceID = (e) => {
        //apartmentID = e.target.value;
        updateDeviceID(e.target.value);
    }
    
    // Toggle all lights in the selected apartement on.
    const toggleApartment = () => {
        axios.post(`${baseAPIurl}/lightsV2/apartment/${apartment_id}/toggle`)
        .then(res => {
            console.log(res);
            alert(`Toggled Lights In ${apartment_id}`);
        })
        .catch(err => {
            console.log(err);
        })
    } 

    // Toggle all lights in the selected room on.
    const toggleRoom = () => {
        axios.post(`${baseAPIurl}/lightsV2/room/${room_id}/toggle`, {
            apartment_id: apartment_id
        })
        .then(res => {
            console.log(res);
            alert(`Toggled Lights In ${room_id}`);
        })
        .catch(err => {
            console.log(err);
        })
    }

    // Toggle the selected light.
    const toggleDevice = () => {
        axios.post(`${baseAPIurl}/lights/${device_id}/toggle/`)
        .then(res => {
            console.log(res);
            alert(`Toggled Lights In ${device_id}`);
        })
        .catch(err => {
            console.log(err);
        })
    } 

    // Call the starting device lists. 
    React.useEffect(() => {
        axios.get(getapartmentURL).then((response) => {
          setApartments(response.data);
        });
      }, []);

    React.useEffect(() => {
        axios.get(getroomsURL).then((response) => {
          setRooms(response.data);
        });
      }, []);

      React.useEffect(() => {
        axios.get(lightLookupURL).then((response) => {
          setDevices(response.data);
        });
      }, []);
    
    // Set as null at first, in the event of no data and page loads before call finishes. 
    if (!apartments) return null;
    if (!rooms) return null;
    if (!devices) return null;

    return (<div>
        <div className="room-selector">
            <div>
                <label>Choose an apartment:</label>
                <select className='selector' id="apartments" name="apartments" onChange={setApartmentIDGetRoomsData} value={apartment_id}>
                    <option></option>
                    {apartments.map(apartment => <option>{apartment}</option>)}
                </select>
                {showroomsSelector ? <button className='light-toggle-button' onClick={toggleApartment}>Toggle Selected Apartment</button> : <></>}
            </div>
            {showroomsSelector
                ? <div>
                    <label>Choose a room:</label>
                    <select className='selector' id="rooms" name="rooms" onChange={setRoomsIDGetLightData} value={room_id}>
                        <option></option>
                        {rooms.map(room => <option>{room}</option>)}
                    </select>
                    {showDeviceSelector ? <button className='light-toggle-button' onClick={toggleRoom}>Toggle Selected Room</button> : <></>}
                </div> 
                : <h1></h1>
            }
            {showDeviceSelector
                ? <div>
                    <label>Choose a light:</label>
                    <select className='selector' id="lights" name="lights" onChange={setDeviceID} >
                        <option></option>
                        {lights.map(light => <option>{light}</option>)}
                    </select>
                    {showDeviceSelector ? <button className='light-toggle-button' onClick={toggleDevice}>Toggle Selected Device</button> : <></>}
                </div> 
                : <h1></h1>
            }
            <br></br>
            <br></br>
            <h3>All Devices</h3>
            {devices.map(device => <p>Device ID: {device.device_id}, Current State: {device.current_state}</p>)}
        </div>
    </div>)
}

export default RoomSelector