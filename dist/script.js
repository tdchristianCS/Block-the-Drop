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
  .on('contextmenu', function (event) {
  rotationAngle = (rotationAngle + 20) % 360;
  event.currentTarget.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}deg)`; 
  });

  

var element = document.getElementById('the-ball')
interact(element)
  .draggable({
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    inertia: true
  })
  .on('dragmove', function (event) {
    var target = event.target
    var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
  }) 



 