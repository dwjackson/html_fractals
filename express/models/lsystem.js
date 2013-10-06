// L-System Model
//
// Params:
//   alphabet is a list of variables (characters)
//   axiom is the inital string for the system
//   rules is an object containing production rules - e.g. {'X': 'Y'}
function LSystem(alphabet, axiom, rules, draw_chars) {
  this.alphabet = alphabet;
  this.axiom = axiom;
  this.rules = rules;
  this.draw_chars = draw_chars;
  this.str = axiom;
  this.angle = 0.0;

  // Generate the system for "iters" iterations
  this.generate = function(iters) {
    var str = this.axiom;
    var new_str;
    var c;
    var iterations = parseInt(iters);

    for (var i = 0; i < iterations; i++) {
      new_str = "";
      for (var j = 0; j < str.length; j++) {
	c = str[j];
	new_str += this.rules[c];
      }
      str = new_str;
    }
    this.str = str;
  }

  // Set the angle for the system
  this.set_angle(angle) {
    this.angle = angle;
  }
}

module.exports = LSystem;
