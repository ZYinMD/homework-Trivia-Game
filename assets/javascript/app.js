var currentQuestionNumber;

function initialize() {
  $('#question').on('click', '[id]', isCorrect);
}

initialize();
newGame();

function newGame() {
  currentQuestionNumber = 1;
  populateQuestion();
}

function populateQuestion() {
  currentQuestion = questions[currentQuestionNumber];
  $('#stem').text(currentQuestion.stem);
  $('#a').text('A. ' + currentQuestion.a);
  $('#b').text('B. ' + currentQuestion.b);
  $('#c').text('C. ' + currentQuestion.c);
  $('#d').text('D. ' + currentQuestion.d);
}

function isCorrect() {
  if ($(this).attr('id') == currentQuestion.correctChoice) {
    //your answer is correct!
    console.log('Correct!');
  } else {
    //your answer is incorrect!
    console.log('Wrong!')
  }
  nextQuestion();
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
  /////
  console.log('Game Over!')
}
