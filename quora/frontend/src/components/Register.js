import React from "react";
import axios from "axios";

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:"",
            email:"",
            password:""
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleClick = (e) =>{
        e.preventDefault()
        var details ={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
        }
        axios.post("http://127.0.0.1:5000/register",details)
        .then(response =>{
            console.log(response)
            alert("Added")
            this.props.history.push('/')
        })
        .catch(error =>{
            console.log(error)
        });
    }

    render(){
        // console.log(this.state.details)
        return(
            <div style = {{marginLeft:"500px"}}>
                <form className = "col-4 mt-5">
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Name</label>
                        <input type="text" name = "name" className="form-control" placeholder="Name"
                            value = {this.state.name} onChange = {(e) =>{this.handleChange(e)}}
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Email</label>
                        <input type="email" name = "email" className="form-control" placeholder="Email"
                             value = {this.state.email} onChange = {(e) =>{this.handleChange(e)}}
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlInput1">Password</label>
                        <input type="password" name = "password" placeholder="Password" className="form-control mt-4"
                             value = {this.state.password} onChange = {(e) =>{this.handleChange(e)}}
                        />
                        <button className = "btn btn-warning mt-4" onClick = {(e) =>{this.handleClick(e)}}>Register</button>
                    </div>
                </form>
            </div>
        )
    }
}
