class Interval {
    interValId = 0;

    setIntervalCustomer(fn, time) {
        if (this.interValId) {
            clearInterval(this.interValId);
        }
        this.interValId = setInterval(function () {
            fn();
        }, time);

        return this.interValId
    }

    clearInterValCustomer(id){
        if (this.interValId) {
            clearInterval(this.interValId);
        }
        if (id) {
            clearInterval(id);
        }
    }
}

const interVal = new Interval()
export default interVal;