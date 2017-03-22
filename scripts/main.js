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

//
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

function encode(key, vi, message){

    var trivium = new Trivium();   
    var utils = new Utils();

    var keyArray = utils.stringToASCII(key);
    var viArray = utils.stringToASCII(vi);
    var messageArray = null;   

    if ($("#ishex").prop("checked")){
        messageArray = utils.hex2ASCII(message);
    }else{
        messageArray = utils.stringToASCII(message);
    }    

    trivium.setup(keyArray, viArray);

    var result = trivium.encode(messageArray);

    $("#asciiresult-text").val(utils.ASCIIToString(result));
    $("#hexadecimalresult-text").val(utils.ASCIIToHex(result));    
}

window.onload = function () {

    $( "#download-ascii" ).click(function() {
        makeTextFile($("#asciiresult-text").val());
    });

    $( "#download-hexadecimal" ).click(function() {
        makeTextFile($("#hexadecimalresult-text").val());
    });

    $( "#encode").click(function() {

        var key = $("#key").val();
        var vi = $("#vi").val();
        var file = document.querySelector("input[type=file]").files[0];
        var message = $("#source-text").val();

        if (key ===  undefined || key === null || key === "" || key.length !== 10){
            alert("Please specify a key with 10 characters");
            return;
        }

        if (vi ===  undefined || vi === null || vi === "" || vi.length !== 10){
            alert("Please specify a vi with 10 characters");
            return;            
        }

        if (file !== undefined){

            var reader  = new FileReader();

            reader.addEventListener("load", function () {
                encode(key, vi, reader.result);
            }, false);

            if (file) {
                reader.readAsText(file);
            }                
            
        }else{
            encode(key, vi, message);
        }

    });
};