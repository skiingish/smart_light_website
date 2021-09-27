import React, {useState} from "react";
import Input from "./Input";
import Button from "./Button";


const Login = (props) => {

    const submitForm =  () => {
        alert("Form go submit boom!")
    }

    return( <div>
        <form onSubmit={submitForm}>
        <Input
        type= "text"
        placeholder= "Device ID"
        />
        <br></br>
        <Input
        type= "text"
        placeholder= "Device type"
        />
        {/* <div className="typeRadio">
            <p>Device Type</p>
        <label>
            <input
              type="radio"
              value="light"
            />
            Light
          </label>
        </div>
        <div className="radio">
          <label>
            <input
              type="radio"
              value="switch"
            />
            Switch
          </label>
        </div>   */}
        <br></br>
        <Input
        type= "text"
        placeholder= "Apartment ID"
        />
        <br></br>
        <Input
        type= "text"
        placeholder= "Room ID"
        />
        <br></br>
        <Input
        type= "text"
        placeholder= "Target"
        />
        <br></br>
        <Button 
        type="submit"
        text="Add Device"
        />
        </form>
    </div>)
}

export default Login