// L-System

// LSystem Model
//
// L-Systems are completely described by their alphabets (the list of
// variables they recognize), their axiom (the initial string that represents
// the system) and their production rules that describe what every symbol
// that the system recognizes will transform to on each iteration.
function LSystem(alphabet, axiom, rules) {
  this.alphabet = alphabet;
  this.axiom = axiom;
  this.rules = rules;
  this.str = "";

  this.generate = function(iters) {
    var str = this.axiom;
    var new_str;
    var c;
    for (var i = 0; i < iters; i++) {
      new_str = "";
      for (var j = 0; j < str.length; j++) {
	c = str[i];
	new_str += this.rules[c];
      }
      str = new_str;
    }
    this.str = str;
  }
}

// L-System Artist
//
// This object is used to draw L-Systems from a string and uses common rules
// that are semi-configurable.
function LSystemArtist(str, angle, draw_chars, ulen) {
  this.str = str; // The L-System string
  this.angle = angle; // The angle that the L-System uses
  this.draw_chars = draw_chars; // Characters that correspond to a "draw" act
  this.u = ulen; // Unit length

  // Set up the rotation matrices
  this.R = [[Math.cos(angle), -Math.sin(angle)],
            [Math.sin(angle), Math.cos(angle)]];
  this.Rm = [[Math.cos(angle), Math.sin(angle)],
             [-Math.sin(angle), Math.cos(angle)]];

  // Draw the L-System to a context (HTML5 canvas)
  this.draw = function(start_x, start_y, context) {
    var pos = {'x': start_x, 'y': start_y};
    var vec = {'x': 1.0, 'y', 0.0};
    var stack = [];

    context.moveTo(start_x, start_y);

    var c;
    for (var i = 0; i < this.str.length; i++) {
      c = this.str[i];
      if (this.draw_chars.indexOf(c) >= 0) {
	// Drawing Character
	context.moveTo(pos['x'], pos['y']);

	pos['x'] = pos['x'] + u * vec['x'];
	pos['y'] = pos['y'] + u * vec['y'];

	context.lineTo(pos['x'], pos['y']);
	context.stroke();
      } else {
	// Control Character
	if (c == '+') {
	  var tmp = {'x': vec['x'], 'y': vec['y']};
	  vec['x'] = R[0][0] * tmp['x'] + R[0][1] * tmp['y'];
	  vec['y'] = R[1][0] * tmp['x'] + R[1][1] * tmp['y'];
	} else if (c == '-') {
	  var tmp = {'x': vec['x'], 'y': vec['y']};
	  vec['x'] = Rm[0][0] * tmp['x'] + Rm[0][1] * tmp['y'];
	  vec['y'] = Rm[1][0] * tmp['x'] + Rm[1][1] * tmp['y'];
	} else if (c == '[') {
	  var tmp_pos = {'x': pos['x'], 'y': pos['y']};
	  var tmp_vec = {'x': vec['x'], 'y': vec['y']};
	  stack.push([tmp_pos, tmp_vec]);
	} else if (c == ']') {
	  var tmp = stack.pop();
	  pos['x'] = tmp[0]['x'];
	  pos['y'] = tmp[0]['y'];
	  vec['x'] = tmp[1]['x'];
	  vec['y'] = tmp[1]['y'];
	}
      }
    }
  }
}
