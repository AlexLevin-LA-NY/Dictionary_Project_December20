const swup = new Swup()

$(document).ready(function() {

    var colorArray = ["#00BFFF", "#1E90FF", "#7FFFD4", "#20B2AA", "#0000FF", "#C0392B"];
    var cardState;
    var currentQuestion = 0;
    var qbank = new Array;

    loadDB();

    function loadDB() {
        $.getJSON("activity.json", function(data) {
                for (i = 0; i < data.questionlist.length; i++) {
                    qbank[i] = [];
                    qbank[i][0] = data.questionlist[i].cardfront;
                    qbank[i][1] = data.questionlist[i].cardback;
                } //for
                beginActivity();
            }) //gtjson
    } //loadDB

    function beginActivity() {
        cardState = 0;
        var color1 = colorArray[Math.floor(Math.random() * colorArray.length)];
        $("#cardArea").empty();
        $("#cardArea").append('<div id="card1" class="card">' + qbank[currentQuestion][0] + '</div>');
        $("#cardArea").append('<div id="card2" class="card">' + qbank[currentQuestion][1] + '</div>');
        $("#card1").css("background-color", color1);
        $("#card2").css("background-color", "#34495E");
        $("#card2").css("top", "200px");
        $("#cardArea").on("click", function() {
            if (cardState != 1) {
                cardState = 1;
                //togglePosition();
                $("#card1").animate({ top: "-=200" }, 150, function() {
                    cardState = 0;
                    togglePosition();
                });
                $("#card2").animate({ top: "-=200" }, 150, function() { togglePosition2(); });
            } //if
        }); //click function
        currentQuestion++;
        $("#buttonArea").empty();
        $("#buttonArea").append('<div id="nextButton">NEXT</div>');
        $("#nextButton").on("click", function() {
            if (currentQuestion < qbank.length) { beginActivity(); } else { displayFinalMessage(); }
        }); //click function
    } //beginactivity

    function togglePosition() {
        if ($("#card1").position().top == -200) { $("#card1").css("top", "200px"); };
    } //toggle

    function togglePosition2() {
        if ($("#card2").position().top == -200) { $("#card2").css("top", "200px"); };
    } //toggle2

    function displayFinalMessage() {
        $("#buttonArea").empty();
        $("#cardArea").empty();
        $("#cardArea").append('<div id="finalMessage">You have finished the activity.</div>');
    } //final message

});


// fetch("data0.json")
//     .then(response => response.json())
//     .then(data => {

//         document.querySelector("#debug").innerHTML = data.card


//     })

fetch('data0.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        appendData(data);
    })
    .catch(function(err) {
        console.log('error: ' + err);
    });

function appendData(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.innerHTML = '⚫' + data[i].firstName + ' ' + data[i].lastName;
        mainContainer.appendChild(div);
    }
}

//