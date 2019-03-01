

// idle
// loading
// error
// success

export default class WhoisApi {

    constructor() {
        this.state = ApiState.IDLE;

        //dummy data
        this.response = ""
        this.value = ""
    }

    submit(value) {
        this.state = ApiState.LOADING
        this.update()
        return new Promise((resolve, reject) => {
            console.log("got " + value)
            // do api stuff
            this.value = value;
            setTimeout(() => {
                this.state = ApiState.ERROR
                this.response = `Information for: ${this.value}\nwhois: garbage\nlocation: a place\nother: null`
                this.update()
                resolve()
            }, 3000)
        })
    }

    update() {
        if(this.onUpdate) this.onUpdate()
    }

    updateListener(listener) {
        this.onUpdate = listener
    }
}


export const ApiState = {
    IDLE: 0,
    LOADING: 1,
    ERROR: 2,
    SUCCESS: 3
}