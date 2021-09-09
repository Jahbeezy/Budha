var startButt = document.getElementById("starter")
var nextButt = document.getElementById("next")
var qBox = document.getElementById("qbox")
var qEl = document.getElementById("Qs")
var answerButtEl = document.getElementById("answerButt")
var shuffle, qIndex
var ender  = document.getElementById("ender")
var timerEL = document.getElementById('timer')
var userChoice
var scoreKeep = document.getElementById('score')
var scorino = 0
var subButt = document.getElementById("submit")
var initialInput = document.getElementById('highscore')
var playerScore = document.getElementById("player-score")
var restartButt = document.getElementById('restart')
var scoreDis = document.getElementById('scoreDis')

restartButt.addEventListener('click', restart)
subButt.addEventListener("click", subby)
startButt.addEventListener("click", begin)
nextButt.addEventListener('click', () => {
   if(userChoice === true) {
        secs += 5
        scorino ++
        scoreKeep.innerText ="Score: " + scorino;
   } else {
       secs -= 5
   }
    qIndex++
    nextQ()
    
})


var secs = 0;

scoreKeep.innerText ="Score: " + scorino;


function timer() {
    secs = 10
    var timer = setInterval(function() {
        timerEL.innerText = "Time Left: " + secs;
        secs --;
        if (secs < 0) {
            clearInterval(timer);
            endScreen()
        }
    }, 1000)
}

function begin() {
    timer()
    startButt.classList.add('hide')
    shuffle = smartQs.sort(() => Math.random() - .5)
    qIndex = 0
    qBox.classList.remove('hide')
    nextQ()

}

function nextQ() {
    reset()
    showQ(shuffle[qIndex])
}

function showQ(question) {
    qEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add("butt")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        } 
        button.addEventListener('click', selectAnswer)
        answerButtEl.appendChild(button)
    })
}

function reset() {
    nextButt.classList.add('hide')
    while(answerButtEl.firstChild) {
        answerButtEl.removeChild(answerButtEl.firstChild)
    }
}



function selectAnswer(e) {
    var selection = e.target
    var correct = selection.dataset.correct
    if(typeof correct === "undefined"){
        userChoice = false;
    } else {
        userChoice = true
    }
    
    if (shuffle.length > qIndex + 1) {
        nextButt.classList.remove('hide')
    } 
    else {
        endScreen()
    }
}

function endScreen() {
        playerScore.innerText = "YOUR SCORE IS: " + scorino
        qBox.classList.add('hide')
        ender.classList.remove('hide')
}
function restart() {
    timer()
    scorino = 0
    scoreKeep.innerText ="Score: " + scorino;
    ender.classList.add('hide')
    shuffle = smartQs.sort(() => Math.random() - .5)
    qIndex = 0
    qBox.classList.remove('hide')
}


function subby(){ //needs work

    createList()

    showScores()
    // initialInput.disabled = true
    
}

function createList() {
    
    var showIt = {
        userName: initialInput.value,
        score: scorino,
    }

    if(localStorage.getItem('SCORE') === null) {
        var showItArray = [showIt]
        localStorage.setItem("SCORE", JSON.stringify(showItArray))

    } else {
        var localStuff = localStorage.getItem("SCORE")
        var localParse = JSON.parse(localStuff)
        localParse.push(showIt)
        localStorage.setItem("SCORE", JSON.stringify(localParse))
    }
    
}

function showScores() {
    var sb = JSON.parse(localStorage.getItem("SCORE"));
    if(sb !== null) {
        scoreDis.innerHTML = "";
        for(var i = 0; i < sb.length; i++) {
            var scoore = sb[i]
            var li = document.createElement('li')
            li.textContent = `${scoore.userName} score: ${scoore.score}`
            scoreDis.appendChild(li)
        }
    }
}


var smartQs = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text:'Hypertext Markup Language', correct: true },
            { text:'Hyperlink Type Multi Language', correct: false },
            { text:'Hypertext Multi Language', correct: false },
            { text:'Hyperlink Markup Language', correct: false },
        ]

    },
    {
        question: "Where would you place the <title> in your HTML?",
        answers: [
            { text:'<header>', correct: false},
            { text:'at the top of the <body>', correct: false},
            { text:'<head>', correct: true},
            { text:'either the <header> or <head>', correct: false},
        ]

    },
    {
        question: "Which of the four is not a HTML tag",
        answers: [
            { text:'<div>', correct: false},
            { text:'<par>', correct: true},
            { text:'<section>', correct: false},
            { text:'<form>', correct: false},
        ]

    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text:'Color Style Sheet', correct: false},
            { text:'Canvas Style Sheet', correct: false},
            { text:'Computer Style Sheet', correct: false},
            { text:'Cascading Style Sheet', correct: true},
        ]

    },
    {
        question: "What is the correct way to call the class 'box'?",
        answers: [
            { text:'#box{}', correct: false},
            { text:'.box[]', correct: false},
            { text:'.box{}', correct: true},
            { text:'#box[]', correct: false},
        ]

    },
    {
        question: "What is the pseudo class that can affect the style once clicked?",
        answers: [
            { text:'::after', correct: false},
            { text:':focus', correct: true},
            { text:':hover', correct: false},
            { text:':root', correct: false},
        ]

    },
    {
        question: "What does Math.floor() do?",
        answers: [
            { text:'Rounds down to the nearest whole number', correct: true},
            { text:'Sets the lowest value', correct: false},
            { text:'Prevents numbers from dropping below a set value', correct: false},
            { text:'rounds up to the nearest whole number', correct: false},
        ]

    },
    {
        question: "addEventListeners will not listen for: ",
        answers: [
            { text:'click', correct: false},
            { text:'type', correct: false},
            { text:'list', correct: true},
            { text:'mouseup', correct: false},
        ]

    },
    {
        question: "What is a Boolean statment",
        answers: [
            { text:'True or False', correct: true},
            { text:'Invalid', correct: false},
            { text:'Broken', correct: false},
            { text:'Undefined', correct: false},
        ]

    },
    {
        question: "Which selection is the correct way to delcare z equal to the addition of two other variables?",
        answers: [
            { text:'var z = a * b', correct: false},
            { text:'var y = z + x', correct: false},
            { text:'var z = a + b', correct: true},
            { text:'var z = 1 + 2', correct: false},
        ]

    }
]