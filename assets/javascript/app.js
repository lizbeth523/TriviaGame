$(document).ready ( function() {
	var answerIndex;
	var correctAnswer;
	var correctIndex;
	//  Variable that will hold our setInterval that runs the stopwatch
	var intervalId;
	// For each question, holds 0 for unanswered, 1 for correct, or 2 for incorrect in the index of the question
	var isCorrect = [];
	var numCorrect = 0;
	var numIncorrect = 0;
	var numUnanswered = 0;
	var question;
	// questionIndex initialized to -1 because it is incremented before use in the setGame function
	var questionIndex = -1;
	var questions = [
		{
			question: "Which of the following is not one of the Hawaiian islands?",
			answers: ["Oahu",
					  "Maui",
					   "Ahupuaa",
					   "Kauai"],
			correctIndex: 2
		},
		{
			question: "How are hurricanes named",
			answers: ["By the World Meteorological Organization",
					  "By the president, once every four years",
					  "Hurricane forecasters draw names from a hat",
					  "Friends or realitives of hurricane forecasters"],
			correctIndex: 0
		},
		{
			question: "Which island has a sightseeing train that once transported sugar?",
			answers: ["St. Lucia",
					  "Jamaica",
					  "St. Kitts",
					  "Martinique"],
			correctIndex: 2
		},
		{
			question: "Where was the famous “Painkiller” cocktail created?",
			answers: ["St. Maarten",
					  " Antigua",
					  "Tortola",
					  "Jost Van Dyke"],
			correctIndex: 3
		},
		{
			question: "The French never ruled which of the following islands?",
			answers: ["Dominica",
					  "Grenada",
					   "St. Lucia",
					   "St. Croix"],
			correctIndex: 3
		},
		{
			question: "What country’s coastal waters are protected as a national park?",
			answers: ["Barbados",
					  "Bonaire",
					  "Cayman Islands",
					  "Tortola"],
			correctIndex: 1
		},
		{
			question: "Tropical rainforests are home to half the plant and animal species on Earth. True or False?",
			answers: ["True",
					  "False"],
			correctIndex: 0
		},
		{
			question: "Trees in the tropical rainforest are so dense that it takes approximately ___ minutes for rainfall to reach the ground.",
			answers: ["2",
					  "10",
					  "30",
					  "60"],
			correctIndex: 1
		}
	];
	var secondsPerQuestion = 5;
	var secondsPerResultDisp = 3;
	var timeRemaining;

	// Start button click handler. Starts the game.
	$(".btn-start").on("click", function () {
		// $(".game-div").html("<h3>Time remaining: <span id='time-remaining'></span></h3>");
		setGame();
	});

	// Checks whether a given answer is correct or incorrect. Sstores 1 if correct or 2 if incorrect in isCorrect array
	var checkAnswer = function() {
		correctIndex = questions[questionIndex].correctIndex;
		if (answerIndex === correctIndex)
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
		console.log(timeRemaining);
		timeRemaining--;
		if (timeRemaining <= 0)
		{
			// Stop the countdown when time gets to zero
			clearInterval(intervalId);
			console.log("isCorrect[questionIndex] = " + isCorrect[questionIndex]);
			// if (!(isCorrect[questionIndex] === 1 || isCorrect[questionIndex] === 2))
			// {
			// 	displayQuestionResults();
			// }
			if (questionIndex < questions.length - 1)
			{
				setGame();
			}
			else
			{
				getResults();
				displayGameResults();
			}
		}
	};

	var displayGameResults = function() {
		$(".game-div").html("<h2>All done!</h2>");
		$(".game-div").append("<h3>Correct Answers: " + numCorrect + "</h3>");
		$(".game-div").append("<h3>Incorrect Answers: " + numIncorrect + "</h3>");
		$(".game-div").append("<h3>Unanswered: " + numUnanswered + "</h3>");
		$(".game-div").append("<button class='btn-start'>Start Over?</button>")
		$(".btn-start").click(reset);
	};

	var displayQuestionResults = function() {
		timeRemaining = secondsPerResultDisp;
		intervalId = setInterval(countdown, 1000);
		correctIndex = questions[questionIndex].correctIndex;
		if (answerIndex === correctIndex)
		{
			$(".game-div").html("<h2>Correct!</h2>");
		}
		else
		{
			$(".game-div").html("<h2>Nope! The correct answer is " + questions[questionIndex].answers[correctIndex]  + "</h2>");
		}
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
		timeRemaining = secondsPerQuestion;
		$(".game-div").html("<h3>Time remaining: <span id='time-remaining'></span></h3>");
		$("#time-remaining").text(timeRemaining);
		clearInterval(intervalId);
		setGame();
	};

	// Set up the game
	function setGame() 
	{
		timeRemaining = secondsPerQuestion;
		intervalId = setInterval(countdown, 1000);
		$(".game-div").html("<h3>Time remaining: <span id='time-remaining'></span></h3>");
		questionIndex++;
		question = questions[questionIndex];
		$("#question-results").remove();
		$(".game-div").append("<h2>" + question.question + "</h2>");
		for (var answer = 0; answer < question.answers.length; answer++)
		{
			$(".game-div").append("<div class='answer-option' questionIndex=" + questionIndex + " answerIndex= " + answer + ">" + question.answers[answer] + "</div>");
		} 
		
		// Trivia answer click handler
		$(".answer-option").on("click", function() {
			// questionIndex = parseInt($(this).attr("questionIndex"));
			answerIndex = parseInt($(this).attr("answerIndex"));
			clearInterval(intervalId);
			checkAnswer();
			displayQuestionResults(); 
			// if (questionIndex < questions.length - 1)
			// {
			// 	setGame();
			// }
			// else
			// {
			// 	getResults();
			// 	displayGameResults();
			// }
		}); 
	} 
}); 