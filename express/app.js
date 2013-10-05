
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
  var angle = parseFloat(req.body.angle);
  var rules = rp.parse();
  var lsys = new LSystem(alphabet, req.body.axiom, rules);
  lsys.set_angle(angle);
  lsys.generate(req.body.iterations);
  console.log('[DEBUG] lsys = ' + JSON.stringify(lsys));
  res.render('lsys', {lsys_str: lsys.str, title: 'L-System Drawing'});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
