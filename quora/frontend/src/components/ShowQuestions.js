import React from "react";
import axios from "axios"
import {Link} from "react-router-dom";
import ReactPaginate from 'react-paginate';

let token = localStorage.getItem("token")
export default class ShowQuestions extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            details:[],
            user_id:"",
            rows:1,
            total_pages:0,
            current_page:1
        }
    }
    componentDidMount = (page =1) =>{
        axios.get(`http://127.0.0.1:5000/all-questions-answers?page=${page}`,{
            headers:{
                rows:this.state.rows
            }
        })
        .then(response =>{
            console.log(response)
            this.setState({
                details:response.data.data,
                total_pages:response.data.total_pages
            })
        })
        .catch(error =>{console.log(error)})
    }
    setElementsForCurrentPage(){
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
    }
    handlePageClick = (data) => {
        const selected_page = data.current_page;
        // const offset = selectedPage * this.state.perPage;
        this.setState({ current_page: selected_page,
        })
    }
    render(){
        let paginationElement;
    if (this.state.total_pages > 1) {
      paginationElement = (
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={<span className="gap">...</span>}
          total_pages={this.state.total_pages}
          onPageChange={this.handlePageClick}
          forcePage={this.state.current_page}
          containerClassName={"pagination"}
          previousLinkClassName={"previous_page"}
          nextLinkClassName={"next_page"}
          disabledClassName={"disabled"}
          activeClassName={"active"}
        />
      );
    }
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
                {paginationElement}
            </div>
        )
    }
}