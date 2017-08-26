// Start button click handler
$(document).ready ( function() {
	var countdown;

	//  Variable that will hold our setInterval that runs the stopwatch
	var intervalId;

	var questions = [
		{
			question: "Question 1",
			answers: ["answer1",
					  "answer2",
					   "answer3",
					   "answer4"],
			correctAnswer: "answer1"
		},
		{
			question: "Question 2",
			answers: ["answer1",
					  "answer2",
					  "answer3",
					  "answer4"],
			correctAnswer: "answer2"
		},
		{
			question: "Question 3",
			answers: ["answer1",
					  "answer2",
					  "answer3",
					  "answer4"],
			correctAnswer: "answer3"
		},
		{
			question: "Question 4",
			answers: ["answer1",
					  "answer2",
					  "answer3",
					  "answer4"],
			correctAnswer: "answer4"
		}
	];

	var timeRemaining = 30;

	// Start button click handler. Starts the game.
	$(".btn-start").on("click", function () {
		$(".game-div").html("<h3>Time remaining: <span id='time-remaining'></span></h3>");
		setGame();
	});

	// Update display and decrement timeRemaining as the countdown progresses
	countdown = function() {
		$("#time-remaining").text(timeRemaining);
		timeRemaining--;
	}

	// Set up the game
	function setGame() 
	{
		intervalId = setInterval(countdown, 1000);
		for (var i = 0; i < questions.length; i++)
		{
			$(".game-div").append("<h2>" + questions[i].question + "</h2>");
			for (var answer = 0; answer < questions[i].answers.length; answer++)
			{
				$(".game-div").append("<div class='answer-option' index=" + i + ">" + questions[i].answers[answer] + "</div>");
			}
		}
	}
});

