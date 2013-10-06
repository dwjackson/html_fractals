// L-System Rule Parser
function RuleParser(str) {
  this.str = str;
  this.rules = {};

  this.parse = function() {
    var c, d;
    var env = 0;
    var rule_str;
    var variable;

    for (var i = 0; i < this.str.length; i++) {
      c = this.str[i];
      if (i > 0) {
	d = this.str[i-1];
      } else {
	d = null;
      }

      if (c == '(') {
	env = 1;
	rule_str = "";
      } else if ((c.search(/[A-Z]/) == 0 || c.search(/[\+\-\[\]]/) == 0)
                 && env == 1) {
	variable = c;
      } else if (c == '>' && d == '-') {
	env = 2;
      } else if ((c.search(/[A-Z]/) == 0 || c.search(/[\+-\[\]]/) == 0)
                 && env == 2) {
	rule_str += c;
      } else if (c == ')') {
	this.rules[variable] = rule_str;
	env = 0;
      }
    }

    return this.rules;
  }
}

module.exports = RuleParser;
