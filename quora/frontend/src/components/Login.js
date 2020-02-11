import React from "react";
import axios from "axios";

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleClick = (e) =>{
        e.preventDefault()
        var details = {
            email:this.state.email,
            password:this.state.password
        }
        axios.post("http://127.0.0.1:5000/login",details)
        .then(response =>{
            console.log(response.data)
            window.localStorage.setItem("token",response.data)
            this.props.history.push("/editprofile")   
        })
        // window.location.reload(false)
        .catch(error =>{
            console.log(error)
        });
    }

    render(){
        // console.log(this.state.details)
        return(
            <div>
            <div style = {{marginLeft:"500px"}}>
                <form className = "col-4 mt-5">
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Email</label>
                        <input type="email" name = "email" className="form-control" placeholder="Email"
                             value = {this.state.email} onChange = {(e) =>{this.handleChange(e)}}
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Password</label>
                        <input type="password" name = "password" className="form-control"
                             value = {this.state.password} onChange = {(e) =>{this.handleChange(e)}}
                        />
                    </div>
                    <button className = "btn btn-danger" onClick = {(e) =>{this.handleClick(e)}}>Login</button>
                </form>
            </div>
            </div>
        )
    }
}