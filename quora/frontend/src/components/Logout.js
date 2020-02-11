import React from "react";
import {Redirect} from "react-router-dom"

class Logout extends React.Component{
    componentDidMount = () =>{
        localStorage.removeItem("token")
        window.location.reload(false)
    }
    render(){
        return(
            <div>
                <Redirect to = "/home"></Redirect>
            </div>
        )
    }
} 
export default Logout;


