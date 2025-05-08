
// Box Can Move (via Drag) and Rotate (via Right Click)
var box = document.getElementById('the-brick')
// var x = 0; var y = 0
var rotationAngle = 0
var lastY = 0;
var nBricks = 1;
var maxBricks = 5;
var ballposition = 0


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

    console.log(x, y);

    x += event.dx;
    y += event.dy;

    el.attr('data-x', x);
    el.attr('data-y', y);

    event.target.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`
  })

//Rotating Box (Source: Interact.js, was tweaked to comply with our parameters)
rotationAngle = 0
interact('.brick-class')
  .on('contextmenu', function (event) {
    let el = $(event.currentTarget);

    let x = parseInt(el.attr('data-x'));
    let y = parseInt(el.attr('data-y'));

  rotationAngle = (rotationAngle + 20) % 360;
  event.currentTarget.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`; 
  });

//Adding New Brick
const addBrick = () => {
  // If it reached LowestY, no more bricks can be added
  if (nBricks >= maxBricks) {
    return;
  }

  nBricks += 1;

    lastY =+ 20

    let div = `<div class="brick-class" data-x="0" data-y="${lastY}">THE BRICK</div>`;



  $('body').append(div);
}
$('#add-brick').click(addBrick);

// Make Ball move back and forth horizontally
const addBallMove = () => {










}



 