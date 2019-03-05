import { ApiState, WhoisApi } from "../js/WhoisApi"


it("gets response from API Gateway", () => {
    const api = new WhoisApi()
    api.submit("test.null").then((state, address) => {
        expect([ ApiState.SUCCESS, ApiState.ERROR_BAD_ADDRESS ]).toContain(state)
    })
})

it("handles valid domain", () => {
    const api = new WhoisApi()
    api.submit("google.com").then((state, address) => {
        expect(state).toBe(ApiState.SUCCESS)
    })
})

it("handles valid IP address", () => {
    const api = new WhoisApi()
    api.submit("8.8.8.8").then((state, address) => {
        expect(state).toBe(ApiState.SUCCESS)
    })
})

it("handles invalid address", () => {
    const api = new WhoisApi()
    api.submit("invalid.url").then((state, address) => {
        expect(state).toBe(ApiState.ERROR_BAD_ADDRESS)
    })
})

it("sets correct load state", () => {
    const api = new WhoisApi()
    api.onChangeListener((state, response) => {
        expect(state).toBe(ApiState.LOADING)
    })
    api.submit("invalid.url")
})