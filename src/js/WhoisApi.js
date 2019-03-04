

export class WhoisApi {

    constructor() {
        this.state = ApiState.IDLE;
    }

    submit(address) {
        this.setState(ApiState.LOADING)
        return new Promise((resolve, reject) => {
            console.log("address: " + address)
            // I was hoping I could do something cleaner than this, but the AWS SDK doesn't seem
            // to offer any better implementations. Hardcoded link it is.
            fetch('https://dr5uhki0g9.execute-api.us-east-1.amazonaws.com/dev/whois/' + address)
                .then(response => response.text())
                .then(data => {
                    //do a little surgery to the malformed json
                    data = data.substr(14)
                    data = data.slice(0, -4)

                    if(data === "ERROR") {
                        console.log("ERROR")
                        this.setState(ApiState.ERROR, address)
                        resolve()
                    } else {
                        this.setState(ApiState.SUCCESS, data)
                        resolve()
                    }
                })
                .catch(err => {
                    console.log(err)
                    this.setState(ApiState.ERROR, address)
                    reject()
                })
        })
    }

    setState(state, response) {
        this.state = state;
        this.change(state, response, )
    }

    onChangeListener(change) {
        this.change = change
    }
}


export const ApiState = {
    IDLE: 0,
    LOADING: 1,
    ERROR: 2,
    SUCCESS: 3
}