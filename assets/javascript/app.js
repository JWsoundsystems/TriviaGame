var quizSurvey = document.getElementById('quiz');
var resultOutput = document.getElementById('results');
var submitButton = document.getElementById('submit');
var startButton = document.getElementById('start');

const output = [];
let questionNumber = -1

var number = 30;
var intervalId;
let score = 0



$("#quiz").hide(stop);

$("#start").click()
$("#startButton").click(function () {
console.log('click');
$("#startButton").hide(startButton);
$("#startTitle").hide();
$("#quiz").show();
run();

})



$("#quiz").click()
$("#submit").click(function () {
    console.log('click')
})
const myQuestions = [{
        question: "Who is the strongest?",
        answers: {
            a: "Superman",
            b: "Spiderman",
            c: "Hulk"
        },
        correctAnswer: "c",
        images: "Hulk.jpg",
    },
    {
        question: "What is Spidermans real name",
        answers: {
            a: "Clark Kent",
            b: "Dave Dennison",
            c: "Peter Parker"
        },
        correctAnswer: "c",
        images: "Spider.jpg",
    },
    {
        question: "Where is Prince from?",
        answers: {
            a: "California",
            b: "Kansas",
            c: "New York",
            d: "Minnesota"
        },
        correctAnswer: "d",
        images: "Prince.jpg",
    }

];

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    $("#display").html(`<div> ${number} seconds remaining</div>`);
    number--;

    if (number === -1) {
        stop();
        $("#result").html("Times Up, You Lose!");
        decider(true);
    }
}

function stop() {
    clearInterval(intervalId);
}



function buildQuiz() {

    myQuestions.forEach(
        (currentQuestion, questionNumber) => {
            const answers = [];
            for (letter in currentQuestion.answers) {

                answers.push(
                    `<label>
                    <input class="gfy" type="radio" name="question${questionNumber}" value="${letter}">${letter} : ${currentQuestion.answers[letter]}
                    </label></br>`
                );

            }

            output.push(
                `<div class="question"> ${currentQuestion.question} </div>
                <div class="answers"> ${answers.join('')} </div>
                <button id="button" value=${currentQuestion.correctAnswer}>submit</button>`
            );

        }

    );

}

// display quiz right away
let choice;
let image;
buildQuiz();

function happy() {
    questionNumber++;
    $("#result").empty();
    $("#image").empty();

    if (typeof myQuestions[questionNumber] === "undefined" && score === 3) {
        let html = `<div>You scored ${score} out of 3 trivia questions correctly!</div><br><div>Please Refresh this page to play again!<div>`
        image = `<img id="image" src="assets/images/trophy.jpg"/>`
        $("#result").html(html);
        $("#image").html(image);
        $("#quiz").hide(html);
        $("#title").hide(html);
        $("#top").hide(html);
        $("#display").hide(html);
    }  else if (typeof myQuestions[questionNumber] === "undefined" && score <= 2) {
        let html = `<div>You scored ${score} out of 3 trivia questions correctly!</div><br><div>Please Refresh this page to play again!<div>`
        image = `<img id="image" src="assets/images/Lose.png"/>`
        $("#result").html(html);
        $("#image").html(image);
        $("#quiz").hide(html);
        $("#title").hide(html);
        $("#top").hide(html);
        $("#display").hide(html);
    }   else {
        image = `<img id="image" src="assets/images/${myQuestions[questionNumber].images}"/>`
        run();
        $("#quiz").html(output[questionNumber]);
        $(".gfy").click(function () {
            choice = $(this).val();
        })
        $("#button").click(function () {
            // console.log(choice === correct)
            decider();
            stop();
        })
    }
}

happy();

function decider(isTimeUp = false) {
    let correct = myQuestions[questionNumber].correctAnswer
    console.log(choice);
    if (choice === correct) {
        $("#result").html("You are Correct!");
        $("#image").html(image);
        score++;
    } else {
        $("#result").html("You are Incorrect!");
    }
    if (isTimeUp) {
        $("#result").html("Times Up, you lose!")
    }

    setTimeout(happy, 2000);
    number = 30;
}