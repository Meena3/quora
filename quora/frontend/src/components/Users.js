import React from "react";
import axios from "axios";

let token = localStorage.getItem("token")

export default class Users extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:[],
            receiver_user_id:[],
            sender_user_id:"",
            connection_list:[],
            user_id:"",
            details:[],
            user_details:[],
            check:""
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
                user_id:response.data.id,
                user_details:response.data
            })
            axios.get("http://127.0.0.1:5000/all-users",{
                headers:{
                    user_id:this.state.user_id
                }
            })
            .then(response =>{
                console.log(response.data)
                this.setState({
                    connection_list:response.data,
                    receiver_user_id:response.data
                })
            })
            .catch(error =>{
                console.log(error)
            });
            
        })
        .catch(error =>{
            console.log(error)
        })
        axios.get("http://127.0.0.1:5000/get-connection",{
                headers:{
                   user_id:this.state.user_id
                }
                })
                .then(response =>{
                    console.log(response.data)
                    this.setState({
                        users:response.data,
                    })
                
                })
                .catch(error =>{
                    console.log(error)
                });
        
            
    }
    handleFollow = (e) =>{
        var send ={
            sender_user_id:this.state.user_details.id,
            receiver_user_id:e.target.value
        }
        axios.post("http://127.0.0.1:5000/send-connection",send)
        .then((res) => {
            console.log(res)
                this.setState({
                    check:res.data
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    handleCancel = (e) =>{
        console.log(this.state.sender_user_id)
        var cancel = {
            receiver_user_id:e.target.value
        }
        axios.post("http://127.0.0.1:5000/cancel-connection",cancel)
        .then((res) => {
            console.log(res)
            this.setState({
                check:res.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    render(){
        // console.log(this.props.match.params.id)
        // console.log(this.state.user_details.id)
        // console.log(this.state.receiver_user_id)
        return(
            <div className = "row">
                <div className = "col-3">
                </div>
                <div className = "col-6">
                    <div class="card text-center shadow mt-5" >
                        <div class="card-header">
                            <h2 style = {{color:"rgb(10,124,372)"}}><i>All Users OF QUORA</i></h2>
                        </div>
                        <div class="card-body">
                            <h1 class="card-text">
                                {this.state.connection_list.map((elm) =>{
                                    return(
                                        <div>
                                            <img src = {`http://127.0.0.1:5000/${elm[5]}`} className = "rounded-circle" style = {{width:"100px"}}/>
                                            <h3 style = {{color:"brown"}}>{elm[1]}</h3>
                                            {/* <input className = "col-sm-1" type = "submit" value = {`${elm[0]}`} placeholder= "Follow" onClick = {(e) => this.handleFollow(e)}/> */}
                                                <button className = "btn btn-outline-primary"
                                                    value = {elm[0]}onClick = {(e) =>{this.handleFollow(e)}}>Follow
                                                </button>
                                                <button className = "btn btn-outline-warning ml-3"
                                                   value = {elm[0]} onClick = {(e) => {this.handleCancel(e)}}>Un Follow
                                                </button>
                                                <hr/>
                                        </div>
                                    )
                                })}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}