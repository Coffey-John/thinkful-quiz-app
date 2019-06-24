let curScore = 0;
let curQuestion = -1;

const questionSet = [
  { 
    text: `There is a safe house but you have to cross a long street with hundreds of zombies on it, what's the best course of action?`,
    ans1: `Try to sneak past the zombies and only kill the ones that see you`,
    ans2: `Hot wire a car and plow through them to get to the other side`,
    ans3: `Run straight through them with your weapon and hope you get to the other side in time`,
    ans4: `Take out the zombies one by one being as stealthy as possible`
  },

  {
    text: `What is the safest place to stay during the apocalypse?`,
    ans1: `In my house. I already have a food stash and weapons to protect myself with`,
    ans2: `Inside a grocery store or mall, which will have unlimited supplies and weapons to sustain myself`,
    ans3: `At the police station. More weapons than anywhere else as well as people who know how to fight`,
    ans4: `A hospital, they might have a cure to the zombie virus`
  },

  {
    text: `You are about to escape the zombie infected city by bridge, but the military starts to bomb it to quarantine it, what do you do?`,
    ans1: `Hunker down and stay in the city to fend for yourself`,
    ans2: `Try to swim across the 1 mile river to safety`,
    ans3: `Try to run across the bridge before it's completely destroyed`,
    ans4: `Send out an SOS flare to try to get them to stop the bombing`
  }, 
  {
    text: `You're being chased by a horde of zombies and you are about to enter the safe room, but realize one of the zombies chasing you is your best friend. What do you do?`,
    ans1: `Try to take him into the safe room with you while you look for a possible cure`,
    ans2: `Lock yourself in the safe room, there's no reasoning with him and he might infect you as well`,
    ans3: `Try to take out the rest of the zombies to save your friend`,
    ans4: `Hug your friend and try to get him to snap out of it so he can tell the rest of the zombies to leave you alone`
  }, 
  {
    text: `You're on your way to a rescue zone but your car runs out of gas. The next gas station is 7 miles and the rescue zone is 50 miles away. What do you do?`,
    ans1: `Walk 7 miles to the gas station on foot to get gas and then go back to fill your car`,
    ans2: `Resolve to run the remaining 50 miles (2 marathons) and not stop until you make it to the rescue zone`,
    ans3: `Try to hot wire another car without setting off its alarm`,
    ans4: `Head back to the closest city and come up with another plan`
  }
];

const ANSWERS = [ 
  `Try to sneak past the zombies and only kill the ones that see you.<br>Attracting attention to yourself is never a good idea during a zombie outbreak.`, 
  `Inside a grocery store or mall, which will have unlimited supplies and weapons to sustain myself.<br>For long term survival, food and barricading supplies are a necessity.`, 
  `Try to swim across the 1 mile river to safety.<br>Even though it might be difficult, securing your own survival and not counting on anyone else is the best option.`, 
  `Lock yourself in the safe room, there's no reasoning with him and he might infect you as well.<br>Until a cure is discovered and you are safe, you have to make sure you survive.`, 
  `Try to hot wire another car without setting off its alarm.<br>Unless you are with other survivors who have a car, it's important to get to the rescue zone ASAP.`,
];

// rendering functions that update the HTML according to the state stored in javascript

function renderStartScreen() {
	$("main").html(`
	<div class="menuScreen">
		<h1>Will you survive the zombie apocalypse, or will you become one of them?</h1>
		<button type="button" class="startButton">Let's find out!</button>
	</div>
	`)
}

function renderQuestion() {
	let question = getCurQuestion();
	
	$("main").html(`
	<div class="questionScreen">
		<h1>${question.text}</h1>
		<form class="questionForm">
			<fieldset>
				<label>
					<input type="radio" value="${question.ans1}" name="answer" required>
					${question.ans1}
				</label>
				<label>
					<input type="radio" value="${question.ans2}" name="answer" required>
					${question.ans2}
				</label>
				<label>
					<input type="radio" value="${question.ans3}" name="answer" required>
					${question.ans3}
				</label>
				<label>
					<input type="radio" value="${question.ans4}" name="answer" required>
					${question.ans4}
				</label>
			</fieldset>
			
			<button type="submit">SUBMIT</button>
		</form>
	</div>
	`)
}

function renderAnswer(answer, isCorrect) {
	$("main").html(`
	<div class="answerRightScreen">
		<h1>${isCorrect? "Correct!" : "Wrong answer! "}</h1>
		<div>The answer is:</div>
		<div>${answer}</div>
		<button type="button" class="nextQuestion">Next Question</button>
	</div>
	`)
}

function renderFeedback() {
	$("main").html(`
	<div class="feedbackScreen">
		<h1>${getScore() == getTotalNumQuestions() ? "You passed the zombie survival quiz!" : "You failed the zombie survival quiz."}</h1>
		<div>Score: <span class="score">${getScore()}</span>/${getTotalNumQuestions()}</div>
		<div>
			${getScore() == getTotalNumQuestions() ?
				"Sleep soundly tonight, knowing that if your town gets infected with a zombie virus, you’ll come out alive!"
				:"Don't give up, there's still hope! Brush up on your zombie knowledge and try again before the apocalypse starts!"
			}
		</div>
		<button type="button" class="startButton">Play Again</button>
	</div>
	`)
}

function updateScore() {
	$(".score").html(curScore);
	
	let questionNum = curQuestion+1;
	questionNum = Math.min(questionNum, getTotalNumQuestions());
	$(".questionNumber").html(questionNum);
}

// Event callback functions, employing event delegation as html will change at different parts of quiz

function handleStartQuiz() {
	$("main").on("click", ".startButton", function(e) {
		curScore = 0;
		curQuestion = 0;
		updateScore();
		renderQuestion();
	});
}

function handleAnswerSubmit() {
	$("main").on("submit", "form", function(e) {
		e.preventDefault();
		
		let answer = $("input[name='answer']:checked", ".questionForm").val();
		let isCorrect = checkAnswer(answer, curQuestion);
		if(isCorrect) {
			curScore++;
			updateScore();
			renderAnswer(getCorrectAnswer(curQuestion), true);
		}
		else {
			renderAnswer(getCorrectAnswer(curQuestion), false);
		}
	});
}

function handleNextQuestion() {
	$("main").on("click", ".nextQuestion", function(e) {
		curQuestion++;
		updateScore();
		
		if(curQuestion >= questionSet.length) {
			renderFeedback();
		}
		else {
			renderQuestion();
		}
	});
}

function handleSetup() {
	$(function(){
		handleStartQuiz();
		handleAnswerSubmit();
		handleNextQuestion();
		
		updateScore();
		
		renderStartScreen();
	});
}
handleSetup();

// utility functions

function checkAnswer(answer, questionNumber) {
	console.log("checking answer: "+answer);
	let question = questionSet[questionNumber];
	let correctAnswer = getCorrectAnswer(questionNumber);
	console.log("correct answer: "+correctAnswer);
	return correctAnswer.startsWith(answer);
}

function getCorrectAnswer(questionNumber) {
	return ANSWERS[questionNumber];
}

function getCurQuestion() {
	return questionSet[curQuestion];
}

function getScore() {
	return curScore;
}

function getTotalNumQuestions() {
	return questionSet.length;
}
