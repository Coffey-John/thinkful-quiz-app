// rendering functions that update the HTML according to the state stored in javascript

function renderStartScreen() {
	$("main").html(`
	<section class="menuScreen padding-top-medium">
		<h1>Will you survive the zombie apocalypse, or will you become one of them?</h1>
		<button type="button" class="startButton">Let's find out!</button>
	</section>
	`)
}

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
			renderAnswer(answer, getCorrectAnswer(curQuestion), getExplanation(curQuestion));
		}
		else {
			renderAnswer(answer, getCorrectAnswer(curQuestion), getExplanation(curQuestion));
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
