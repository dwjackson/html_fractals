function barnsley_func(M, N, pos) {
  var tmp = {'x': pos['x'], 'y': pos['y']};
  pos['x'] = M[0][0] * tmp['x'] + M[0][1] * tmp['y'] + N[0];
  pos['y'] = M[1][0] * tmp['x'] + M[1][1] * tmp['y'] + N[1];
}

var M1 = [[0, 0], [0, 0.16]];
var N1 = [0, 0];
var P1 = 0.01;
var M2 = [[0.85, 0.04], [-0.04, 0.85]];
var N2 = [0, 1.6];
var P2 = 0.85;
var M3 = [[0.2, -0.26], [0.23, 0.22]];
var N3 = [0, 1.6];
var P3 = 0.07;
var M4 = [[-0.15, 0.28], [0.26, 0.24]];
var N4 = [0, 0.44];
var P4 = 0.07;

function barnsley(start_x, start_y, iters, context) {
  var pos = {'x': start_x, 'y': start_y};
  var M, N;
  var u = 50;
  context.beginPath();
  context.fillStyle = '#003D00';
  for (var i = 0; i < iters; i++) {
    context.moveTo(pos['x'], pos['y']);
    context.fillRect(pos['x'] * u + start_x, pos['y'] * u + start_y, 1, 1);
    var r = Math.floor(Math.random() * 1000) % 100;
    if (r == 0) {
      M = M1;
      N = N1;
    } else if (r > 0 && r < 86) {
      M = M2;
      N = N2;
    } else if (r > 85 && r < 93) {
      M = M3;
      N = N3;
    } else if (r > 92) {
      M = M4;
      N = N4;
    } 
    barnsley_func(M, N, pos);
  }
}

function capture_barnsley_form() {
  var canvas = document.getElementById('barnsley_canvas');
  var context = canvas.getContext('2d');
  var bform = document.getElementById('barnsley_form');
  var iters = bform.elements['iterations'].value;
  context.clearRect(0, 0, canvas.width, canvas.height);
  barnsley(400, 100, parseInt(iters), context);
}
