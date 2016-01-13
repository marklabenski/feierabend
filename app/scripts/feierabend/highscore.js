function showHighscoreList() {

    //Add highscores in List
    if (typeof localStorage["Feierabend_v0.1"] !== "undefined") {

        console.log(JSON.parse(localStorage['Feierabend_v0.1'])['gameState']);

        if (JSON.parse(localStorage['Feierabend_v0.1'])['gameState'] === "gameend") {

            var highscore_name = location.search.slice(11)
            var highscore_name_temp;
            var highscore_score = JSON.parse(localStorage['Feierabend_v0.1'])['score'];
            var highscore_score_temp;


            for (var i = 1 ; i <= 10 ; i++) {

                if (typeof localStorage[i] !== "undefined") {

                    if (highscore_score > JSON.parse(localStorage[i])[1]) {
                        highscore_name_temp = highscore_name;
                        highscore_score_temp = highscore_score;
                        highscore_name = JSON.parse(localStorage[i])[0];
                        highscore_score = JSON.parse(localStorage[i])[1];
                        localStorage[i] = JSON.stringify([highscore_name_temp, highscore_score_temp]);
                    }
                } else {
                    localStorage[i] = JSON.stringify([highscore_name, highscore_score]);
                    console.log(highscore_name,highscore_score);
                    break;
                }

            }
            localStorage.removeItem("Feierabend_v0.1");

        }
    }

    //Show #1
    if (localStorage.getItem("1") != null) {
        $("#mitarbeiter_des_monats-name").text(JSON.parse(localStorage[1])[0]);
        $("#mitarbeiter_des_monats-points").text(JSON.parse(localStorage[1])[1]);
    }
    else
        $("#mitarbeiter_des_monats-name").text("Niemand...");

    //Show #2 - #10
    for (var i = 2; i <= localStorage.length && i < 11; i++) {

        $("#der_rest-name table").append("<tr>" + "<td>#" + i + "</td><td>" + JSON.parse(localStorage[i])[0] + "</td><td>" + JSON.parse(localStorage[i])[1] + "</td></tr>");
    }

    //Test-end
    //

}