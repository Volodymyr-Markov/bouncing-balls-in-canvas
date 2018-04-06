document.addEventListener('DOMContentLoaded', function () {
var canvas;
var context;
var balls = [];
var ballsAmount = 20;

canvas = document.getElementById("canvas");
context = canvas.getContext("2d");

function randomRadius() {
  var rand = 10 + Math.random() * (40 + 1 - 10);
  rand = Math.floor(rand);
  return rand;
}

function randomColor() {

  var letter = "0123456789ABCDEF".split(""); 
  var color = "#";                           
  for(var i = 0; i < 6; i++){                
    color += letter[Math.round(Math.random()*15)]; 
  }
  return color;
}

function Ball() {
  this.dx = 2;
  this.dy = 3;
  this.radius = randomRadius();
  this.color = randomColor();
  this.x = this.radius;
  this.y = this.radius;
}

for(var i=0; i<ballsAmount; i++) {
    (function(i) {
        setTimeout(function() {
          var ball = new Ball();
              balls[i] = ball;
              console.log(balls[i])
        }, 5000*i);
    })(i);
}

function drawFrame() {

context.clearRect(0, 0, canvas.width, canvas.height);

  // Перебираем все мячики
  for(var i=0; i<balls.length; i++) {
        
    // Рисуем мячик
    context.beginPath();
    context.arc(balls[i].x, balls[i].y, balls[i].radius, 0, Math.PI*2);
    context.fillStyle = balls[i].color;
    context.fill();
    context.closePath();

    // Если мячик натолкнулся на край холста, отбиваем его
      
    if(balls[i].x + balls[i].dx > canvas.width-balls[i].radius || balls[i].x + balls[i].dx < balls[i].radius) {
      balls[i].dx = -balls[i].dx;
    }
    if(balls[i].y + balls[i].dy > canvas.height-balls[i].radius || balls[i].y + balls[i].dy < balls[i].radius) {
      balls[i].dy = -balls[i].dy;
    }

    // Перемещаем каждый мячик в его новую позицию
    balls[i].x += balls[i].dx;
    balls[i].y += balls[i].dy;

  }

    /*requestAnimationFrame(drawFrame);*/

}
/*requestAnimationFrame(drawFrame)*/
setInterval(drawFrame, 20);
})