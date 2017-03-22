var Utils = function () {

    this.hex2string = function (hexx) {

        var hex = hexx.toString();
        var str = "";

        for (var i = 0; i < hex.length; i += 2) {
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }

        return str;
    };

    this.hexformatedString = function (hexx) {
        var hex = hexx.toString();
        var str = "";
        for (var i = 0; i < hex.length; i += 2) {
            str += "0x" + hex.substr(i, 2) + ",";
        }
        return str;
    };

    this.stringToHex = function (string) {
        var str = "";
        for (var i = 0; i < string.length; i++) {
            str += string.charCodeAt(i).toString(16);
        }
        return str;
    };

    this.stringToFormatedHex = function (string) {
        var str = "";
        for (var i = 0; i < string.length; i++) {
            str += "0x" + string.charCodeAt(i).toString(16) + ",";
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

    this.ASCIIToHex= function (chars) {
        var string = "";
        for (var i = 0; i < chars.length; i++) {
            string += chars[i].toString(16);
        }
        return string;
    };

    this.hex2ASCII = function (hexx) {
        
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