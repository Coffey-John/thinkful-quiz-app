////////////////////////////////////
// Section 1: Rendering Functions // that update the HTML according to the state stored in javascript
////////////////////////////////////

// These are a set of functions that update the HTML according to the
// state stored in our javascript variables. These functions are called
// via the functions in the event callback section.

// The start/menu screen is rendered here, called at the beginning of 
// the program on page load.
function renderStartMenu() {
	$("main").html(`
	<section class="menuScreen padding-top-medium">
		<h1>Will you survive the zombie apocalypse, or will you become one of them?</h1>
		<button type="button" class="startButton">Let's find out!</button>
	</section>
	`)
}

// Here we render a form asking the user to answer the current question.
// We get the current question and its multiple choice options from the 
// global javascript state.
function renderQuestion() {
	let question = getCurQuestion();
	
	$("main").html(`
	<section class="questionScreen">
		<h1>${question.text}</h1>
		<form class="questionForm">
			<fieldset class="radio">
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
			
			<button type="submit">Submit</button>
		</form>
	</section>
	`)
}

// Here we render the answer screen, which shows whether the users has
// given a correct answer. If it was correct, congratulate them and 
// explain why. If it was incorrect, let them know, giving the correct
// answer along with its explanation.
function renderAnswer(answer, correctAnswer, explanation) {
	
	// CORRECT ANSWER!
	if(answer == correctAnswer) {
		$("main").html(`
		<section class="answerRightScreen">
			<h1 class="padding-bottom-small">Correct!</h1>
			<div class="bold underline">The answer is:</div>
			<div>${correctAnswer}</div>
			<div>${explanation}</div>
			<br>
			<button type="button" class="nextQuestion">Next</button>
		</section>
		`)
	}
	// WRONG ANSWER!
	else {
		$("main").html(`
		<section class="answerRightScreen">
			<h1 class="padding-bottom-small">Wrong answer!</h1>
			<div class="bold underline">Your answer was:</div>
			<div>${answer}</div>
			<br>
			<div class="bold underline">The correct answer is:</div>
			<div>${correctAnswer}</div>
			<div>${explanation}</div>
			<br>
			<button type="button" class="nextQuestion">Next</button>
		</section>
		`)
	}
}

// This is the final screen for the quiz, which appears once they have
// completed all available questions. It will let them know their final
// score out of 5. If they got all the questions correct, they won, and
// we will congratulate them with a gif and a message. If they didn't 
// get them all right, we will let them know and show them another gif.
// Upon seeing the results, the user can choose to press the play again 
// button to restart the quiz and go back to the first question.
function renderFeedback() {
	let won = getScore() == getTotalNumQuestions();
	$("main").html(`
	<section class="feedbackScreen">
		<h1 class="padding-bottom-small">${won ? "You passed the zombie survival quiz!" : "You failed the zombie survival quiz."}</h1>
		<img src=${won? "\"win.gif\"":"\"lose.gif\""}>
		<br><br>
		<div><span class="bold underline">Final Score</span>: <span class="score">${getScore()}</span>/${getTotalNumQuestions()}</div>
		<br>
		<div>
			${getScore() == getTotalNumQuestions() ?
				"Sleep soundly tonight, knowing that if your town gets infected with a zombie virus, you’ll come out alive!"
				:"Don't give up, there's still hope! Brush up on your zombie knowledge and try again before the apocalypse starts!"
			}
		</div>
		<br>
		<button type="button" class="startButton">Play Again</button>
	</section>
	`)
}

// Here we render the score elements, which are in the header and need
// to be incremented each time the user answers a question correctly.
function updateScore() {
	$(".score").html(curScore);
	
	let questionNum = curQuestion+1;
	questionNum = Math.min(questionNum, getTotalNumQuestions());
	$(".questionNumber").html(questionNum);
}

/////////////////////////////////////////
// Section 2: Event callback functions //
/////////////////////////////////////////

// Here we listen to events, employing event delegation as html will
// change at different parts of quiz.

// Here we listen for when the users clicks a startButton class element,
// and bring them to the first question of the quiz, making sure their
// score is reset.
function handleStartQuiz() {
	$("main").on("click", ".startButton", function(e) {
		curScore = 0;
		curQuestion = 0;
		updateScore();
		renderQuestion();
	});
}

// When the user submits an answer via the form, this function is called
// and we check their answer against our records of right and wrong 
// answers. If they answered right, they get their score incremented.
// After checking, we show them the answer screen, which gives them
// additional feedback and an explanation of the correct answer.
function handleAnswerSubmit() {
	$("main").on("submit", "form", function(e) {
		e.preventDefault();
		
		let answer = $("input[name='answer']:checked", ".questionForm").val();
		let isCorrect = checkAnswer(answer, curQuestion);
		if(isCorrect) {
			curScore++;
			updateScore();
		}
		
		renderAnswer(answer, getCorrectAnswer(curQuestion), getExplanation(curQuestion));
	});
}

// This function is called when the user presses the 'next' button and 
// if there are more questions, it will render the next one, 
// incrementing the current question number in the javascript state.
// If there are no more questions, we render the quiz feedback screen
// to let them know if they passed and give them an opportunity to 
// play again.
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

// Here we add hooks to all the above functions and render the start 
// menu to begin the user-event feedback loop.
function handleSetup() {
	$(function(){
		handleStartQuiz();
		handleAnswerSubmit();
		handleNextQuestion();
		
		updateScore();
		
		renderStartMenu();
	});
}
handleSetup();

//////////////////////////////////
// Section 3: Utility functions //
//////////////////////////////////

// Here we standardize methods for accessing global state data.

function checkAnswer(answer, questionNumber) {
	let question = questionSet[questionNumber];
	let correctAnswer = getCorrectAnswer(questionNumber);
	return correctAnswer == answer;
}

function getCorrectAnswer(questionNumber) {
	return ANSWERS[questionNumber];
}

function getExplanation(questionNumber) {
	return EXPLANATIONS[questionNumber];
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
