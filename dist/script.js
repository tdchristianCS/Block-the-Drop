var element = document.getElementById('the-box')
var x = 0; var y = 0

interact(element)
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
    // inertia: true
  })
  .on('dragmove', function (event) {
    x += event.dx
    y += event.dy

    event.target.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`
  })

rotationAngle = 0
interact('.box-class')
  .on('click', function (event) {
  rotationAngle = (rotationAngle + 20) % 360;
  event.currentTarget.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`; 
  });


  Entity
	x
	y
  yAcc
 
const gravity = 5;
const maxYAcc = 50;
 
let counter = 0;
const intervalId = setInterval(() => {
  console.log("Counter:", counter);
  counter++;
  if (counter > 5) {
    clearInterval(intervalId);
    console.log("Interval stopped.");
  }
}, 10); // Execute every 10 mili second
 
const doGravity = () => {
	for (let entity of entities) {
		entity.yAcc += gravity;
		if (entity.yAcc >= maxYAcc) {
			entity.yAcc = maxYAcc;
		}
		entity.y += entity.yAcc;
	}
}
 