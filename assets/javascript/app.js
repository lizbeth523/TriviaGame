$(document).ready ( function() {
	var answerIndex;
	//  Variable that will hold our setInterval that runs the stopwatch
	var intervalId;
	// Array of integer values for whether answer was correct, incorrect, or unanswered
	// 0 for unanswered, 1 for correct, 2 for incorrect
	var isCorrect = [];
	var numCorrect = 0;
	var numIncorrect = 0;
	var numUnanswered = 0;
	var question;
	// questionIndex initialized to -1 because it is incremented before use in the setGame function
	var questionIndex = -1;
	var questions = [
		{
			question: "Question 1",
			answers: ["answer1",
					  "answer2",
					   "answer3",
					   "answer4"],
			correctIndex: 0
		},
		{
			question: "Question 2",
			answers: ["answer1",
					  "answer2",
					  "answer3",
					  "answer4"],
			correctIndex: 1
		},
		{
			question: "Question 3",
			answers: ["answer1",
					  "answer2",
					  "answer3",
					  "answer4"],
			correctIndex: 2
		},
		{
			question: "Question 4",
			answers: ["answer1",
					  "answer2",
					  "answer3",
					  "answer4"],
			correctIndex: 3
		}
	];
	var timeRemaining ;

	// Start button click handler. Starts the game.
	$(".btn-start").on("click", function () {
		$(".game-div").html("<h3>Time remaining: <span id='time-remaining'></span></h3>");
		setGame();
	});

	// Checks whether a given answer is correct or incorrect. Sstores 1 if correct or 2 if incorrect in isCorrect array
	var checkAnswer = function() {
		if (answerIndex === questions[questionIndex].correctIndex)
		{
			isCorrect[questionIndex] = 1;
		}
		else
		{
			isCorrect[questionIndex] = 2;
		}
	};

	// Update display and decrement timeRemaining as the countdown progresses
	var countdown = function() {
		$("#time-remaining").text(timeRemaining);
		timeRemaining--;
		if (timeRemaining <= 0)
		{
			if (questionIndex < questions.length - 1)
			{
				clearInterval(intervalId);
				setGame();
			}
			else
			{
				getResults();
				displayResults();
				clearInterval(intervalId);
			}
		}
	};

	var displayResults = function() {
		$(".game-div").html("<h2>All done!</h2>");
		$(".game-div").append("<h3>Correct Answers: " + numCorrect + "</h3>");
		$(".game-div").append("<h3>Incorrect Answers: " + numIncorrect + "</h3>");
		$(".game-div").append("<h3>Unanswered: " + numUnanswered + "</h3>");
		$(".game-div").append("<button class='btn-start'>Start Over?</button>")
		$(".btn-start").click(reset);
	};

	// Calculate the number of correct, incorrect, and unanswered questions
	var getResults = function() {
		for (var i = 0; i < questions.length; i++)
		{
			if (isCorrect[i] === 1)
			{
				numCorrect++;
			}
			else if (isCorrect[i] === 2)
			{
				numIncorrect++;
			}
			else
			{
				numUnanswered++;
			}
		}
		console.log("correct: " + numCorrect + ", incorrect: " + numIncorrect + ", unanswered: " + numUnanswered);
	};

	// Reset for new game
	var reset = function() {
		isCorrect = [];
		numCorrect = 0;
		numIncorrect = 0;
		numUnanswered = 0;
		questionIndex = -1;
		timeRemaining = 30;
		$(".game-div").html("<h3>Time remaining: <span id='time-remaining'></span></h3>");
		$("#time-remaining").text(timeRemaining);
		clearInterval(intervalId);
		setGame();
	};

	// Set up the game
	function setGame() 
	{
		timeRemaining = 30;
		intervalId = setInterval(countdown, 1000);
		questionIndex++;
		question = questions[questionIndex];

		$(".game-div").append("<h2>" + question.question + "</h2>");
		for (var answer = 0; answer < question.answers.length; answer++)
		{
			$(".game-div").append("<div class='answer-option' questionIndex=" + questionIndex + " answerIndex= " + answer + ">" + question.answers[answer] + "</div>");
		} 
		
		// Trivia answer click handler
		$(".answer-option").on("click", function() {
			// questionIndex = parseInt($(this).attr("questionIndex"));
			answerIndex = parseInt($(this).attr("answerIndex"));
			checkAnswer();
			if (questionIndex < questions.length - 1)
			{
				clearInterval(intervalId);
				setGame();
			}
			else
			{
				getResults();
				displayResults();
				clearInterval(intervalId);
			}
		}); 
		// // Append submit button to page
		// $(".game-div").append("<button id='btn-submit'>Submit</button>");
		// // Submit button click handler
		// $("#btn-submit").on("click", function() {
		// 	getResults();
		// 	displayResults();
		// });
	} 
}); 

