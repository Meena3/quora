import React from "react";
import axios from "axios";
import {Redirect} from "react-router-dom"
let token=localStorage.getItem("token")

export default class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            profile_image:"",
            user_id:""
        }
    }
    handleChange =(e) =>{
        this.setState({
            [e.target.name]:e.target.files[0]
        })
    }
    componentDidMount = () =>{
        axios.get("http://127.0.0.1:5000/get-token-user",{
            headers:{
                Authorization:"Bearer " + token,
                'Content-Type':'application/json'
            }
        })
        .then(response =>{
            // console.log(response)
            this.setState({
                user_id:response.data.id
            })
        })
        .catch(error =>{console.log(error)})
    }
    handleClick = (e) =>{
        var formdata = new FormData()
        // var id = this.state.id
        formdata.append("profile_image",this.state.profile_image)
        axios.post("http://127.0.0.1:5000/edit-profile",formdata,{
            headers:{
                user_id:this.state.user_id,
                'Content-Type':'application/json'
            }
        })
        .then(response =>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    render(){
        console.log(this.state.id)
        return(
            <React.Fragment>
                <h1>Change Profile Here..!</h1>
                <div style = {{marginLeft:"500px"}}>
                <form className = "col-4">
                    <div class="form-group">
                        <input type="file" name = "profile_image" className="form-control-file"
                            onChange = {(e) =>{this.handleChange(e)}}
                        /> 
                    </div>
                    <button className = "btn btn-danger" onClick = {(e) =>{this.handleClick(e)}}>CHANGE</button>
                </form>
                <Redirect to = "/home"></Redirect>
                </div>
            </React.Fragment>
        )
    }
}