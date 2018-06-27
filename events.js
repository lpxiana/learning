var P = function() {
    this._events = {};
}

P.prototype.on = function(eventname, callback) {
    if (this._events[eventname]) {
        this._events[eventname].push(callback);
    } else {
        this._events[eventname] = [callback];
    }
}

P.prototype.emit = function(eventname) {
    let _self = this;
    let args = Array.prototype.slice.call(arguments, 1);
    _self._events[eventname].forEach(element => {
        if (element) {
            element.apply(_self, args);
        }
    });
}

P.prototype.once = function(evname, callname) {
    let _self = this;
    let onceback = function() {
        callname.apply(this, arguments);
        _self.removeListener(evname, onceback)
    };
    _self.on(evname, onceback);
}

P.prototype.removeListener = function(eventname, callname) {
    let _self = this;
    let callbackname = callname;
    if (typeof callbackname != 'string') {
        callbackname = callbackname.name;
    }
    _self._events[eventname].forEach((ele, index, arr) => {
        if (ele.name == callbackname) {
            arr.splice(index, 1);
        }
    })
}

P.prototype.removeAllListeners = function(evname) {
    let _self = this;
    if (!evname) {
        let keys = Object.keys(_self._events);
        keys.forEach(ele => {
            _self._events[ele] = [];
        })
    } else {
        _self._events[evname] = [];
        return this
    }
}

var event = new P();

let a1 = function(a1) {
    console.log('111' + a1)
}

let a2 = function(a1, a2) {
    console.log('222' + a1 + a2);
}

event.once('data', a1)

//event.on('data1', a2)

//event.on('data2', a2)

// event.removeListener('data', 'a2');
// event.removeAllListeners('data').removeAllListeners('data1').removeAllListeners('data2');

event.emit('data');
//event.emit('data1');
//event.emit('data2');