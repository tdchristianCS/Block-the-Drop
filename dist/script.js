// Box Can Move (via Drag) and Rotate (via Right Click)
var box = document.getElementById('the-brick')
// var x = 0; var y = 0
// var rotationAngle = 0
var lastY = 0;
var nBricks = 1;
var maxBricks = 5;
var ballposition = 0;
var ballspeed = 5;
var level = 1;


// Popup panel 
const HomeandGamePanel = () => {
  $('#gamescreen').removeClass('hide');
  $('#homescreen').addClass('hide');

  // start movement
  addBallMove();
  addCollision();
  addBallDrop();
}



const ShowHelpPanel = () => {
  $('#helpScreen').removeClass('hide');
  $('#homescreen').addClass('hide');
  $("#helpButton").addClass('hide');
  $("#unhelpButton").removeClass('hide');
  $('#gamescreen').addClass('hide');

}
const HideHelpPanel = () => {
  $('#helpScreen').addClass('hide');
  $('#homescreen').removeClass('hide');
  $("#helpButton").removeClass('hide');
  $("unhelpButton").addClass('hide')
  // var position = 0;
  // var speed=0;
  // var randomTime = Math.random() * (10000 - 5000) + 5000;
}

const hideHelp = () => {
  $('#gamescreen').addClass('hide');
  $('#homescreen').removeClass('hide');
  $("#helpButton").removeClass('hide');

}

// $('#restartbutton').click(ShowHomePanel);

// $('#hideHelp').click(hideHelp);




//Dragging Box (Source: Interact.js, was tweaked to comply with our parameters)
interact('.brick-class')
  .draggable({
    modifiers: [
      interact.modifiers.snap({
        targets: [
          interact.snappers.grid({ x: 30, y: 30 })
        ],
        range: Infinity,
        relativePoints: [{ x: 0, y: 0 }]
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

    a = (a + 30) % 360;

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
  lastY += 20; 

  let div = `<div class="brick-class" data-x="0" data-y="${lastY}" data-angle="0" style="transform: translate(0px, ${lastY}px) rotate(0deg);">THE BRICK</div>`;

  $('#app').append(div);
}
$('#add-brick').click(addBrick);

// Make Ball move back and forth horizontally (using jquery) 
const addBallMove = () => {
  const $ball = $('.ball-class');
  const speed = 3;
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

// make it so when ball reached under 700 vertical position, game will be over (watched a bunch of yt vids, don't think this is jquery)
const checkGameOver = () => {
  const $ball = $('.ball-class');
  const ballTop = parseInt($ball.css('top'));

  //console.log(ballTop);

  if (ballTop >= 700) {
    // alert('Game Over! The ball fell!'); // makes a tab at top of screen where dead
    $('#game-over').removeClass('hide');
    $('#restartbutton').removeClass('hide');

    $('#app').addClass('hide');
    clearInterval(interval);
    // Make it so if ball get pushed up past Y start point, you win

  } else if (ballTop < 0) {
    $("#game-winner").removeClass('hide');
    $('#app').addClass('hide');
    $('.brick-class').remove();
    $('#restartbutton').removeClass('hide');


    clearInterval(interval);
  }
};
const interval = setInterval(checkGameOver, 100); // should check every 100 milliseconds

// Make it so when Ball hits the Brick, it will bounce back (jquery)

// At a random frame the ball will fall
const addBallDrop = () => {
  const $ball = $('.ball-class');

  // Disable dragging when the ball starts falling
  const disableDragging = () => {
    interact('.brick-class').unset(); // Disable dragging for all bricks
  };

  // Ball will drop between 5-10 seconds (Source in html, stack overflow)
  const randomTime = Math.random() * (10000 - 5000) + 5000;
  setTimeout(() => {
    $ball.css('transition', 'top 2s linear');
    $ball.css('top', '100vh'); // Ball falls to the bottom of the screen
    disableDragging(); // Disable dragging when the ball starts falling
  }, randomTime);

  //   const move = () => {
  //   position += speed * direction;

  //   // Switches direction so it doesn't go off screen. Online I found that | | is an "operator" it like which returns if true
  //   if (position >= amplitude || position <= 0) {
  //     direction *= -1;
  //   }

  //   $ball.css('left', position + 'px');
  // };

  //   setInterval(move, 16);
};

// Add collision detection
const addCollision = () => {
  const $ball = $('.ball-class');

  const checkCollision = () => {
    const ballOffset = $ball.offset();
    const ballWidth = 20;
    const ballHeight = 20;

    // console.log('Ball Offset:', ballOffset, 'Width:', ballWidth, 'Height:', ballHeight); // Debug log for ball

    $('.brick-class').each(function () {
      const $brick = $(this);
      const brickOffset = $brick.offset();
      const brickWidth = 205;
      const brickHeight = 77;

      // console.log('Brick Offset:', brickOffset, 'Width:', brickWidth, 'Height:', brickHeight); // Debug log for brick

      // Check if the ball overlaps with the brick
      if (
        ballOffset.top > 100 &&
        ballOffset.left < brickOffset.left + brickWidth &&
        ballOffset.left + ballWidth > brickOffset.left &&
        ballOffset.top < brickOffset.top + brickHeight &&
        ballOffset.top + ballHeight > brickOffset.top
      ) {
        // console.log('Collision detected!'); // Debug log for collision
        // Reverse the ball's vertical direction
        const currentTop = parseInt($ball.css('top'));
        $ball.css('top', currentTop - 1000 / (level) + 'px'); // Move the ball upwards
      }
    });
  };

  // Check for collisions every 16ms
  setInterval(checkCollision, 16);
};

$(document).ready(function () {

  $('#startbutton').click(HomeandGamePanel);
  $('#helpButton').click(ShowHelpPanel);
  $('#unhelpButton').click(HideHelpPanel);
  $('#restartbutton').click(function () {
    window.location.reload();
  })
});
