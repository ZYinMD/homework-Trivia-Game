var currentQuestionNumber;
var score;

function initialize() {
  $('#question').on('click', '[id]', isCorrect);
}

initialize();
newGame();

function newGame() {
  currentQuestionNumber = 1;
  score=0;
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
  var key=currentQuestion.correctChoice;
  var picked=$(this).attr('id');
  $('#'+key).append('<span style="color: LightGreen"> ✔</span>');


  // $('#'+currentQuestion.correctChoice).append('<span style="color: LightGreen"> ✔</span>');
  if (picked == key) {
    score++;
  } else {
    //your answer is incorrect!
    console.log('Wrong!')
  }
  setTimeout(nextQuestion, 1500);
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
