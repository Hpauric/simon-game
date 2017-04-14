$(document).ready(function() {
  
  $('audio').prop('volume', 0);

  var audio = $('audio')[0];
  var audio2 = $('audio')[1];
  var audio3 = $('audio')[2];
  var audio4 = $('audio')[3];
  var errorAudio = $('audio')[4];
  var numberOfSteps = 0;
  var randomNumber = Math.floor(Math.random() * 4) + 1;
  var arrayOfCompMoves = [];
  var stepInAnimationSeries = 0;
  var playerCurrentStep = 0;
  var playerTurn = false;
  var tempNumber;

  function playAudio(number) {
    if (number === 1) audio.play();
    if (number === 2) audio2.play();
    if (number === 3) audio3.play();
    if (number === 4) audio4.play();
  }

  function resetColor(resetColorNumber) {
    if (resetColorNumber === 1) $('#1').css({
      'box-shadow': 'none',
      'background-color': '#dd7788'
    });
    if (resetColorNumber === 2) $('#2').css({
      'box-shadow': 'none',
      'background-color': '#667799'
    });
    if (resetColorNumber === 3) $('#3').css({
      'box-shadow': 'none',
      'background-color': '#f2e090'
    });
    if (resetColorNumber === 4) $('#4').css({
      'box-shadow': 'none',
      'background-color': '#7a9460'
    });
  }

  function lightUpQuadrant(lightUpNumber) {
      lightUpNumber = parseInt(lightUpNumber);
    if (lightUpNumber === 1) $('#1').css({
      'box-shadow': '-15px -15px 150px 10px #f3172d inset',
      'background-color': 'white'
    });
    if (lightUpNumber === 2) $('#2').css({
      'box-shadow': '15px -15px 150px 10px #2052f3 inset',
      'background-color': 'white'
    });
    if (lightUpNumber === 3) $('#3').css({
      'box-shadow': '-15px 15px 150px 10px #f2f735 inset',
      'background-color': 'white'
    });
    if (lightUpNumber === 4) $('#4').css({
      'box-shadow': '15px 15px 150px 10px #49fb35 inset',
      'background-color': 'white'
    });
  }

    // animateQuadrant keeps calling on itself until the sequence is finished
  
  function animateQuadrant(number) {
    stepInAnimationSeries += 1;
    playAudio(number);
    lightUpQuadrant(number);

    setTimeout(function() {
      resetColor(number);
      if (stepInAnimationSeries < numberOfSteps) {
        setTimeout(function() {
          animateQuadrant(arrayOfCompMoves[stepInAnimationSeries]);
        }, 200);
      } else {
        playerTurn = true;
      }
    }, 500);
  }

  function checkIfCorrectMove(id) {
    if (parseInt(id) === arrayOfCompMoves[playerCurrentStep]) {
      playerCurrentStep += 1;
      playAudio(parseInt(id));
      if (checkIfSequenceIsComplete()) {

        if (playerCurrentStep === 20) { // Finished 20 moves
          document.getElementById('id01').style.display = 'block';
          $('#restart').click();
        } else {
          playerCurrentStep = 0;
          setTimeout(function() {
            $('#start').click();
          }, 800);
        }
      }
    } else { // Incorrect quadrant clicked
      errorAudio.play();
      playerCurrentStep = 0;
      stepInAnimationSeries = 0;
      setTimeout(function() {
        // If strict mode is on, restart
        if ($('input:checked').val() === 'on') {
          $('#restart').click();
        } else {
          animateQuadrant(arrayOfCompMoves[0]);
        }
      }, 800);
    }
  }

  function checkIfSequenceIsComplete() {
    if (playerCurrentStep === numberOfSteps) {
      return true;
    } else {
      return false;
    }
  }

  $('.quarter-circle').click(function() {
    lightUpQuadrant(this.id);
    tempNumber = parseInt(this.id);
    setTimeout(function() {
      resetColor(tempNumber);
    }, 300);
    if (playerTurn) {
      checkIfCorrectMove(this.id);
    } else {
      playAudio(parseInt(this.id));
    }
  });

  $('#start').click(function() {
    stepInAnimationSeries = 0;
    randomNumber = Math.floor(Math.random() * 4) + 1;
    arrayOfCompMoves.push(randomNumber);
    $('#array-panel').text(arrayOfCompMoves);
    numberOfSteps += 1;
    $('#display-step').text(numberOfSteps);
    animateQuadrant(arrayOfCompMoves[stepInAnimationSeries]);

  });

  $('#restart').click(function() {
    numberOfSteps = 0;
    $('#display-step').text(numberOfSteps);
    arrayOfCompMoves = [];
    stepInAnimationSeries = 0;
    playerCurrentStep = 0;
    playerTurn = false;
  });
  
  setTimeout(function() {
    $('#1').click();
    setTimeout(function() {
      resetColor(1);
    }, 300);
  }, 2000); 
  setTimeout(function() {
    $('#2').click();
    setTimeout(function() {
      resetColor(2);
    }, 300);
  }, 2050);
  setTimeout(function() {
    $('#3').click();
    setTimeout(function() {
      resetColor(3);
    }, 300);
  }, 2100);
  setTimeout(function() {
    $('#4').click();
    setTimeout(function() {
      resetColor(4);
    }, 300);
  }, 2150);
});