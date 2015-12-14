function showHighscoreList () {

    //Test
    localStorage["1"] = JSON.stringify(["8Zeichen", 27364]);
    localStorage["2"] = JSON.stringify(["mindest.", 22339]);
    localStorage["3"] = JSON.stringify(["sonst", 18331]);
    localStorage["4"] = JSON.stringify(["geht die", 16276]);
    localStorage["5"] = JSON.stringify(["Schrift", 15783]);
    localStorage["6"] = JSON.stringify(["über das", 10231]);
    localStorage["7"] = JSON.stringify(["das", 6032]);
    localStorage["8"] = JSON.stringify(["Schild", 2391]);
    localStorage["9"] = JSON.stringify(["hinaus", 673]);
    localStorage["10"] = JSON.stringify(["WAS GEHT", 562]);
    //

    //Show #1
    if (localStorage.getItem("1") != null) {
        console.log(localStorage.getItem("1"));
        $("#mitarbeiter_des_monats-name").text(JSON.parse(localStorage[1])[0]);
        $("#mitarbeiter_des_monats-points").text(JSON.parse(localStorage[1])[1]);
    }
    else
        $("#mitarbeiter_des_monats-name").text("Niemand...");

    //Show #2 - #10
    for (var i = 2; i <= localStorage.length && i < 11 ; i++) {
        console.log(localStorage.getItem(i));
        $("#der_rest-name table").append("<tr>"+"<td>#"+i+"</td><td>"+JSON.parse(localStorage[i])[0]+"</td><td>"+JSON.parse(localStorage[i])[1]+"</td></tr>");
    }

    //Test-end
    //

}


