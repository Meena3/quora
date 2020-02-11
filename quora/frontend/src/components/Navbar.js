import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
// import SearchUser from "./SearchUsers";

let token = localStorage.getItem("token")

export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:"",
            details:[],
            check:false,
            list:[],
            question:""
        }
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
                id:response.data.id,
                check:true
            })
        })
        .catch(error =>{console.log(error)})
    }
    componentDidMount = () =>{
        axios.get("http://127.0.0.1:5000/user-details",{
            headers:{
                Authorization:"Bearer " + token,
                'Content-Type':'application/json'
            }
        })
        .then(response =>{
            // console.log(response)
            this.setState({
                details:response.data
            })
        })
        .catch(error =>{console.log(error)})
    }
    handleChange = (e) =>{
        var add = {
            question:e.target.value
        }
        axios.post("http://127.0.0.1:5000/search-question",add)
        .then(response =>{
            // console.log(response)
            this.setState({
                list:response.data,
            })
        })
        .catch(error =>{console.log(error)})
        
    }
    render(){
        // console.log(this.state.id)
        console.log(this.state.list)
        return(
            <div>
                <nav className="navbar shadow  navbar-light bg-light">
                    <a className="navbar" href="#" style = {{color:"brown",marginLeft:"100px"}}><h3><i>Quora</i></h3></a>
                    <Link to = "/home" className = "navbar">Home</Link>
                    <Link to = "/users" className = "navbar">Users</Link>
                    <Link to = "/register" className = "navbar">Register</Link>
                    <input class="mr-sm-2" type="text" placeholder="Search" name = "question" 
                            onChange = {(e) => this.handleChange(e)}
                    />
                    <Link to = "/addquestion"><button class="btn btn my-2 my-sm-0" type="submit" style = {{backgroundColor:"brown" ,color:"white"}}>Add Question</button></Link>
                    {this.state.details.map((elm) =>{
                        return(
                            <div>
                                <Link to = "/editprofile">
                                </Link>
                                <img src = {`http://127.0.0.1:5000/${elm[5]}`} className ="rounded-circle" style = {{width:"50px",height:"50px"}} alt = "No image"/>
                            </div>
                        )
                    })}
                    <Link to = "/editprofile" className = "navbar">Editprofile</Link>
                    <Link to = "/login" className = "navbar">Login</Link>
                    <Link to = "/logout" className = "navbar">Logout</Link>
                </nav>
                {this.state.list.map((a) => {
                    return(
                        <div>
                            <h4>Question:{a[0]}</h4>
                            <p>Answer:{a[1]}</p>
                        </div>
                    )
                })}
            </div>
        )
    }
}