var $h1 = document.querySelector('h1');

function countdown() {
  var number = parseInt($h1.textContent);
  if (number > 1) {
    number--;
    $h1.textContent = number;
  } else {
    clearInterval(start);
    $h1.textContent = '~Earth Beeeelooowww Us~';
  }

}

var start = setInterval(countdown, 1000);
