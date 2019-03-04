

export default class WhoisApi {

    constructor() {
        this.state = ApiState.IDLE;
    }

    submit(value) {
        this.state = ApiState.LOADING
        this.update()
        return new Promise((resolve, reject) => {
            console.log("address: " + value)
            // I was hoping I could do something cleaner than this, but the AWS SDK doesn't seem
            // to offer any better implementations. Hardcoded link it is.
            fetch('https://dr5uhki0g9.execute-api.us-east-1.amazonaws.com/dev/whois/' + value)
                .then(response => response.text())
                .then(data => {
                    //do a little surgery to the malformed json
                    data = data.substr(14)
                    data = data.slice(0, -4)

                    if(data === "ERROR") {
                        console.log("ERROR")
                        this.state = ApiState.ERROR
                        this.update()
                        resolve()
                    } else {
                        this.state = ApiState.SUCCESS
                        this.response = data
                        this.update()
                        resolve()
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.state = ApiState.ERROR
                    this.update()
                    reject()
                })

            // do api stuff
            this.value = value;
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