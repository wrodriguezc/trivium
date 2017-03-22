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