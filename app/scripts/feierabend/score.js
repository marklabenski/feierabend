/**
 * User: Alexander
 * Date: 05.12.2015
 */

define([], function () {
    var scoreDiv = document.querySelector("#score");
    var score = 0;
    var steps = 0;

    var render = function render() {
        scoreDiv.innerHTML = score;
    };

    var Score = {
        update: function update(updateAmount) {
            score += updateAmount;
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
