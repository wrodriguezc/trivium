(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
Copyright 2017 William Rodriguez Calvo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var BitArray = function () {

    var BIG_ENDIAN = true;

    this.fromBytes = function (source) {

        var result = new Uint8Array(source.length * 8);

        for (var i = 0; i < source.length; i++) {

            if (BIG_ENDIAN) {
                result[(i * 8) + 0] = (source[i] & 0x80) >>> 7;
                result[(i * 8) + 1] = (source[i] & 0x40) >>> 6;
                result[(i * 8) + 2] = (source[i] & 0x20) >>> 5;
                result[(i * 8) + 3] = (source[i] & 0x10) >>> 4;
                result[(i * 8) + 4] = (source[i] & 0x08) >>> 3;
                result[(i * 8) + 5] = (source[i] & 0x04) >>> 2;
                result[(i * 8) + 6] = (source[i] & 0x02) >>> 1;
                result[(i * 8) + 7] = source[i] & 0x01;                
            } else {
                result[(i * 8) + 0] = source[i] & 0x01;
                result[(i * 8) + 1] = (source[i] & 0x02) >>> 1;
                result[(i * 8) + 2] = (source[i] & 0x04) >>> 2;
                result[(i * 8) + 3] = (source[i] & 0x08) >>> 3;
                result[(i * 8) + 4] = (source[i] & 0x10) >>> 4;
                result[(i * 8) + 5] = (source[i] & 0x20) >>> 5;
                result[(i * 8) + 6] = (source[i] & 0x40) >>> 6;
                result[(i * 8) + 7] = (source[i] & 0x80) >>> 7;
            }
        }

        return result;
    };

    this.fromByte = function (byte) {

        var result = new Uint8Array(8);

        if (BIG_ENDIAN) {
            result[0] = (byte & 0x80) >>> 7;
            result[1] = (byte & 0x40) >>> 6;
            result[2] = (byte & 0x20) >>> 5;
            result[3] = (byte & 0x10) >>> 4;
            result[4] = (byte & 0x08) >>> 3;
            result[5] = (byte & 0x04) >>> 2;
            result[6] = (byte & 0x02) >>> 1;
            result[7] = byte & 0x01;            
        } else {
            result[0] = byte & 0x01;
            result[1] = (byte & 0x02) >>> 1;
            result[2] = (byte & 0x04) >>> 2;
            result[3] = (byte & 0x08) >>> 3;
            result[4] = (byte & 0x10) >>> 4;
            result[5] = (byte & 0x20) >>> 5;
            result[6] = (byte & 0x40) >>> 6;
            result[7] = (byte & 0x80) >>> 7;
        }

        return result;
    };

    this.toByte = function (array) {

        var byte = 0;

        if (BIG_ENDIAN) {

            byte =  array[0] * 0x80 + 
                    array[1] * 0x40 +
                    array[2] * 0x20 +
                    array[3] * 0x10 +
                    array[4] * 0x08 +
                    array[5] * 0x04 +
                    array[6] * 0x02 +
                    array[7] * 0x01;  
        }else{

            byte =  array[0] * 0x01 + 
                    array[1] * 0x02 +
                    array[2] * 0x04 +
                    array[3] * 0x08 +
                    array[4] * 0x10 +
                    array[5] * 0x20 +
                    array[6] * 0x40 +
                    array[7] * 0x80;          
        }

        return byte;
    };
};

module.exports = BitArray;
},{}],2:[function(require,module,exports){
/* global $ */
/* global alert */
/* global document */
/* global FileReader */
/* global Blob */
/*
Copyright 2017 William Rodriguez Calvo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
var Trivium = require("./trivium");
var Utils = require("./utils");
var Localization = {};

// Function obtained from http://stackoverflow.com/questions/31048215/how-to-create-txt-file-using-javascript-html5
function makeTextFile (text) {

    var data = new Blob([text], {type: "text/plain"});
    var a = document.createElement("a");

    document.body.appendChild(a);
    a.style = "display: none";    
    var url = window.URL.createObjectURL(data);
    a.href = url;
    a.download = "encoded.txt";
    a.click();
    window.URL.revokeObjectURL(url);
}

function encode(key, iv, message){

    var trivium = new Trivium();   
    var utils = new Utils();

    var keyArray = utils.stringToASCII(key);
    var ivArray = utils.stringToASCII(iv);
    var messageArray = null;   

    if ($("#ishex").prop("checked")){
        messageArray = utils.hexToASCII(message);
    }else{
        messageArray = utils.stringToASCII(message);
    }    

    trivium.setup(keyArray, ivArray);

    var result = trivium.encode(messageArray);

    $("#asciiresult-text").val(utils.ASCIIToString(result));
    $("#hexadecimalresult-text").val(utils.arrayToHex(result));    
}

window.onload = function () {

    if ($("#language").val() === "en"){
        Localization.KeyError = "Please specify a 10 character key";
        Localization.IVError = "Please specify a 10 character iv";       
    }else{
        Localization.KeyError = "Por favor especifique una llave de exactamente 10 caracteres";
        Localization.IVError = "Por favor especifique un vector de inicialización de exactamente 10 caracteres";        
    }

    $( "#download-ascii" ).click(function() {
        makeTextFile($("#asciiresult-text").val());
    });

    $( "#download-hexadecimal" ).click(function() {
        makeTextFile($("#hexadecimalresult-text").val());
    });

    $( "#encode").click(function() {

        var key = $("#key").val();
        var iv = $("#iv").val();
        var file = document.querySelector("input[type=file]").files[0];
        var message = $("#source-text").val();

        if (key ===  undefined || key === null || key === "" || key.length !== 10){
            alert(Localization.KeyError);
            return;
        }

        if (iv ===  undefined || iv === null || iv === "" || iv.length !== 10){
            alert(Localization.IVError);
            return;            
        }

        if (file !== undefined && file !== null){

            var reader  = new FileReader();

            reader.addEventListener("load", function () {
                encode(key, iv, reader.result);
            }, false);

            if (file) {
                reader.readAsText(file);
            }                
            
        }else{
            encode(key, iv, message);
        }

    });
};
},{"./trivium":4,"./utils":5}],3:[function(require,module,exports){
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
},{"./bitarray":1}],4:[function(require,module,exports){
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

        zi = t1 ^ t2 ^ t3;

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
        var outputBits = new Uint8Array(8);

        for (var i = 0; i < input.length; i++) {

            var inputBits = bitArray.fromByte(input[i]); 

            for (var j = 7; j >= 0; j--) {
                outputBits[j] = inputBits[j] ^ this.nextBit();
            }

            output[i] = bitArray.toByte(outputBits);
        }

        return output;
    };

    this.debug = function (input) {

        var output = new Uint8Array(input.length);
        var bitArray = new BitArray();
        var outputBits = new Uint8Array(8);
        var keyBits = new Uint8Array(8);

        console.log("Input\tInput bits\tKey bits\tChiper bitsOutput");

        for (var i = 0; i < input.length; i++) {

            var inputBits = bitArray.fromByte(input[i]); 

            for (var j = 7; j >= 0; j--) {
                keyBits[j] = this.nextBit();
                outputBits[j] = inputBits[j] ^ keyBits[j];
            }

            output[i] = bitArray.toByte(outputBits);

            console.log("0x" + input[i].toString(16) + "\t" + inputBits + "\t" + keyBits + "\t" + outputBits + "\t" + "0x" + output[i].toString(16) );

        }

        return output;
    };

};

module.exports = Trivium;
},{"./bitarray":1,"./register":3}],5:[function(require,module,exports){
/*
Copyright 2017 William Rodriguez Calvo

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var Utils = function () {

    this.arrayToHex = function (array) {
        var str = "";
        for (var i = 0; i < array.length; i++) {
            str += array[i] <= 15 ? "0" + array[i].toString(16) : array[i].toString(16);
        }
        return str;
    };

    this.stringToASCII = function (string) {
        var chars = new Uint8Array(string.length);
        for (var i = 0; i < string.length; i++) {
            chars[i] = string.charCodeAt(i);
        }
        return chars;
    };

    this.ASCIIToString = function (chars) {
        var string = "";
        for (var i = 0; i < chars.length; i++) {
            string += String.fromCharCode(chars[i]);
        }
        return string;
    };

    this.hexToASCII = function (hexx) {
        
        var chars = new Uint8Array(hexx.length / 2);
        var hex = hexx.toString();
        var charIndex = 0;

        for (var i = 0; i < hex.length; i += 2) {
            chars[charIndex] = parseInt(hex.substr(i, 2), 16);
            charIndex++;
        }
        return chars;
    };

};

module.exports = Utils;
},{}]},{},[2])