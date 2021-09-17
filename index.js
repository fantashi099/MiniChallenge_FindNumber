function initialize() {
    var score = 0;
    const array = Array.from({length: 100}, (_, i) => i + 1);
    var gameplay = document.getElementById('gameplay').getBoundingClientRect();
    var width = gameplay.width;
    var height = gameplay.height;

    const new_pos = random_position(width,height, array.length);

    count = 1;
    array.forEach((num, index) => {

        var element = document.createElement("div");
        element.innerHTML = num;
        element.classList.add("new_pos");
        element.style.top = Math.floor(new_pos[index]['y0']) + "px";
        element.style.left = Math.floor(new_pos[index]['x0']) + "px";
    
        element.onclick = function() {
            if (count === array.length) {
                alert("Welldone!!! Score: " + String(score));
                saveScore(score);
                gameFlag = 0;
            }

            if (this.innerHTML === String(count)) {
                score += 100;
                element.style.color = "#5DC8CD";
                count++;
            } else {
                score -= 40;
                alert('Oops!!! Wrong number, current number is: ' + String(count));
            }
        }
    
        var numID = "num" + String(index);
        element.setAttribute('id',numID);
    
        document.getElementById('gameplay').appendChild(element);
    });

    window.onload = function () {
        var timer = 60 * 5, minutes, seconds;
        var display = document.querySelector('#time');
        var displayScore = document.querySelector('#currentScore');
        var timeclock = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
            displayScore.textContent = score;
            score -= 10
    
            if (--timer < 0) {
                alert('Time out, current score: ' + String(score));
                saveScore(score);
                var elements = document.getElementsByClassName('new_pos');
                for (var index = 0; index < elements.length; index++) {
                    elements[index].onclick = function() {
                        return false;
                    };
                }
                clearInterval(timeclock);
            }
        }, 1000);
    };
}

window.addEventListener("keydown",function (e) {
    if (e.keyCode === 114 || (e.ctrlKey && e.keyCode === 70)) { 
        e.preventDefault();
    }
});
initialize();

function random_position(width, height, len) {
    var selected = [];
    
    for (var i=0; i<len; i++) {
        while (true) {
            var x0 = Math.floor(Math.random() * (width - 50));
            var y0 = Math.floor(Math.random() * (height - 50));
            var x1 = x0 + 50;
            var y1 = y0 + 50;
            var i = 0;
            while (i < selected.length &&
                   (x0 >= selected[i].x1 ||
                    y0 >= selected[i].y1 ||
                    x1 <= selected[i].x0 ||
                    y1 <= selected[i].y0)) {
                i++;
            }
            if (i == selected.length) {
                selected.push({x0:x0, y0:y0, x1:x1, y1:y1});
                break;
            }
        }
    }
    return selected
}

function saveScore(score) {
    if (typeof(Storage) !== "undefined") {
        const highestScore = localStorage.getItem('highestScore');
        if (highestScore !== null) {
            if (highestScore < score) {
                localStorage.setItem('highestScore', String(score));
            }
        } else {
            localStorage.setItem('highestScore', String(score));
        }
    }
}