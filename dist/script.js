
// Box Can Move (via Drag) and Rotate (via Right Click)
var box = document.getElementById('the-brick')
var x = 0; var y = 0
var rotationAngle = 0

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
    x += event.dx
    y += event.dy

    event.target.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`
  })

//Rotating Box (Source: Interact.js, was tweaked to comply with our parameters)
rotationAngle = 0
interact('.brick-class')
  .on('contextmenu', function (event) {
  rotationAngle = (rotationAngle + 20) % 360;
  event.currentTarget.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`; 
  });

//Adding New Brick
const addBrick = () => {
  let div = `<div class="brick-class">THE BRICK</div>`;
  $('body').append(div);
}
$('#add-brick').click(addBrick);



 