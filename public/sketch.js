
function setup() {
  createCanvas(400, 400);
  background(51);
  loadJSON('all', gotData);
  console.log('running');
}

function gotData(data){
  console.log(data);
  var keys = Object.keys(data);
  console.log(keys);
}
