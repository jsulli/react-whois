import React from 'react'
import { mount } from 'enzyme'
import Output from "../js/Output"
import { ApiState } from "../js/WhoisApi"


test('Output renders the text of the whois lookup', () => {
    const state = ApiState.SUCCESS
    const response = "This is a response"
    const wrapper = mount(
        <Output apiState={state} response={response}/>
    )
    const output = wrapper.find(".response-text")
    expect(output.text()).toBe(response)
})


test('Output renders an error with a bad lookup', () => {
    const state = ApiState.ERROR_BAD_ADDRESS
    const response = "Error"
    const wrapper = mount(
        <Output apiState={state} response={response}/>
    )
    const output = wrapper.find(".error-text")
    expect(output.text()).toContain(response)
})


test('Output renders error with no network', () => {
    const state = ApiState.ERROR_NETWORK
    const response = "Error"
    const wrapper = mount(
        <Output apiState={state} response={response}/>
    )
    const output = wrapper.find(".error-text")
    expect(output.text()).toContain(response)
})


test('Output shows loading indicator when loading', () => {
    const state = ApiState.LOADING
    const response = ""
    const wrapper = mount(
        <Output apiState={state} response={response}/>
    )
    expect(wrapper.exists(".loading")).toEqual(true)
})


test('Output shows nothing when idle', () => {
    const wrapper = mount(
        <Output apiState={null} response={null}/>
    )
    expect(wrapper.exists(".loading")).toEqual(false)
    expect(wrapper.exists(".error-text")).toEqual(false)
    expect(wrapper.exists(".response-text")).toEqual(false)
})