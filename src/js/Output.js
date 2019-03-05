import React, { Component } from 'react'
import { ApiState } from "./WhoisApi"
import '../css/Output.css'

export default class Output extends Component {

    render() {
        switch (this.props.apiState) {
            case ApiState.ERROR_BAD_ADDRESS:
                return <div className="error-text"><p>Error: Invalid address [{ this.props.response }],
                    try again</p></div>
            case ApiState.ERROR_NETWORK:
                return <div className="error-text"><p>Error: Unable to reach server</p></div>
            case ApiState.SUCCESS:
                return <div className="response-text"><p>{ this.props.response }</p></div>
            case ApiState.LOADING:
                return <div className="loading spinner-border text-light">
                    <span className="sr-only">Loading</span>
                </div>
            default:
                return null
        }
    }
}