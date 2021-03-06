
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// Models
var LSystem = require('./models/lsystem');
var RuleParser = require('./models/rule_parser');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.post('/new_lsystem', function(req, res) {
  var rp = new RuleParser(req.body.rules);
  var alphabet = req.body.alphabet.split(', ');
  var angle_deg = parseFloat(req.body.angle);
  var angle = (Math.PI / 180.0) * angle_deg; 
  var rules = rp.parse();
  var draw_chars = req.body.draw_chars.split(', ');

  var canvas_width = parseInt(req.body.canvas_width);
  var canvas_height = parseInt(req.body.canvas_height);
  if (isNaN(canvas_width) || isNaN(canvas_height)) {
    canvas_width = 400;
    canvas_height= 400;
  }

  var ls = new LSystem(alphabet, req.body.axiom, rules, draw_chars);
  ls.set_angle(angle);
  ls.generate(req.body.iterations);

  res.render('lsys', {lsys: ls,
    title: 'L-System Drawing',
    canvas_height: canvas_height,
    canvas_width: canvas_width});
});

app.get('/barnsley_fern', function(req, res) {
  res.render('barnsley_fern');
});

app.get('/terrain', function(req, res) {
  res.render('terrain');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
