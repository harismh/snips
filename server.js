var express = require('express');
var bodyParser = require('body-parser');
var nedb = require('nedb'); 

var db = new nedb({ filename: './data/data.db', autoload: true });

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json()); 

app.get('/', function(req, res) {
  res.sendFile('./public/index.html');
});

app.get('/api/snips', function(req, res) {
  db.find({}, function(err, snippets) {
    if (err) {
      console.log('error fetching snips');
      throw err;
    } else {
      console.log('sending snippets...');
      res.json(snippets);
    }
  })
});

app.post('/api/snips', function(req, res) {
  db.insert(req.body, function(err, snippet) {
    if (err) {
      console.log('error posting snippet');
      throw err;
    } else {
      console.log('snippet posted successfuly');
      console.log(snippet);
    }
  })
})

app.delete('/api/snips', function(req, res) {
  console.log('recieved delete req...', req.body);
});

app.listen(8000);
console.log('Listening on port 8000...');