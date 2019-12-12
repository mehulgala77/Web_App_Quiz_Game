
const CORRECT_ANS_ICON = `<i class="fas fa-check"></i>`;
const WRONG_ANS_ICON = `<i class="fas fa-times"></i> Game Over`;

// To load multiple dependent JS files.
$.when(
    $.getScript( "questionBank.js" ),
    $.getScript( "utility.js" )
).done(startGame);

// State Variables
let currentQuestionIndex = 0;
let userAnswer = null;
let score = 0;

// Starter fuction
function startGame() {
    // script is now loaded and executed.
    // put your dependent JS here.

    setNextQuestion(); // Set the first question

    // Listen for click on the answers.
    $(".choice-container").on("click", userChoice);

    // Listen for click on the next button.
    $("#next-btn").on("click", nextAction);
}

function setNextQuestion() { 

    const currentQuestion = questionBank.results[currentQuestionIndex];
    let answers = [...currentQuestion.incorrect_answers]
                        .concat(currentQuestion.correct_answer);

    // Set question title
    $(".question-title").text(currentQuestion.question);

    // Randomly shuffle the answers
    answers = shuffle(answers);

    // Set choices
    // Arrow function will return "this" as window.
    $(".choice-content").each( function (pos) {
        $(this).text(answers[pos]);
    } );    
}

function userChoice() {

    if (userAnswer !== null) return;

    const currentQuestion = questionBank.results[currentQuestionIndex]

    // Get user choice
    userAnswer = $(this).find(".choice-content").text(); 
    
    if(userAnswer === currentQuestion.correct_answer) {
        correctAnswerChecklist(this);
    }
    else {
        wrongAnswerChecklist(this);
    }
}

function correctAnswerChecklist(currElement) {

    // Change the background color of the option box.
    $(currElement).find(".choice-content").addClass("correct");

    // Display the correct icon.
    $(".result").html(CORRECT_ANS_ICON);
    $(".result").addClass("correct");

    // Update the score
    score += 10;
    $(".score-value").text(score);

    // Enable the next button
    $("#next-btn").removeClass("disabled");

    if(currentQuestionIndex === questionBank.results.length - 1) {
        $("#next-btn").text("Exit");
    }
}

function wrongAnswerChecklist(currElement) {  

    // Change the background color of the option box.
    $(currElement).find(".choice-content").addClass("wrong");

    // Display the wrong icon.
    $(".result").html(WRONG_ANS_ICON);
    $(".result").addClass("wrong");

    // Enable the next button
    $("#next-btn").removeClass("disabled");
    $("#next-btn").text("Exit");

    setTimeout( () => {
        // Store the score in the Session Storage
        sessionStorage.setItem("userscore", $(".score-value").text()) ;

        // Exit call. Redirect to home page.
        window.location.href = "exitpage.html";

    }, 1500);
}

function nextAction() {
    if ($(this).hasClass("disabled"))  return; 

    if ($(this).text() === "Next") {
        showNextQuestion();
    }
    else {
        // Exit call. Redirect to home page.
        window.location.href = "index.html";
    }
}

function showNextQuestion() {  
    cleanupOldQuestion();

    currentQuestionIndex++;
    setNextQuestion(currentQuestionIndex);
    updateProgress(currentQuestionIndex);

    $(".progress-board").text(`Question: ${currentQuestionIndex + 1} / 10`);
    userAnswer = null;
}

function cleanupOldQuestion() {
    $(".result").removeClass("correct");
    $(".choice-content").removeClass("correct");
}

function updateProgress(currentQuestionIndex){  
    const widthValue = `calc( (100% / 10) * ${currentQuestionIndex + 1})`;
    console.log(widthValue);
    $(".progress-bar").css("width", widthValue);
}