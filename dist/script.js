
// Box Can Move (via Drag) and Rotate (via Right Click)
var box = document.getElementById('the-brick')
// var x = 0; var y = 0
// var rotationAngle = 0
var lastY = 0;
var nBricks = 1;
var maxBricks = 6;
var ballposition = 0
var ballspeed = 5



//Dragging Box (Source: Interact.js, was tweaked to comply with our parameters)
interact('.brick-class')
  .draggable({
    modifiers: [
      interact.modifiers.snap({
        targets: [
          interact.snappers.grid({ x: 30, y: 30 })
        ],
        range: Infinity,
        relativePoints: [ { x: 0, y: 0 } ]
      }),
    ],
  })
  .on('dragmove', function (event) {
    let el = $(event.currentTarget);

    let x = parseInt(el.attr('data-x'));
    let y = parseInt(el.attr('data-y'));
    let a = parseInt(el.attr('data-angle'));

    console.log(x, y);

    x += event.dx;
    y += event.dy;

    el.attr('data-x', x);
    el.attr('data-y', y);

    event.target.style.transform = `translate(${x}px, ${y}px) rotate(${a}deg)`
  })

//Rotating Box (Source: Interact.js, was tweaked to comply with our parameters)
rotationAngle = 0
interact('.brick-class')
  .on('dblclick', function (event) {
    let el = $(event.currentTarget);

    let x = parseInt(el.attr('data-x'));
    let y = parseInt(el.attr('data-y'));
    let a = parseInt(el.attr('data-angle'));

  a = (a + 20) % 360;

  el.attr('data-angle', a);

  event.currentTarget.style.transform = `translate(${x}px, ${y}px) rotate(${a}deg)`; 
  });

//Adding New Brick
const addBrick = () => {
  // If it reached LowestY, no more bricks can be added
  if (nBricks >= maxBricks) {
    return;
  }

  nBricks += 1;

    lastY =+ 20

    let div = `<div class="brick-class" data-x="0" data-y="${lastY} " data-angle = "0" >THE BRICK</div>`;



  $('body').append(div);
}
$('#add-brick').click(addBrick);

// Make Ball move back and forth horizontally (using jquery) 
const addBallMove = () => {
  const $ball = $('.ball-class');
  const speed = 5; 
  const amplitude = 1400; // how many pixels it can go
  let direction = 1; // 1 is fowards, -1 backward

  let position = 0; // position of the ball

  const move = () => {
    position += speed * direction;

    // Switches direction so it doesn't go off screen. Online I found that | | is an "operator" it like which returns if true
    if (position >= amplitude || position <= 0) {
      direction *= -1;
    }

    $ball.css('left', position + 'px');
  };

// This is used like frames so it doesn't go supersonic speed, apparently 16 is typical
  setInterval(move, 16); 
};
$(document).ready(function() {
  addBallMove();
});



// At a random frame the ball will fall
const addBallDrop = () => { 
  const $ball = $('.ball-class');

  // Ball will drop between 5-10 seconds (Source in html, stack overflow)
  const randomTime = Math.random() * (10000 - 5000) + 5000; 
  setTimeout(() => {
    $ball.css('transition', 'top 2s linear');
    $ball.css('top', '100vh'); //apparently vh is similar to px, px would go up when i tried it though
  
  }, randomTime);

  // make it so when ball reached under 700 vertical position, game will be over (watched a bunch of yt vids)
  const checkGameOver = () => {
    const ballTop = parseInt($ball.css('top'));
    if (ballTop >= 700) {
      alert('Game Over! The ball has fallen!'); // makes a tab at top of screen where dead
      clearInterval(interval);
    }
  };
  const interval = setInterval(checkGameOver, 100); // should check every 100 milliseconds




  setInterval(move, 16); 
};
$(document).ready(function() {
  addBallDrop();
});













 