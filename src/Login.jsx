import React from "react";
import Input from "./Input";
import Button from "./Button";

const Login = (props) => {
    return( <div>
        <Input
        type= "text"
        placeholder= "username"
        />
        <br></br>
        <Input
        type= "password"
        placeholder= "password"
        />
        <br></br>
        <Button 
        type="submit"
        text="Login"
        />
    </div>)
}

export default Login