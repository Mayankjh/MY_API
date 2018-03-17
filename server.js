var fs = require('fs');
var data = fs.readFileSync('word.json');
var words = JSON.parse(data);
console.log(words);

var express = require('express');

var app = express();

app.use(express.static('public'));

var server = app.listen(3000, listening);

function listening(){
  console.log('listening to port 3000...');
}
// console.log('server is running');

//add word
app.get('/add/:word/:score?',addword);

function addword(request, response){
  var data = request.params;
  var word = data.word;
  var score = Number(data.score);
  var reply;
  if(!score){
   reply = {
      msg: "Score is required. "
    }
  }

  else{

  words[word] = score;
  var data = JSON.stringify(words,null,2)
  fs.writeFile('word.json', data, finished);

  function finished(err){
    console.log('all set...');
    var reply = {
      word: word,
      score: score,
      status:"success",
      msg: "Thank you For your Word. "
    }
      response.send(reply);
  }
 }
}

//get all words
app.get('/all',sendAll);

function sendAll(request, response){
 response.send(words);
}




//search word
app.get('/search/:word/',searchword);



function searchword(request, response){
  var word = request.params.word;
  var reply;
  if(words[word]){
    reply = {status:"found",
    word: word,
    score: words[word]
    }
  }
  else{
    reply = {
    status:"not found",
    word: word
    }
  }
  response.send(reply);
}
