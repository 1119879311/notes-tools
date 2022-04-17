### 手写一个简单的Promise

```javascript
const STATE = { pending:0,fulfilled:1,rejected:2}
class PromiseM {
    constructor(fn) {
        this.state = STATE.pending
        this.resolveValue = undefined
        this.rejectValue = undefined
        this.resolveQuence = []
        this.rejectQuence = []

        this.resolve = (val) =>{
            if(this.state ===STATE.pending){
                this.resolveValue = val
                this.state = STATE.fulfilled
                this.resolveQuence.forEach(itme=>itme());
            }
        }

        this.reject =  (error)=> {
            if(this.state ===STATE.pending){
                this.rejectValue = error
                this.state = STATE.rejected
                this.rejectQuence.forEach(itme=>itme());
            }
        }
        try {
            fn(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }

    }
    then(fulfill, reject) {
        if (this.state === STATE.fulfilled) {
            fulfill(this.resolveValue)
        } else if (this.state === STATE.rejected) {
            reject(this.rejectValue)
        }else if(this.state ===STATE.pending){
            this.resolveQuence.push(()=>{
                fulfill(this.resolveValue)
            })

            this.rejectQuence.push(()=>{
                reject(this.rejectValue)
            })
        }
    }

}
```