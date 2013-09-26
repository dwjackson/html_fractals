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

/*
Copyright (c) 2013, David Jackson
All rights reserved.

Redistribution and use in source and binary form, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided in the distribution.
    * Neither the name of David Jackson nor the names of other contributers
      may be used to endorse or promote products derived from this software
      without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL DAVID JACKSON BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
