// DragonCurve
// 
// The angle to use is 90 degrees
// F = Move Forward
// X, Y = Placeholder
// + clockwise rotate
// - counterclockwise rotate

function DragonCurve(iters) {
  this.init_str = "FX";
  var str = this.init_str;
  for (var i = 0; i < iters; i++) {
    var new_str = "";
    for (var j = 0; j < str.length; j++) {
      c = str[j];
      if (c == 'X') {
	new_str += "X+YF+";
      } else if (c == 'Y') {
	new_str += "-FX-Y";
      } else {
	new_str += c;
      }
    } 
    str = new_str;
  }
  this.str = str;
}

// Given the string for a dragon curve and a canvas context, draw that curve to
// the context
function dragon_curve_draw(dstr, context, start_x, start_y, ulen) {
  var unit_len = ulen;
  var vec = {'x': 1, 'y': 0};
  var R = [[0, -1], [1, 0]];
  var Rccw = [[0, 1], [-1, 0]];
  var pos = {'x': start_x, 'y': start_y};

  context.beginPath();
  context.moveTo(pos['x'], pos['y']);

  for (var i = 0; i < dstr.length; i++) {
    var c = dstr[i];
    if (c == 'F') {
      pos['x'] += vec['x'] * unit_len;
      pos['y'] += vec['y'] * unit_len;
      context.lineTo(pos['x'], pos['y']);
      context.stroke();
    } else if (c == '-') {
      var tmpvec = {'x': vec['x'], 'y': vec['y']};
      vec['x'] = R[0][0] * tmpvec['x'] + R[0][1] * tmpvec['y'];
      vec['y'] = R[1][0] * tmpvec['x'] + R[1][1] * tmpvec['y'];
    } else if (c == '+') {
      var tmpvec = {'x': vec['x'], 'y': vec['y']};
      vec['x'] = Rccw[0][0] * tmpvec['x'] + Rccw[0][1] * tmpvec['y'];
      vec['y'] = Rccw[1][0] * tmpvec['x'] + Rccw[1][1] * tmpvec['y'];
    }
  }
}
