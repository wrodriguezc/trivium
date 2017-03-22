/*
Copyright 2017 William Rodriguez Calvo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var BitArray = require("./bitarray");

var Register = function (buffer, start, end) {

    var state = new Uint8Array(buffer, start - 1, end - start + 1);

    this.fill = function (start, value) {
        state.fill(value, start - 1);
    };

    this.bit = function (position) {
        return state[position - 1];
    };

    this.rotate = function (value) {

        for (var i = state.length; i > 1; i--) {
            state[i - 1] = state[i - 2];
        }

        if (value !== undefined) {
            state[0] = value;
        } else {
            state[0] = 0;
        }
    };

    this.copyFromBytes = function (source) {

        var bitArray = new BitArray();
        var bits = bitArray.fromBytes(source);

        for (var i = 0; i < bits.length; i++) {
            state[i] = bits[i];
        }
    };

    this.debug = function () {

        var bitString = "";

        for (var i = 0; i < state.length; i++) {
            bitString += state[i];
        }

        console.log(bitString);
    };
};

module.exports = Register;