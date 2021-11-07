import React from "react";
//import loginImg from "../../login.svg";

export class Register extends React.Component {
  constructor(props) {
    super(props);



  }
 state ={
     username: "",
     email: "",
     password: ""


     };

handleNewUsername(e)
{
this.state=({username: e, email:this.state.email, password: this.state.password});


}

handleNewPassword(e)
{
this.state=({username: this.state.username, email:this.state.email, password: e});

}
handleNewEmail(e)
{
this.state=({username: this.state.username, email: e, password: this.state.password});

}

handleRegistration()
{

        console.log("this.state");



        const http = new XMLHttpRequest();


        http.open("POST","http://localhost:8080/api/New_User");
        http.setRequestHeader("Content-Type" , "application/json");


        http.send(JSON.stringify(this.state));

        //http.send(JSON.stringify(questionObject));
        http.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 201) {


              alert('Registration succesful! ');

               var userInfo;
               userInfo = JSON.parse(this.responseText);
               console.log(userInfo);

                }

            if(this.status==500)
            {
                alert('Registration Failed! Username/Email already taken! ');
            }

        }

}


  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
        { /* <div className="image">
            <img src={loginImg} />
          </div>*/}
          <div className="form"  >
            <div className="form-group">
              <label htmlFor="username">Username</label>
                  <input type="text"
                  name="username"
                  placeholder="username"
                  onChange={e =>  this.handleNewUsername(e.target.value)}

              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
                    <input type="text"
                    name="email"
                    placeholder="email"
                    onChange={e =>  this.handleNewEmail(e.target.value)}
                    />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
                    <input type="text"
                    name="password"
                    placeholder="password"
                    onChange={e =>  this.handleNewPassword(e.target.value)}
                    />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick= {()=>this.handleRegistration()} > Register</button>
        </div>
      </div>
    );
  }
}