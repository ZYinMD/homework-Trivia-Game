var currentQuestionNumber, score, intervalId, timeoutId
initialize();

function initialize() {
  $('#start-button').on('click', function() {
    newGame(120);
  });
  $('#play-again').on('click', function() {
    newGame(10);
  });
}

function newGame(seconds) {
  currentQuestionNumber = 0;
  score = 0;
  $('.announcements > *').toggleClass('hidden', true);
  $('.row__center-align > *').toggleClass('hidden', true);
  countdown(seconds);
  populateQuestion();
}

function countdown(seconds) {
  var timerDiv = $('#timer');
  timerDiv.text('Time Left: ' + Math.floor(seconds / 60) + 'm' + seconds % 60 + 's'); //First do it once manually, because setInverval only run the function immediately
  intervalId = setInterval(function() {
    if (--seconds <= 0) {
      gameOver();
    }
    timerDiv.text('Time Left: ' + Math.floor(seconds / 60) + 'm' + seconds % 60 + 's');
  }, 1000)
  timerDiv.toggleClass('hidden', false);
}

function populateQuestion() {
  currentQuestion = questions[currentQuestionNumber];
  $('#stem').text(currentQuestion.stem);
  $('#a').text('A. ' + currentQuestion.a);
  $('#b').text('B. ' + currentQuestion.b);
  $('#c').text('C. ' + currentQuestion.c);
  $('#d').text('D. ' + currentQuestion.d);
  $('#question').on('click', '.choices', isCorrect);
}

function isCorrect() {
  $('#question').off(); //remove click listeners as soon as user clicked a choice, prevent multi clicking bug
  var key = currentQuestion.correctChoice;
  var picked = $(this).attr('id');
  $('#' + key).append('<span style="color: SpringGreen"> ✔</span>'); //mark the correct answer no matter what
  if (picked == key) {
    score++;
  } else {
    $('#' + picked).append('<span style="color: red"> ✖</span>');
  }
  timeoutId = setTimeout(nextQuestion, 1200);
}

function nextQuestion() {
  if (currentQuestionNumber == questions.length - 1) {
    gameOver();
  } else {
    currentQuestionNumber++;
    populateQuestion();
  }
}

function gameOver() {
  clearInterval(intervalId);
  clearTimeout(timeoutId); //in case it's in the middle of timeout (correct answer showing time)
  $('#question > *').empty()
  $('#score').toggleClass('hidden', false).html('Score: ' + score / questions.length * 100 + '%');
  $('#play-again').toggleClass('hidden', false);
  $('#question').off(); //remove click listeners in case it's a auto submit, prevent multiple listeners bug
  printComment();
}

function printComment() {
  var comment
  switch (score) {
    case 0:
      comment = "Keep using your mouse, it's perfect for you. :)";
      break;
    case 1:
      comment = "You suck.";
      break;
    case 2:
      comment = "Hey, every single key combination in every single question is productivity gold, you'll benefit a lot if you go back and check them out one by one.";
      break;
    case 3:
      comment = "Not bad! You're pretty into keyboard shortcuts, aren't you?";
      break;
    case 4:
      comment = "Only people like you deserve to be a programmer.";
      break;
    case 5:
      comment = "Wow, you need to talk to Zhi about AutoHotkey, and exchange ideas!";
      break;
  }
  $('#comment').toggleClass('hidden', false).text(comment);
}
