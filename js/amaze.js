//a few globals
var dimensions = 35;
var pixels;
var cells;
var start;
var end;
var path;

function round(value) { return (value + 0.5) | 0; }

//show the maze
var draw = function () {
  var canvas = document.getElementById('maze');
  var context = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

    //fill
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  //draw the maze
  pixels = Math.min(canvas.width, canvas.height); 
  var scale = pixels / dimensions;
  var line = function(x1, y1, x2, y2) { context.moveTo(x1 + .5, y1 + .5); context.lineTo(x2 + .5, y2 + .5); };
  context.scale(scale,scale);
  context.strokeStyle = 'white';
  context.lineCap = 'square';
  context.lineJoin = 'miter';
  context.lineWidth = .75;
  cells.forEach(function(column, x) {
    column.forEach(function(row, y) {
      context.beginPath();
      if(row & 1) line(x, y, x - 1, y);
      if(row & 2) line(x, y, x + 1, y);
      if(row & 4) line(x, y, x, y - 1);
      if(row & 8) line(x, y, x, y + 1);
      context.stroke();
      context.closePath;
    });
  });

  //draw the destination
  context.fillStyle = '#44bb77';
  context.strokeStyle = '#006600';
  context.lineJoin = 'miter';
  context.lineWidth = .05;
  (function starPath(x, y, n, or, ir) {
    var rot = -Math.PI / 2;
    var step = Math.PI / n;
    context.beginPath();
    context.moveTo(x, y - or)
    for (i = 0; i < n; i++) {
      context.lineTo(x + Math.cos(rot) * or, y + Math.sin(rot) * or);
      rot += step
      context.lineTo(x + Math.cos(rot) * ir, y + Math.sin(rot) * ir);
      rot += step
    }
    context.lineTo(x, y - or)
    context.closePath();  
  })(end[0] + .5, end[1] + .5, 5, .33, .16);
  context.stroke();
  context.fill();

   //draw the path
  if(path.length) {
    context.strokeStyle = '#ffdddd';
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = .2;
    context.beginPath();
    context.moveTo(path[0][0] + .5, path[0][1] + .5);
    path.forEach(function (pt) {
      context.lineTo(pt[0] + .5, pt[1] + .5);
    });
    context.lineTo(start[0] + .5, start[1] + .5);
    context.stroke();
    context.closePath();
  }

   //draw the current position
  context.fillStyle = '#6699cc';
  context.strokeStyle = '#003399';
  context.lineJoin = 'miter';
  context.lineWidth = .05;
  context.beginPath();
  context.arc(start[0] + .5, start[1] + .5, .25, 0, 2 * Math.PI);
  context.closePath();
  context.stroke();
  context.fill();

  //did you win
  if(start[0] == end[0] && start[1] == end[1]) {
    alert('MENANG KAU!');
    reset();
  } 
};