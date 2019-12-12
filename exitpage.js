
// Store the score in the Session Storage
const cachedScore = sessionStorage.getItem("userscore");
if (cachedScore !== null) {
    $(".score").text(cachedScore);
}

$(".username").on("keyup", handleUserInput);
$("#save").on("click", handleSaveScore);
$("#play-again").on("click", handlePlayAgain);
$("#back-to-home").on("click", handleBackToHome);

function handleUserInput() {  
    if($(this).val().length > 0) {
        $("#save").removeClass("disabled");
    }
    else {
        $("#save").addClass("disabled");
    }
}

function handleSaveScore() {  
    if ($("#save").hasClass("disabled")) return;

    let highScores = localStorage.getItem("quizHighScore");
    if(highScores === null) {

        const score = $(".username").val() + ":" + $(".score").text();
        localStorage.setItem("quizHighScore", `${score}`);

    }
    else {
        const arr = highScores.split(";");
        let found = false;

        let newHighScores = arr.map( (item) => {

            let vals = item.split(":");
            if(vals[0].toLowerCase() === $(".username").val().toLowerCase()) {
                found = true;
                if (parseInt(vals[1]) < parseInt($(".score").text())) {
                    return `${vals[0]}:${$(".score").text()}`;
                }
            }  
            return item;

        }).join(";");

        if (found === false) {
            let currUserScore = ";" + $(".username").val() + ":" + $(".score").text();
            newHighScores += currUserScore;
        }

        localStorage.setItem("quizHighScore", newHighScores);        
    }
}

function handlePlayAgain() {
    setTimeout( () => {
        // Store the score in the Session Storage
        sessionStorage.setItem("userscore", "0") ;

        // Exit call. Redirect to home page.
        window.location.href = "game.html";

    }, 500);
}

function handleBackToHome() {
    setTimeout( () => {
        // Store the score in the Session Storage
        sessionStorage.setItem("userscore", "0") ;

        // Exit call. Redirect to home page.
        window.location.href = "index.html";

    }, 1000);
}