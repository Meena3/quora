import React from "react";
import axios from "axios"
import Body from "./Body";
// import ShowQuestions from "./ShowQuestions";
import ShowQuestions1 from "./ShowQuestions1";



export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            details:""
        }
    }
    componentDidMount = () =>{
        axios.get("http://127.0.0.1:5000/get-categories")
        .then(response =>{
            console.log(response)
        })
        .catch(error =>{console.log(error)})
    }
    render(){
        return(
            <div>
            <div className = "container mt-5">
                <div className = "row">
                    <div className = "col-2">
                        <h5>Feed</h5>
                        <p>History</p>
                        <p>Life</p>
                        <p>Health</p>
                        <p>Music</p>
                        <p>Travel</p>
                        <p>Cooking</p>
                        <p>Science</p>
                        <p>Human body</p>
                        <p>Food</p>
                    </div>
                    <div className = "col-8">
                        <Body/>
                        <ShowQuestions1 props = {this.props}/>
                        {/* <ShowQuestions/> */}
                    </div>
                    <div className = "col-2">
                        <div class="card shadow" style={{width: "10rem"}}>
                            <div class="card-body" >
                                <h5 class="card-title" style = {{backgroundColor:"grey"}}>Setup Your Account</h5><hr/>
                                <p class="card-text">Visit Your Feed</p>
                                <p class="card-text">Follow 2 more spaces</p>
                                <p class="card-text">Follow 10 more spaces</p>
                                <p class="card-text">Upvote 5 more answers</p>
                                <p class="card-text">Ask Your First question</p>
                                <p class="card-text">Add 3 credentials</p>
                                <p class="card-text">Answer a question</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}