import React, { Component } from 'react';
import '../css/Login.css';
import $ from 'jquery';




export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[],
      UserName: '',
      Password: '',
      
    };
    this.create = this.create.bind(this);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


create(e) {

  e.preventDefault();
  
  fetch("http://localhost:3001/api/register",{
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "accept": "application/json",

      }, 
      "body": JSON.stringify({
        name: this.state.name,
        password: this.state.password,
        email: this.state.email
      })
    })
    .then(response => response.json())
    .then(response => { console.log(response)})
    .catch(error => {
        console.log(error)
      });
}

login(e) {
  e.preventDefault();
  fetch("https://192.168.1.5:50000/b1s/v1/Login",{
    method: "POST",
    credentials: 'include',
    headers: {
      "content-type": "application/json",
      "accept": "application/json",

    }, 
    "body": JSON.stringify({
      CompanyDB: 'SBO_CY_2020',
      Password: this.state.Password,
      UserName: this.state.UserName
    })
  })
  .then(response => response.json())  
  .then(responseData => { 
    let token = responseData;
    sessionStorage.setItem('res', token);
    sessionStorage.setItem('token', JSON.stringify(token.SessionId))
    this.goTo();
    console.log('Res:', token);
  })
  .catch(error => {
      console.log(error)
    });

}

/*login(e) {
  e.preventDefault();
  fetch("http://localhost:3001/api/Login",{
    "method": "POST",
    "headers": {
      "content-type": "application/json",
      "accept": "application/json",
      "Access-Control-Allow-Origin": "*"
    }, 
    "body": JSON.stringify({
      Password: this.state.Password,
      UserName: this.state.UserName
    })
  })
  .then(response => response.json())  
  .then(responseData => { 
    let token = responseData.token;
    sessionStorage.setItem('token', token);
    this.goTo();
    console.log('token:', token);
  })
  .catch(error => {
      console.log(error)
    });

}*/


goTo = () => {
  return this.props.history.push('/Home');
};

verifyRoute = () => {
  if (sessionStorage.getItem('token')) {
      return this.props.history.push('/home');
  }
};


handleChange(changeObject) {
  this.setState(changeObject)
}

componentDidMount() {
    $('.message a').click(function(){
        $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
     });
}

  render() {
    this.verifyRoute();

    return (
        <div class="login-page">
        <div class="form">
          <form class="register-form">
            <input 
            type="text" placeholder="Name" name="Name" id="Name" className = "form-control" ref="Name"
            value={this.state.Name}
            onChange={(e) => this.handleChange({ Name: e.target.value })}
            required/>
            <input type="password" placeholder="password" name="password" id="password"  className = "form-control" ref="password"
             value={this.state.password}
             onChange={(e) => this.handleChange({ password: e.target.value })}
             required/>
            <input type="text" placeholder="email" name="email" id="email" className = "form-control"  ref="email"
             value={this.state.email}
             onChange={(e) => this.handleChange({ email: e.target.value })}
             required/>
            <button onClick={(e) => this.create(e)} type="button">Registrase</button>
            <p class="message">Already registered? <a href="#">Sign In</a></p>
          </form>
          <form class="login-form">
            <input type="text" placeholder="UserName" name="UserName" id="UserName" ref="UserName" 
             value={this.state.UserName}
             onChange={(e) => this.handleChange({ UserName: e.target.value })}
            />
            <input type="password" placeholder="Password" name="Password" id="Password" ref="Password" 
             value={this.state.Password}
             onChange={(e) => this.handleChange({ Password: e.target.value })}
            />
            <button  onClick={(e) => this.login(e)} type="button">login</button>
            <p class="message">Not registered? <a href="#">Create an account</a></p>
          </form>
        </div>
      </div>
    )  
  }
}
