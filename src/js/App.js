import React, { Component } from 'react'
import '../css/App.css'
import Input from "./Input"
import { WhoisApi } from "./WhoisApi"
import Output from "./Output"

export default class App extends Component {

    constructor() {
        super()

        this.state = { apiState: null, response: "", address: "" }
        this.whoIsApi = new WhoisApi()
        this.whoIsApi.onChangeListener((state, response) => {
            this.setState({ apiState: state, response })
        })
        this.submitAddress = this.submitAddress.bind(this)
    }


    submitAddress(address) {
        this.whoIsApi.submit(address)
    }


    render() {
        return (
            <div className="App">

                <header className="App-header">
                    <p>Input something to find out things about it!</p>
                </header>

                <Input submit={ this.submitAddress }/>

                <Output
                    apiState={ this.state.apiState }
                    response={ this.state.response }
                />

            </div>
        )
    }
}