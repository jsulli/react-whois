import React, { Component } from 'react';
import {ApiState} from "./WhoisApi"
import '../css/Output.css'

export default class Output extends Component {

    constructor({whoisApi}) {
        super()
        this.api = whoisApi
        this.api.updateListener(() => {
            this.forceUpdate()
        })
        this.showLoading = this.showLoading.bind(this)
        this.showResults = this.showResults.bind(this)
    }


    showLoading() {
        if(this.api.state === ApiState.LOADING) {
            return <div className="spinner-border text-light">
                <span className="sr-only">Loading</span>
            </div>
        } else {
            return null
        }
    }


    showResults() {
        if(this.api.state === ApiState.ERROR) {
            return <div className="error-text"><p>Error: No response for [{this.api.value}], try again</p></div>
        } else if (this.api.state === ApiState.SUCCESS) {
            return <div className="response-text"><p>{this.api.response}</p></div>
        } else {
            return null;
        }

    }

    render() { return(
        <div className="Output">
            {this.showLoading()}
            {this.showResults()}
        </div>
    )}
}