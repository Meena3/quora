import React from 'react';
import {BrowserRouter,Route,Redirect} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import EditProfile from './components/EditProfile';
import Logout from './components/Logout';
import AddQestion from './components/AddQuestion';
import Category from './components/Category';
import Users from "./components/Users";
import AddAnswer from "./components/AddAnswer";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      tokenId:""
    }
  }
  render(){
    let token = localStorage.getItem("token")
    console.log(token)
    return (
      <div className="App">
          <BrowserRouter>
            <Navbar/>
            <Route path = "/home" exact component = {Home}/>
            <Route path = "/register" exact render = {(props) => <Register {...props}/>}></Route>
            <Route path = "/login" exact render = {(props) => <Login {...props}/>}></Route>
            <Route path = "/editprofile" exact render = {(props) => <EditProfile {...props}/>}></Route>
            <Route path = "/logout" exact render = {(props) => <Logout {...props}/>}></Route>
            <Route path = "/users" exact render = {(props) => <Users {...props}/>}></Route>
            <Route path = "/category" component = {Category}/>
            <Route path = "/addquestion" render = {(props) => <AddQestion {...props}/>} ></Route>
            <Route path = "/addanswer" render = {(props) => <AddAnswer {...props}/>} ></Route>
        </BrowserRouter>
        </div>
    );
  }
}
export default App;
