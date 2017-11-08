$(document).ready(() => {

    let sequence = [];
    let userClicks = [];

    const sounds = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3", "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3", "https://actions.google.com/sounds/v1/cartoon/tympani_bing.ogg"];
    const redSound = new Audio(sounds[0]);
    const blueSound = new Audio(sounds[1]);
    const yellowSound = new Audio(sounds[2]);
    const greenSound = new Audio(sounds[3]);
    const errorSound = new Audio(sounds[4]);

    const red = "red";
    const green = "green";
    const blue = "blue";
    const yellow = "yellow";
    const colors = [red, green, yellow, blue];
    let color;

    $("#reset").on("click", () => {
        $("#counter").html("<p>0</p>");
        sequence = [];
        userClicks = [];
    });

    $("#start").on("click", () => {
        $("#counter").html("<p>0</p>");
        sequence = [];
        userClicks = [];
        start();
    });

    function randomNum() {
        return Math.floor(Math.random() * 4);
    }

    function start() {
        
        function addToSequence() {
            sequence.push(colors[randomNum()]);
        }

        function displaySequence() {
            $("#counter").html("<p>" + sequence.length + "</p>");
            let j = 0;

            console.log(sequence);
            blinkSequence(sequence[0]);

            function blinkSequence(color) {
                setTimeout(() => {

                    console.log(color);
                    playSound(color);

                    $("#" + color).fadeTo("fast", 0.5).fadeTo("fast", 1);

                    if (j < sequence.length) {
                        j++;
                        console.log(j);
                        console.log(sequence[j]);
                        blinkSequence(sequence[j]);
                    }
                }, 1000);

            } // end blinkSequence
        } // end displaySequence

        function playSound(color) {
            if (color === red) {
                redSound.play();
            }
            if (color === green) {
                greenSound.play();
            }
            if (color === blue) {
                blueSound.play();
            }
            if (color === yellow) {
                yellowSound.play();
            }
        }

        function checkIfCorrect(sequence, userClicks) {
            for (let i = sequence.length; i--;) {
                console.log("here", i);
                if (sequence[i] !== userClicks[i]) {
                    $("#counter").html("<p>00</p>");
                    return false;
                }
            }
            return true;
        }

        addToSequence();
        displaySequence();

        // cannot use an es6 arrow function, because I need to use this.
        $(".button").on("click", function () {
            playSound(this.id);
            $(this).fadeTo("fast", 0.5).fadeTo("fast", 1);
            userClicks.push(this.id);
            let i = 0;
            console.log(userClicks, sequence);
            for (let i in userClicks) {
                if (sequence[i] !== userClicks[i]) {
                    console.log("Nope!");
                    errorSound.play();
                    userClicks = [];
                    setTimeout(() => {
                        displaySequence();
                    }, 2000);
                } // end conditional
                i++;
            } // end loop
            if (sequence.length === userClicks.length) {
                checkIfCorrect(sequence, userClicks);
                userClicks = [];
                addToSequence();
                setTimeout(() => {
                    displaySequence();
                }, 2000);
            } // end conditional
        }); // end button on click

    } // end start function

});