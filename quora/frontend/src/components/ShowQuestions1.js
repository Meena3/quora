import React from "react";
import axios from "axios"
import {Link ,Redirect} from "react-router-dom";
import queryString from "query-string"
import { number } from "prop-types";

let token = localStorage.getItem("token")

export default class ShowQuestions1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            details:[],
            user_id:"",
            rows:1,
            changed_page:{
                page:1
            },
            total_pages:0
        }
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    componentDidMount = (page =1) =>{
        axios.get(`http://127.0.0.1:5000/all-questions-answers?page=${page}`,{
            headers:{
                rows:this.state.rows
            }
        })
        .then(response =>{
            // console.log(response)
            this.setState({
                details:response.data.data,
                total_pages:response.data.total_pages
            })
        })
        .catch(error =>{console.log(error)})
    }
    handleClick = (pageNo) =>{
        let updatePage = this.state.changed_page
        updatePage.page = pageNo
        this.setState(
            {
            changed_page:updatePage
            }, () => {
                this.props.props.history.push(`?${queryString.stringify(updatePage)}`);
            }
        );
        this.componentDidMount(this.page = pageNo)
    }
    render(){
        // console.log(this.props)
        const pageNumbers = []
        for(var i=1; i<=this.state.total_pages; i++){
            pageNumbers.push(i)
        }
        const renderPageNumbers = pageNumbers.map(number =>{
            // let classes = this.state.current_page === number ? (styles = {backgroundColor:"blue"}) : '';
            return(
                <button className = "btn btn-outline-warning ml-2" onClick = {() => this.handleClick(number)}>{number}</button>
            )
        })
        return(
            <div>
                {this.state.details.map((elm) =>{
                    return(
                        <div>
                            <h3 style = {{color:"brown"}}>Question:</h3><Link><p>{elm[4]}</p></Link>
                            <h3 style = {{color:"brown"}}>Answer:</h3>
                            <p>{elm[1]}</p>
                            <Link to = "/addanswer"><button className = "btn btn-primary" >Add Answer</button></Link>
                            <hr/>
                        </div>
                    )
                })}
                <div class="form-group">
                    <select class="custom-select col-3" aria-label="Example select with button addon" placeholder = "Select Continent"
                            name = "rows" onChange = {(e) => this.handleChange(e)} >
                        <option>Select Rows</option>
                        <option value = "1">1</option>
                        <option value = "2">2</option>
                        <option value = "3">3</option>
                        <option value = "4">4</option>
                        <option value = "5">5</option>
                    </select>
                </div>
                    <div>
                        <button className = "btn btn-outline-primary" onClick={() => this.handleClick(number)}>Previous</button>
                        {renderPageNumbers}
                        <button className = "btn btn-outline-primary ml-1" onClick={() => this.handleClick(number)}>Next</button>
                    </div>
                    {/* &raquo; */}
                    {/* &laquo; */}
            </div>
        )
    }
}