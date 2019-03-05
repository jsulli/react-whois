import React from 'react'
import { mount } from 'enzyme'
import Input from "../js/Input"


test('Input has input field', () => {
    const wrapper = mount(<Input/>)
    const input = wrapper.find("input")
    expect(input.exists()).toEqual(true)
})


test('Input value changes component state', () => {
    const wrapper = mount(<Input/>)
    const input = wrapper.find("input")
    const data = "value"
    input.simulate('change', { target: { value: data } })
    expect(wrapper.state().value).toEqual(data)
})


test('Submitting value from input calls up to parent component', () => {
    const data = "value"
    const submit = (address) => {
        expect(address).toEqual(data)
    }

    const wrapper = mount(<Input submit={submit}/>)
    const input = wrapper.find("input")

    input.simulate('change', { target: { value: data } })
    wrapper.instance().passValue()
})


test('Submitting value clears input field', () => {
    const data = "value"
    const submit = (address) => {}

    const wrapper = mount(<Input submit={submit}/>)
    const input = wrapper.find("input")

    input.simulate('change', { target: { value: data } })
    wrapper.instance().onSubmit({ key: "Enter", target: { value: "" } })
    expect(input.get(0).value).toEqual(undefined)
})