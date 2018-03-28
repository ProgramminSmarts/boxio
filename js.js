var player  = document.getElementById('p');
var villain1 = document.getElementById('v');
var scoreDisp = document.getElementById('scoreDisp');
var pWidth = 25;
var pHeight = 25;
score = 0;
var foodTop;
var foodLeft;
player.style.left = "0px";
player.style.top = "0px";
var origin = [window.innerWidth/2, window.innerHeight/2];
var mousePos = [0, 0];
var pPos = [0, 0];
var vPos = [100,100];
player.style.left = origin[0] + "px";
player.style.top = origin[1] + "px";
var pSpeed = 1.5;
var vSpeed = 0.7;

//get mouseXY when mouse moves position
onmousemove = function(event){
  var e = event || window.event;
  mP = getXY(e.clientX, e.clientY);
  mousePos[0] = mP[0];
  mousePos[1] = mP[1];
};

function update () {
  var a = mousePos[0] - pPos[0];
  var b = mousePos[1] - pPos[1];
  var angle = Math.atan2(b, a);
  pPos[0] = pPos[0] + (pSpeed * Math.cos(angle));
  pPos[1] = pPos[1] + (pSpeed * Math.sin(angle));
  var pLT = getLeftTop(pPos[0], pPos[1]);
  player.style.left = pLT[0] + "px";
  player.style.top = pLT[1] + "px";
  player.style.width = pWidth + "px";
  player.style.height = pHeight + "px";
  
  var c = pPos[1]-vPos[1];
  var d = pPos[0]-vPos[0];
  var angle2 = Math.atan2(c, d);
  vPos[0] = vPos[0] + (vSpeed * Math.cos(angle2));
  vPos[1] = vPos[1] + (vSpeed * Math.sin(angle2));
  var pLT2 = getLeftTop(vPos[0], vPos[1]);
  villain1.style.left = pLT2[0] + "px";
  villain1.style.top = pLT2[1] + "px";
  
  //lose if mass = 0
  if (pWidth <= 5 || pHeight <=5) {
    lose();
  }
}

function getLeftTop (x, y) {
  return [x + origin[0], origin[1] - y]
}
function getXY (left, top) {
  x = left - origin[0];
  y = origin[1] - top;
  return [x, y]
}

/*function createFood () {
  foodLeft = Math.floor((Math.random()*(window.innerWidth-10))+5);
  foodTop = Math.floor((Math.random()*(window.innerHeight-10))+5);
  var colors = ["green", "orange", "red", "purple"];
  var color = colors[Math.floor(Math.random()*(colors.length-1))];
  sizes = [];
  for (i=3;i<7;i++) {
    sizes.push(i+"px");
  }
  size = sizes[Math.floor(Math.random()*(sizes.length))];
  var food = document.createElement("div");
  food.style.position = "absolute";
  food.style.width = size;
  food.style.height = size;
  food.style.top = foodTop + "px";
  food.style.left = foodLeft + "px";
  food.style.border = "2px solid black";
  food.style.color = color;
  food.style.background = color;
  document.body.appendChild(food);
  console.log(foodLeft + ".... " + foodTop + "........ " + color + "..... " + sizes+": "+size);
}
setInterval(createFood, 1200);*/

//mass gets smaller
function deplete () {
  setInterval(deplete, 2000)  
  pWidth *= 0.995;
  pHeight *= 0.995;
}

function countScore () {
  score += 1;
  scoreDisp.innerHTML = score;
  setInterval(countScore, 1000);
}
  
/*function distance (x1, y1, x2, y2) {
  return Math.sqrt(((x2-x1)**2)+((y2-y1)**2));  
}*/
  
function lose () {
}

/*
  How to Die:
	Villain touches you
	Mass = 0, Mass continually Goes down by a percent every second

Upgrades:
	Cost Points, get points from killing villains
	- magnet (attracts mass)
	- Multiplier (get more mass from each dot)
*/
