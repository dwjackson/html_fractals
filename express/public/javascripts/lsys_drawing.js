function lsys_draw(start_x, start_y, context, str) {
  var pos = {'x': start_x, 'y': start_y};
  var vec = {'x': 1.0, 'y': 0.0};
  var stack = [];

  context.moveTo(pos['x'], pos['y']);

  var c;
  for (var i = 0; i < str.length; i++) {
    c = str[i];
    if (c == '+') {
      // Turn right
    } else if (c == '-') {
      // Turn left
    } else if (c == '[') {
      // Store position and vector
    } else if (c == ']') {
      // Restore position and vector
    }
  }
}
