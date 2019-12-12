

// Populate high scores
(function populateHighScores() {

    // Remove previous entries
    $(".userScoreList").html("");

    const highScores = localStorage.getItem("quizHighScore");
    if(highScores !== null) {

        const arr = highScores.split(";");

        // Convert from string to an arr
        let newHighScores = arr.map( (item) => {

            const vals = item.split(":");
            return [vals[0], parseInt(vals[1])];
            
        });

        // sort the array
        const sortedArr = newHighScores.sort( (a, b) => b[1] - a[1]);
        
        // Add the items in the DOM
        sortedArr.forEach( (item) => {
            const str = `${item[0]} (${item[1]})`;
            const liItem = `<li>${str}</li>`;
            $(".userScoreList").append(liItem);
        });
    }
    // else {

    // }

})();

// Go to home
$("#back-to-home").on("click", goToHome);
function goToHome() {
    // Redirect to home page.
    window.location.href = "index.html";
};