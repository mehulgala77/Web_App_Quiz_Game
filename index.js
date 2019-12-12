
// If session storage has a category listed, then set it.
(function selectCachedCategory() {
    const userChosenCategory = sessionStorage.getItem("quiz-category");

    if (userChosenCategory !== null) {

        const activeCategorySelector = `[data-code="${userChosenCategory}"`;
        $(activeCategorySelector).addClass("active");
        $("#play").removeClass("disabled");
    }

})();

$("[data-code]").on("click", chooseCategory);
function chooseCategory() {
    $("#play").removeClass("disabled");
    $("[data-code]").removeClass("active");
    $(this).addClass("active");
}

$("#play").on("click", storeCategory);
function storeCategory() {
    sessionStorage.setItem("quiz-category", $("[data-code].active").attr("data-code"));
}