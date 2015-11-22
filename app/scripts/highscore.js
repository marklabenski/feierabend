showHighscoreList();

function showHighscoreList () {

    //Test
    localStorage.setItem("1", "Mitarbeiter 5");
    localStorage.setItem("2", "Mitarbeiter 3");
    localStorage.setItem("3", "Mitarbeiter 3");
    localStorage.setItem("4", "Mitarbeiter 8");
    localStorage.setItem("5", "Mitarbeiter 2");
    localStorage.setItem("6", "Mitarbeiter 5");
    localStorage.setItem("9", "Mitarbeiter 3");
    localStorage.setItem("7", "Mitarbeiter 1");
    localStorage.setItem("8", "Mitarbeiter 5");
    localStorage.setItem("10", "Mitarbeiter 5");
    localStorage.setItem("11", "Mitarbeiter 1");
    //

    if(typeof(Storage) !== "undefined") {

        //Show #1
        if (localStorage.getItem("1") != null) {
            console.log(localStorage.getItem("1"));
            $("#mitarbeiter_des_monats-name").text(localStorage.getItem("1"));
        }
        else
            $("#mitarbeiter_des_monats-name").text("Niemand...");

    }
    else {
        console.log("Sorry! No Web Storage support..");
    }

    //Show #2 - #10
    for (var i = 2; i <= localStorage.length && i < 11 ; i++) {
        $("#der_rest-name ul").append("<li>"+"#"+i+" "+localStorage.getItem(i)+"</li>");
    }

    //Test-end
    localStorage.clear();
    //

}