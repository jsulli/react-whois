import React, { Component } from 'react';
import '../css/App.css';
import Input from "./Input"
import WhoisApi from "./WhoisApi"
import Output from "./Output"

export default class App extends Component {

  constructor() {
    super()
    this.whoIsApi = new WhoisApi()
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Input something to find out things about it!</p>
        </header>
        <Input whoisApi={this.whoIsApi} />
        <Output whoisApi={this.whoIsApi}/>
      </div>
    );
  }
}