import React, { Component } from 'react';
import {urls} from "../../common/url";

class Home extends Component {
  toLogin(){
       urls.login()
  }
  render(){
    return (
      <div className="home">
        <div onClick={this.toLogin.bind(this)}>home</div>
      </div>
    );
  }
}

export default Home;
