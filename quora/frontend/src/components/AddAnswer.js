import React from "react";
import axios from "axios"
let token = localStorage.getItem("token")
export default class AddAnswer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question:"",
            user_id:"",
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
            console.log(response)
            this.setState({
                user_id:response.data.id
            })
        })
        .catch(error =>{console.log(error)})
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleClick = (e) =>{
        e.preventDefault()
        var details = {
            user_id:this.state.user_id,
            question:this.state.question
        }
        // axios.post("http://127.0.0.1:5000/question-add",details)
        //     .then(response =>{
        //         console.log(response)
        //     })
        //     .catch(error =>{console.log(error)})
    }
    render(){
        console.log(this.state.user_id)
        return(
            <div>
                <h3>Add Your Answer</h3>
                <form className = "col-10">
                    <div class="form-group mt-4">
                        <input type="text" name = "answer" className="form-control-file"
                            onChange = {(e) =>{this.handleChange(e)}}
                        /> 
                    </div>
                    <button className = "btn btn-danger" onClick = {(e) =>{this.handleClick(e)}}>ADD</button>
                </form>
                {/* <form className = "col-4" style = {{marginLeft:"500px"}}>
                    <div class="form-group mt-4">
                        <input type="text" name = "question" className="form-control-file"
                            onChange = {(e) =>{this.handleChange(e)}}
                        /> 
                    </div>
                    <button className = "btn btn-danger" onClick = {(e) =>{this.handleClick(e)}}>CHANGE</button>
                </form> */}
            </div>
        )
    }
}