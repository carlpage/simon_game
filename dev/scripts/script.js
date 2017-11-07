$(document).ready(function() {

    const sounds = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3","https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"];
    const red = $("#red");
    const green = $("#green");
    const blue = $("#blue");
    const yellow = $("#yellow");

    let sequence = [red, green, blue, yellow];

    function blink(selector) {
        $(selector).fadeTo("fast", 0.5).fadeTo("fast", 1);
    }

    $("#red").on("click", function() {
        blink("#red");
    });

    function start() {
        for (var i = 0; i <= sequence.length; i++) {
            console.log("yup");
            setTimeout(function (i) {
                blink(red);
            }(i), i * 1000) // immediately executes by calling it with fn(i)
        }
    }

    $("#start").on("click", function() {
        start();
    });



});