/*
Copyright 2017 William Rodriguez Calvo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var BitArray = require("./bitarray");
var Register = require("./register");

var Trivium = function () {

    var STATE_SIZE = 288;

    var S_START = 1;
    var S_END = 288;

    var R1_START = 1;
    var R1_END = 93;
    var R1_FILLSTART = 81;

    var R2_START = 94;
    var R2_END = 177;
    var R2_FILLSTART = 81; 

    var R3_START = 178;
    var R3_END = 288;
    var R3_FILLSTART_ZEROS = 1;
    var R3_FILLSTART_ONES = 109;

    var sharedState = new ArrayBuffer(STATE_SIZE);

    var s = new Register(sharedState, S_START, S_END);
    var r1 = new Register(sharedState, R1_START, R1_END);
    var r2 = new Register(sharedState, R2_START, R2_END);
    var r3 = new Register(sharedState, R3_START, R3_END);

    this.setup = function (key, iv) {

        r1.copyFromBytes(key);
        r1.fill(R1_FILLSTART, 0);

        r2.copyFromBytes(iv);
        r2.fill(R2_FILLSTART, 0);     

        r3.fill(R3_FILLSTART_ZEROS, 0);
        r3.fill(R3_FILLSTART_ONES, 1);

        for (var i = 0; i < 4 * STATE_SIZE; i++) {
            this.nextBit();
        }
    };

    this.nextBit = function () {

        var t1, t2, t3, zi;

        t1 = s.bit(66) ^ s.bit(93);
        t2 = s.bit(162) ^ s.bit(177);
        t3 = s.bit(243) ^ s.bit(288);

        zi = (t1 ^ t2) ^ t3;

        t1 ^= s.bit(91) & s.bit(92) ^ s.bit(171);
        t2 ^= s.bit(175) & s.bit(176) ^ s.bit(264);
        t3 ^= s.bit(286) & s.bit(287) ^ s.bit(69);

        r1.rotate(t3);
        r2.rotate(t1);
        r3.rotate(t2);

        return zi;
    };

   this.encode = function (input, debug) {

        var output = new Uint8Array(input.length);
        var bitArray = new BitArray();

        for (var i = 0; i < input.length; i++) {

            var inputBits = bitArray.fromByte(input[i]); 
            var outputBits = new Uint8Array(8);

            for (var j = 0; j < inputBits.length; j++) {
                outputBits[j] = inputBits[j] ^ this.nextBit();
            }

            output[i] = bitArray.toByte(outputBits);
        }

        return output;
    };

    this.debug = function (input, debug) {

        var output = new Uint8Array(input.length);
        var bitArray = new BitArray();

        console.log("Input\tInput bits\tKey bits\tChiper bitsOutput");

        for (var i = 0; i < input.length; i++) {

            var inputBits = bitArray.fromByte(input[i]); 
            var keyBits = new Uint8Array(8);
            var outputBits = new Uint8Array(8);

            for (var j = 0; j < inputBits.length; j++) {
                keyBits[j] = this.nextBit();
                outputBits[j] = inputBits[j] ^ keyBits[j];
            }

            output[i] = bitArray.toByte(outputBits);

            if (true){
                console.log("0x" + input[i].toString(16) + "\t" + inputBits + "\t" + keyBits + "\t" + outputBits + "\t" + "0x" + output[i].toString(16) );
            }

        }

        return output;
    };

};

module.exports = Trivium;