import React, {useState} from "react";
import axios from "axios";

let showroomsSelector = false;
let showDeviceSelector = false;

// axios.get(`http://localhost:8000/list/rooms/apartment/testapartment/`)
//     //axios.get(`https://jsonplaceholder.typicode.com/users`)
//     .then(res => {
//         this.setState({ rooms: res.data })
//     });

const RoomSelector = () => {

    var apartmentID = '';

    const [apartments, setApartments] = useState(null);
    const [rooms, setRooms] = useState(null);
    const [lights, setLights] = useState(null);
    const [apartment_id, updateApartmentID] = useState('');
    const [room_id, updateRoomID] = useState('');
    const [showroomsSelector, updateRoomSelector] = useState(false);
    const [showDeviceSelector, updateDeviceSelector] = useState(false);

    const getapartmentURL = `http://localhost:8000/list/apartments/`;
    const getroomsURL = "http://localhost:8000/list/rooms/apartment/testapartment/";
    const getdeviceListUrl = "http://localhost:8000//list/devices/room/:id/";

    // Upon choosing an apartment set the choosen apartment ID and pull the rooms data. 
    const setApartmentIDGetRoomsData = async (e) => {
        //apartmentID = e.target.value;
        updateApartmentID(e.target.value);
        await axios.get(`http://localhost:8000/list/rooms/apartment/${e.target.value}/`)
            .then((response) => {
                setRooms(response.data);
                updateRoomSelector(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    // Upon choosing an apartment set the choosen apartment ID and pull the rooms data. 
    const setRoomsIDGetLightData = (e) => {
        //apartmentID = e.target.value;
        updateRoomID(e.target.value);
        axios.get(`http://localhost:8000/list/lights/room/${e.target.value}/`)
            .then((response) => {
                setLights(response.data);
                updateDeviceSelector(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    

    const toogleApartment = () => {
        axios.post(`http://localhost:8000/lightsV2/apartment/${apartment_id}/toggle`)
        .then(res => {
            console.log(res);
            alert(`Toggled Lights In ${apartment_id}`);
        })
        .catch(err => {
            console.log(err);
        })
    } 

    const toogleRoom = () => {
        axios.post(`http://localhost:8000/lightsV2/room/${room_id}/toggle`)
        .then(res => {
            console.log(res);
            alert(`Toggled Lights In ${room_id}`);
        })
        .catch(err => {
            console.log(err);
        })
    } 

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
    
    // Set as null at first, in the event of no data and page loads before call finishes. 
    if (!apartments) return null;
    if (!rooms) return null;

    return (<div>
        <div>
            <div>
                <label>Choose an apartment:</label>
                <select id="apartments" name="apartments" onChange={setApartmentIDGetRoomsData} value={apartment_id}>
                    <option></option>
                    {apartments.map(apartment => <option>{apartment}</option>)}
                </select>
                {showroomsSelector ? <button onClick={toogleApartment}>Toggle Selected Apartment</button> : <></>}
            </div>
            {showroomsSelector
                ? <div>
                    <label>Choose a room:</label>
                    <select id="rooms" name="rooms" onChange={setRoomsIDGetLightData} value={room_id}>
                        <option></option>
                        {rooms.map(room => <option>{room}</option>)}
                    </select>
                    {showDeviceSelector ? <button onClick={toogleRoom}>Toggle Selected Room</button> : <></>}
                </div> 
                : <h1>Please Select A Apartment</h1>
            }
            {showDeviceSelector
                ? <div>
                    <label>Choose a light:</label>
                    <select id="lights" name="lights" >
                        <option></option>
                        {lights.map(light => <option>{light}</option>)}
                    </select>
                </div> 
                : <h1>Please Select A Room</h1>
            }
            {/* <RoomSelector2 apartmentid = {apartmentID} /> */}
        </div>
    </div>)
}

export default RoomSelector