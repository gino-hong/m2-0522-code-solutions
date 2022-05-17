var $pokemon = document.querySelectorAll('.pokemon');
var $circle = document.querySelectorAll('.fa-circle');

var $previous = document.querySelector('.previous');
function goPrevious() {
  var $active = document.querySelector('.active');
  var $solid = document.querySelector('.fa-solid.fa-circle.fa-lg');
  $solid.className = 'fa-regular fa-circle fa-lg';
  for (var i = 0; i < $pokemon.length; i++) {
    if ($pokemon[i] === $active) {
      if (i > 0) {
        $pokemon[i - 1].className = 'active pokemon';
        $circle[i - 1].className = 'fa-solid fa-circle fa-lg';
      } else {
        $pokemon[$pokemon.length - 1].className = 'active pokemon';
        $circle[$pokemon.length - 1].className = 'fa-solid fa-circle fa-lg';
      }
    }
  }
  $active.className = 'hidden pokemon';
}
$previous.addEventListener('click', goPrevious);

var $next = document.querySelector('.next');
function goNext() {
  var $active = document.querySelector('.active');
  var $solid = document.querySelector('.fa-solid.fa-circle.fa-lg');
  $solid.className = 'fa-regular fa-circle fa-lg';
  for (var i = 0; i < $pokemon.length; i++) {
    if ($pokemon[i] === $active) {
      if (i < $pokemon.length - 1) {
        $pokemon[i + 1].className = 'active pokemon';
        $circle[i + 1].className = 'fa-solid fa-circle fa-lg';
      } else {
        $pokemon[0].className = 'active pokemon';
        $circle[0].className = 'fa-solid fa-circle fa-lg';
      }
    }
  }
  $active.className = 'hidden pokemon';
}
$next.addEventListener('click', goNext);

$circle[0].addEventListener('click', function () {
  var $solid = document.querySelector('.fa-solid.fa-circle.fa-lg');
  $solid.className = 'fa-regular fa-circle fa-lg';
  var $active = document.querySelector('.active');
  if ($circle[0].className === 'fa-regular fa-circle fa-lg') {
    $circle[0].className = 'fa-solid fa-circle fa-lg';
    $pokemon[0].className = 'active pokemon';
  }
  $active.className = 'hidden pokemon';
});

$circle[1].addEventListener('click', function () {
  var $solid = document.querySelector('.fa-solid.fa-circle.fa-lg');
  $solid.className = 'fa-regular fa-circle fa-lg';
  var $active = document.querySelector('.active');
  if ($circle[1].className === 'fa-regular fa-circle fa-lg') {
    $circle[1].className = 'fa-solid fa-circle fa-lg';
    $pokemon[1].className = 'active pokemon';
  }
  $active.className = 'hidden pokemon';
});

$circle[2].addEventListener('click', function () {
  var $solid = document.querySelector('.fa-solid.fa-circle.fa-lg');
  $solid.className = 'fa-regular fa-circle fa-lg';
  var $active = document.querySelector('.active');
  if ($circle[2].className === 'fa-regular fa-circle fa-lg') {
    $circle[2].className = 'fa-solid fa-circle fa-lg';
    $pokemon[2].className = 'active pokemon';
  }
  $active.className = 'hidden pokemon';
});

$circle[3].addEventListener('click', function () {
  var $solid = document.querySelector('.fa-solid.fa-circle.fa-lg');
  $solid.className = 'fa-regular fa-circle fa-lg';
  var $active = document.querySelector('.active');
  if ($circle[3].className === 'fa-regular fa-circle fa-lg') {
    $circle[3].className = 'fa-solid fa-circle fa-lg';
    $pokemon[3].className = 'active pokemon';
  }
  $active.className = 'hidden pokemon';
});

$circle[4].addEventListener('click', function () {
  var $solid = document.querySelector('.fa-solid.fa-circle.fa-lg');
  $solid.className = 'fa-regular fa-circle fa-lg';
  var $active = document.querySelector('.active');
  if ($circle[4].className === 'fa-regular fa-circle fa-lg') {
    $circle[4].className = 'fa-solid fa-circle fa-lg';
    $pokemon[4].className = 'active pokemon';
  }
  $active.className = 'hidden pokemon';
});

var start = setInterval(goNext, 3000);

function reset() {
  clearInterval(start);
  start = setInterval(goNext, 3000);
}

$previous.addEventListener('click', reset);
$next.addEventListener('click', reset);
for (var i = 0; i < $circle.length; i++) {
  $circle[i].addEventListener('click', reset);
}
