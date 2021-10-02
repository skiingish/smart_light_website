import React, {useState} from "react";
import Input from "./Input";
import Button from "./Button";
import Greeting from "./Greeting";
import axios from "axios";

// The base API
const baseAPIurl = "http://smartlights-api-backend-lb-1879228982.us-east-1.elb.amazonaws.com:8000";

const AddDeviceForm = (props) => {
    const [device, setDevice] = useState({
      device_id: '',
      device_name: '',
      device_type: '',
      apartment_id: '',
      room_id: '',
      target: ''
    });

    // Handle the changes to the form values.
    const handleChange = (event) => {
      const {name, value} = event.target;
      setDevice ((preValue) => {
        return {
          ...preValue,
          [name]: value
        }
      });
    }
  
  // When submitting the form.
  const submitForm = async () => {
    //alert("adding device")
    let res = await postNewDevice(device);
    //alert(res);
  }

  // Post the new device.
  const postNewDevice = async (data) => {
    return axios.post(`${baseAPIurl}/newdevice/`, {
      device_id: data.device_id,
      device_name: data.device_name,
      device_type: data.device_type,
      apartment_id: data.apartment_id,
      room_id: data.room_id,
      target: data.target
    })
      .then(res => {
        console.log(res);
        // If there's error response data then display
        if (res.data.length > 0)
        {
          alert(res.data);
        }
        else
        {
          alert(`Added new device: ${data.device_name}`);
        }
      })
      .catch(err => {
        alert(err.data);
        console.log(err);
      })
  }

  return (
    <div className='header-div'>
      <Greeting
        text={device.device_name}
      />
      <Input
        name='device_id'
        type='text'
        placeholder="device_id"
        onChange={handleChange}
        value={device.device_id}
      />
      <br></br>
      <Input
        name='device_name'
        type='text'
        placeholder="device_name"
        onChange={handleChange}
        value={device.device_name}
      />
      <br></br>
      <Input
        name='device_type'
        type='text'
        placeholder="device_type"
        onChange={handleChange}
        value={device.device_type}
      />
      <br></br>
      <Input
        name='apartment_id'
        type='text'
        placeholder="apartment_id"
        onChange={handleChange}
        value={device.apartment_id}
      />
      <br></br>
      <Input
        name='room_id'
        type='text'
        placeholder="room_id"
        onChange={handleChange}
        value={device.room_id}
      />
      <br></br>
      <Input
        name='target'
        type='text'
        placeholder="target"
        onChange={handleChange}
        value={device.target}
      />
      <br></br>
      <Button
        type="submit"
        text="Add Device"
        onClick={submitForm}
      />
    </div>)
}

export default AddDeviceForm