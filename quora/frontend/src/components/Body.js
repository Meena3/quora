import React from "react";
import {Link} from "react-router-dom";

export default class Body extends React.Component{
    constructor(props){
        super(props);
        this.state={
            question:""
        }
    }
    render(){
        return(
            <div>
                <div className="card shadow-sm" style={{width: "40rem",marginLeft:"50px"}}>
                    <div className="card-body">
                        {/* <p>Meena Ammineni</p> */}
                        <Link style = {{color:"brown"}} data-toggle="modal" data-target="#exampleModal">
                            What is Your Question?
                        </Link>
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Add Question</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <ul>Tips on getting good answers quickly</ul>
                                        <p>Make sure your question hasn't been asked already<br></br></p>
                                        Keep your question short and to the point
                                        <p>Double-check grammar and spelling</p>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" placeholder = "Start Your Question with What,Why,How,etc."/>
                                </div>
                                <div class="modal-footer">
                                    <Link data-dismiss="modal">Close</Link>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="card mt-3" style={{width: "40rem",marginLeft:"50px"}}>
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text" >What is Your Question?</p>
                    </div>
                </div> */}
            </div>
        )
    }
}