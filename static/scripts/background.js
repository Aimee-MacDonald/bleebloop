var canvas = document.getElementById("background");
var screenWidth = canvas.width = window.innerWidth;
var screenHeight = canvas.height = window.innerHeight;
var mouseX, mouseY = 0;
var c = canvas.getContext("2d");

var nodes = new Array();

for(var i = 0; i < 50; i++){
  nodes.push(new Node(Math.random() * screenWidth, Math.random() * screenHeight));
}

// Mouse Movement
document.onmousemove = function(e){
  mouseX = e.pageX;
  mouseY = e.pageY;
};

// Window Resize
window.onresize = function(e){
  screenWidth = canvas.width = window.innerWidth;
  screenHeight = canvas.height = window.innerHeight;
}

function render(){
  requestAnimationFrame(render);
  // Clear Screen
  c.fillStyle = "white";
  c.beginPath();
  c.fillRect(0, 0, screenWidth, screenHeight);

  c.fillStyle = "#1782B0";
  c.strokeStyle = "#5DAACB";
  nodes.forEach(function(n){
    n.update();

    // Connect with Cursor
    var deltaX = n.x - mouseX;
    if(deltaX < 0) deltaX = deltaX * -1;
    var deltaY = n.y - mouseY;
    if(deltaY < 0) deltaY = deltaY * -1;

    if(deltaX < 100 && deltaY < 100){
      c.beginPath();
      c.moveTo(n.x, n.y);
      c.lineTo(mouseX, mouseY);
      c.stroke();
    }

    // Connect with Nearby Nodes
    nodes.forEach(function(n2){
      var deltaX = n.x - n2.x;
      if(deltaX < 0) deltaX = deltaX * -1;
      var deltaY = n.y - n2.y;
      if(deltaY < 0) deltaY = deltaY * -1;

      if(deltaX < 100 && deltaY < 100){
        c.beginPath();
        c.moveTo(n.x, n.y);
        c.lineTo(n2.x, n2.y);
        c.stroke();
      }
    });

    // Draw Node
    c.beginPath();
    c.arc(n.x, n.y, 2, 0, Math.PI * 2, true);
    c.fill();
  });
}

function Node(posX, posY){
  this.x = posX;
  this.y = posY;
  this.speedX = (Math.random() * 2) - 1;
  this.speedY = (Math.random() * 2) - 1;

  this.update = function(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x > screenWidth) this.x -= screenWidth;
    if(this.y > screenHeight) this.y -= screenHeight;
    if(this.x < 0) this.x += screenWidth;
    if(this.y < 0) this.y += screenHeight;
  }
}

render();
