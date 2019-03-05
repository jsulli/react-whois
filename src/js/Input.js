import React, { Component } from 'react'
import '../css/form.css'

export default class Input extends Component {

    constructor(props) {
        super(props)
        this.state = { value: "", }
        this.passValue = this.passValue.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    passValue() {
        console.log("passing value of: " + this.state.value)
        this.props.submit(this.state.value)
        this.setState({ value: "" })
    }


    onSubmit(ev) {
        if (ev.key === "Enter") {
            this.passValue()
            ev.target.value = ""
        }
    }


    handleChange(ev) {
        this.setState({ value: ev.target.value })
        ev.preventDefault()
    }


    render() {
        return (
            <div className="FormContainer">
                <input type="text"
                       className="form-control InputField"
                       placeholder="IP or Domain"
                       aria-label="ip"
                       onKeyDown={ this.onSubmit }
                       onChange={ this.handleChange }
                       value={ this.state.value }>
                </input>
                <button className="btn btn-outline-light FormButton"
                        onClick={ this.passValue }>Submit
                </button>
            </div>
        )
    }
}