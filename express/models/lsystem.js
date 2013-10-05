// L-System Model
//
// Params:
//   alphabet is a list of variables (characters)
//   axiom is the inital string for the system
//   rules is an object containing production rules - e.g. {'X': 'Y'}
function LSystem(alphabet, axiom, rules) {
  this.alphabet = alphabet;
  this.axiom = axiom;
  this.rules = rules;
  this.str = axiom;

  // Generate the system for "iters" iterations
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

module.exports = LSystem;
