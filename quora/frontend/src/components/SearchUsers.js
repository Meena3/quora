import React from "react";
import axios from "axios"

let token = localStorage.getItem("token")

export default class SearchUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question:"",
            details:[],
            user_id:"",
        }
    }
    handleChange = (e) =>{
        var add = {
            question:e.target.value
        }
        axios.post("http://127.0.0.1:5000/search-question",add)
        .then(response =>{
            console.log(response)
            this.setState({
                details:response.data,
            })
        })
        .catch(error =>{console.log(error)})
        
    }
    componentDidMount = () =>{
        
    }
    render(){
        // console.log(this.state.name)
        return(
            <div>
                {/* <form class="form-inline my-2 my-lg-0"> */}
                    <input class="form-control mr-sm-2" type="text" placeholder="Search" name = "question" 
                         onChange = {(e) => this.handleChange(e)}
                    />
                {/* </form> */}
                <div>
                    {/* <h1>result for search</h1> */}
                </div>
            </div>
        )
    }
}