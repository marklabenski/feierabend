/**
 * User: Alexander
 * Date: 05.12.2015
 */

define(["vendor/jquery/jquery-2.1.4.min.js"], function () {
    var $scoreDiv = $("#score");
    var $stateDiv = $("#state");
    var score = 0;
    var steps = 0;
    var currentGettingValue = 1;
    var boniMaliValue = 0;
    var isBoniMali = false;

    var render = function render() {

        $scoreDiv.text("Score: " + score);

        if(isBoniMali) {

            if(boniMaliValue > 0) {
                $stateDiv.addClass("boni");
            } else {
                $stateDiv.addClass("mali");
            }

            $stateDiv.text("State: +" + currentGettingValue + " " + boniMaliValue);

            setTimeout(function () {
                $stateDiv.text("State: +" + currentGettingValue);
                $stateDiv.removeClass("boni");
                $stateDiv.removeClass("mali");
                isBoniMali = false;
            }, 2000);
        } else {
            $stateDiv.text("State: +" + currentGettingValue);
        }

    };

    var Score = {
        update: function update(updateAmount, isBoniMali_) {
            score += updateAmount;
            currentGettingValue = updateAmount;
            if(isBoniMali_) {
                boniMaliValue = updateAmount;
                isBoniMali = true;
            }
            render();
        },
        setScore: function setScore(_score) {
            score = _score;
            render();
        },
        getScore: function getScore() {
            return score;
        },
        doStep: function doStep() {
            steps++;
        }
    };
    return Object.create(Score);
});
