function lsys_draw(start_x, start_y, context, lsys) {
  var pos = {'x': start_x, 'y': start_y};
  var vec = {'x': 1.0, 'y': 0.0};
  var stack = [];
  var u = 10; // Unit length

  // Rotation Matrices
  var angle = lsys.angle;
  var R_right = [[Math.cos(angle), -Math.sin(angle)],
                 [Math.sin(angle), Math.cos(angle)]];
  var R_left = [[Math.cos(angle), Math.sin(angle)],
                [-Math.sin(angle), Math.cos(angle)]];

  context.moveTo(pos['x'], pos['y']);

  var str = lsys.str;
  var c;
  for (var i = 0; i < str.length; i++) {
    c = str[i];
    if (lsys.draw_chars.indexOf(c) >= 0) {
      context.moveTo(pos['x'], pos['y']);
      pos['x'] = pos['x'] + u * vec['x'];
      pos['y'] = pos['y'] + u * vec['y'];
      context.lineTo(pos['x'], pos['y']);
      context.stroke();
    } else {
      if (c == '+') {
	// Turn right
	var tmp = {'x': vec['x'], 'y': vec['y']};
	vec['x'] = R_right[0][0] * tmp['x'] + R_right[0][1] * tmp['y'];
	vec['y'] = R_right[1][0] * tmp['x'] + R_right[1][1] * tmp['y'];
      } else if (c == '-') {
	// Turn left
	var tmp = {'x': vec['x'], 'y': vec['y']};
	vec['x'] = R_left[0][0] * tmp['x'] + R_left[0][1] * tmp['y'];
	vec['y'] = R_left[1][0] * tmp['x'] + R_left[1][1] * tmp['y'];
      } else if (c == '[') {
	// Store position and vector
	var tmp_pos = {'x': pos['x'], 'y': pos['y']};
	var tmp_vec = {'x': vec['x'], 'y': vec['y']};
	stack.push([tmp_pos, tmp_vec]);
      } else if (c == ']') {
	// Restore position and vector
	var tmp = stack.pop();
	pos['x'] = tmp[0]['x'];
	pos['y'] = tmp[0]['y'];
	vec['x'] = tmp[1]['x'];
	vec['y'] = tmp[1]['y'];
      }
    }
  }
}
