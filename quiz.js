
//variables called to manipulate the html
var qBox = document.getElementById("qbox")
var qEl = document.getElementById("Qs")
var answerButtEl = document.getElementById("answerButt")
var shuffle, qIndex
var timerEL = document.getElementById('timer')
var secs = 0;
var initialInput = document.getElementById('highscore')
var userChoice
var scorino = 0
var scoreKeep = document.getElementById('score')
var playerScore = document.getElementById("player-score")
var scoreDis = document.getElementById('scoreDis')
var startButt = document.getElementById("starter")
var nextButt = document.getElementById("next")
var subButt = document.getElementById("submit")
var restartButt = document.getElementById('restart')
var ender  = document.getElementById("ender")

//these are my event listeners for my buttons to run specific functions on a click.
restartButt.addEventListener('click', restart)
subButt.addEventListener("click", subby)
startButt.addEventListener("click", begin)
nextButt.addEventListener('click', () => {
    //this function checks to see if the userChoice is correct. 
    //If it is then the timer will increase by 3 seconds, the score by 1, and the scoreKeep inner text will display the correct score
    //if qIndex is >= smartQs the game ends
    //else next q index ++
   if(userChoice === true) {
        secs += 3
        scorino ++
        scoreKeep.innerText ="Score: " + scorino;
    //if the answer is wrong the time is deducted by 5 seconds
   } else {
       secs -= 5
   }
    if(qIndex + 1 >= smartQs.length){
        endScreen()
        nextButt.classList.add('hide')
    }else{
        qIndex++
    
        nextQ()
    }
})

function endIt() {
    if(qIndex + 1 >= smartQs.length){
        endScreen()
       }
    
}
//displays score at the start
scoreKeep.innerText ="Score: " + scorino;

//sets the timer to 10 seconds
//timer is set to a function that takes the time and counts down by 1 every second
//if timer is 0 the game ends
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



//this function starts the game by hiding the start button and shows the qbox with a 'hide' class
//shuffle is the question selected with a math.Random function
//set the qIndex to 0
//nextQ function
function begin() {
    timer()
    startButt.classList.add('hide')
    shuffle = smartQs.sort(() => Math.random() - .7)
    qIndex = 0
    qBox.classList.remove('hide')
    nextQ()
    

}


//reset function
//showQ function that shuffles the qIndex as the parameter
function nextQ() {
    reset()
    showQ(shuffle[qIndex])
    
    
}


//this function uses the parameter question
//displays the question and answers via qEl.innerText
//forEach answer i created a button and assigned the 'butt' class 
//checks if the answer is correct
//selectAnswer function called on click
//appending the created buttons to the html
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


//reset used in nextQ
//hides next button with 'hide' class
//hides previous answers
function reset() {
    nextButt.classList.add('hide')
    while(answerButtEl.firstChild) {
        answerButtEl.removeChild(answerButtEl.firstChild)
    } 
}


//select target
//var correct is set to correct
//if var correct is anything other than true then userChoice is false
//else userChoice is true

function selectAnswer(select) {
    var selection = select.target
    var correct = selection.dataset.correct
    if(typeof correct === "undefined"){
        userChoice = false;
    } else {
        userChoice = true
    }
    //brings in the next button when a answer is selected
    if (shuffle.length > qIndex) {
        nextButt.classList.remove('hide')
    } 
    

}

//endScreen shows end screen and hides questions with a hide class
//displays score
function endScreen() {
        playerScore.innerText = "YOUR SCORE IS: " + scorino
        qBox.classList.add('hide')
        ender.classList.remove('hide')
}

//restart for event listener
//sets score & index to 0
//displays new score
//hides end screen and shows questions with class
function restart() {
    timer()
    scorino = 0
    scoreKeep.innerText ="Score: " + scorino;
    ender.classList.add('hide')
    qIndex = 0
    qBox.classList.remove('hide')
}

//this is the function for the submit listener
//calls createList and show showScores
function subby(){ 

    createList()

    showScores()
    
    
}


// var showIt is calls for input and score
//if statements grab and send the score and input to local storage 
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

// var smartQs = [
//     {
//         question: "What does HTML stand for?",
//         answers: [
//             { text:'Hypertext Markup Language', correct: true },
//             { text:'Hyperlink Type Multi Language', correct: false },
//             { text:'Hypertext Multi Language', correct: false },
//             { text:'Hyperlink Markup Language', correct: false },
//         ]

//     },

// ]