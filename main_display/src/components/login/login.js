import React from "react";
import axios from "axios";
//import loginImg from "../../login.svg";

export class Login extends React.Component {
  constructor(props) {
    super(props);
  }
 state ={
     username: "",
     password: ""
     };


handleLogin(){

             console.log(this.state);
             // send the username and password to the server
             const http = new XMLHttpRequest();


                     http.open("POST","http://localhost:8080/api/login");
                     http.setRequestHeader("Content-Type" , "application/json");


                     http.send(JSON.stringify(this.state));
                     console.log("login request sent")
                     //http.send(JSON.stringify(questionObject));
                     http.onreadystatechange = function() {
                     console.log(this.responseText);
                         if (this.readyState == 4 && this.status == 202) {
                            console.log("login request received back")
                            alert('Login Succesful! ');


                            var userInfo;
                            console.log(this.responseText);
                            userInfo = JSON.parse(this.responseText);

                             const userDataStorage ={
                                 username: userInfo[0],
                                 email:userInfo[1],
                                 uniqueID:userInfo[2]
                                 };

                            // store the user in localStorage
                            localStorage.setItem('user', JSON.stringify(userDataStorage));
                            console.log(userDataStorage);
                            window.location.href = "/login";
                             }
                         if(this.status==404)
                         {
                             alert('Username Not Found! ');
                         }
                         if(this.status==500)
                         {
                             alert('Login Failed! ');
                         }
                          if(this.status==406)
                          {
                             alert('Login Failed! ');
                          }

                }
}

handleUsername(e)
{
this.state=({username: e , password:this.state.password});
}
handlePassword(e)
{
this.state=({username: this.state.username , password: e});
}

clearLocalStorage()
{
localStorage.clear();
window.location.href = "/login";
}
  render() {
    const user = JSON.parse(localStorage.getItem('user')); //how to get the username from login system.
    if (user) {
        return(
        <div className="base-container">
            <label>{user.username} is loggged in </label>
            <button type="button" className="btn" onClick = {()=>this.clearLocalStorage()}> Sign Out! </button>
        </div>
        ) ;
      }


    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
        {/* <div className="image">
            <img src={loginImg} />
    </div>*/}
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" placeholder="username" onChange={e =>  this.handleUsername(e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" placeholder="password" onChange={e =>  this.handlePassword(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick = {()=>this.handleLogin()}>
            Login
          </button>
        </div>
      </div>
    );
  }
}