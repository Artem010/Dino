const restartBtn = $('#restartBtn')
const startBtn = $('#startBtn')
const counterB = document.getElementById('counter')
let canvas = $('#cnv')[0]
console.log(canvas);
const context = canvas.getContext('2d')

let device
let  windowWidth
let speed = 3;
let player = {
  x: 50,
  y: canvas.height+50,
  width:32,
  height:32,
  ySpeed:0,
  jumping:false,
  gravity:0.75
}
if(window.screen.width < 600){
  windowWidth = window.screen.width
  device = 'phone'
  player.gravity = 0.55
  if(windowWidth < 350) speed = 1
  else if (windowWidth >=350 && windowWidth < 600) speed = 2
}else{
  device = 'pc'
  windowWidth = 600
}
const windowHeight = window.screen.height

let dist = 150
let xpos1 = 0
let xpos2 = 0
let xpos3 = 0
let ypos = 0
let endGame = false
let cubes =[]
let counter= 0
let oldCounter= 0
if(!oldCounter){
  oldCounter=localStorage.getItem('count')
}else
console.log(oldCounter);
$('#oldCounter b').html(oldCounter)

// localStorage.setItem('count', 0)


restartGame = (e)=>{
  counter = 0
  $('#oldCounter b').html(oldCounter)
  restartBtn.removeClass('show')
  endGame =false
  xpos1 = cube1.x + dist
  xpos2 = xpos1 + cube2.x + dist
  xpos3 = xpos2 + cube3.x + dist
  ypos1 = cube1.y
  ypos2 = cube1.y
  ypos3 = cube1.y
  console.log('restart');
}
function rnd(min,max){return Math.floor(Math.random() * (max- 0) + min)}

canvas.width = windowWidth
canvas.height = 250
canvas.style.background = '#ff8'
let cube1 = {
  width:16,
  height:32,
  x: canvas.width,
  y: canvas.height-20-32
}
let cube2 = {
  width:50,
  height:20,
  x: canvas.width,
  y: canvas.height-20-20

}
let cube3 = {
  width:20,
  height:50,
  x: canvas.width,
  y: canvas.height-20-50
}



controller = {
  up:false,
  listener: (e)=>{
    if( (e.type == 'keydown' && (e.keyCode == 38 || e.keyCode == 32) ) || e.type == 'touchstart' ){
      controller.up = true
      // console.log('SpeedGame='+speed+(0.5*counter/1000));
    }else controller.up = false
  }
}


draw = ()=>{

  if(
      ( (xpos1+new_cube1.width) >=50 && xpos1 <=82 ) && player.y >= (ypos1-new_cube1.height) ||
      ( (xpos2+new_cube2.width) >=50 && xpos2 <=82 ) && player.y >= (ypos2-new_cube2.height) ||
      ( (xpos3+new_cube3.width) >=50 && xpos3 <=82 ) && player.y >= (ypos3-new_cube3.height)
    ){

    context.clearRect(0,0, windowWidth, windowHeight)
    endGame = true
    restartBtn.addClass('show')
    if(Math.round(counter/10) > oldCounter){
      socket.emit('newPointsRes', {name:userName,points:Math.round(counter/10)})
      localStorage.setItem('count', Math.round(counter/10))
      oldCounter = Math.round(counter/10)
      console.log('add');
    }


  }else if (!endGame){
    context.clearRect(0,0, windowWidth, windowHeight)
    context.fillRect(player.x, player.y, player.width, player.height) //CREATE PLAYER

    context.beginPath();
    context.moveTo(0, context.canvas.height-20);
    context.lineTo(context.canvas.width, context.canvas.height-20);
    context.stroke();

    switch (rndCubes1) {
      case 1:
        new_cube1 = {
          width: cube1.width,
          height: cube1.height,
          y: cube1.y
        }
        context.fillRect(xpos1, new_cube1.y, new_cube1.width, new_cube1.height) //CREATE CUBES1
        break;
      case 2:
       new_cube1 = {
          width: cube2.width,
          height: cube2.height,
          y: cube2.y
        }
        context.fillRect(xpos1, new_cube1.y, new_cube1.width, new_cube1.height) //CREATE CUBES1
        break;
      case 3:
        new_cube1 = {
          width: cube3.width,
          height: cube3.height,
          y: cube3.y
        }
        context.fillRect(xpos1, new_cube1.y, new_cube1.width, new_cube1.height) //CREATE CUBES1
        break;
    }

    switch (rndCubes2) {
      case 1:
        new_cube2 = {
          width: cube1.width,
          height: cube1.height,
          y: cube1.y
        }
        context.fillRect(xpos2 , new_cube2.y, new_cube2.width, new_cube2.height) //CREATE CUBES2
        break;
      case 2:
         new_cube2 = {
          width: cube2.width,
          height: cube2.height,
          y: cube2.y
        }
        context.fillRect(xpos2 , new_cube2.y, new_cube2.width, new_cube2.height) //CREATE CUBES2
        break;
      case 3:
         new_cube2 = {
          width: cube3.width,
          height: cube3.height,
          y: cube3.y
        }
        context.fillRect(xpos2 , new_cube2.y, new_cube2.width, new_cube2.height) //CREATE CUBES2
        break;
    }

    switch (rndCubes3) {
      case 1:
        new_cube3 = {
          width: cube1.width,
          height: cube1.height,
          y: cube1.y
        }

        context.fillRect(xpos3 , new_cube3.y, new_cube3.width, new_cube3.height) //CREATE CUBES3
        break;
      case 2:
        new_cube3 = {
          width: cube2.width,
          height: cube2.height,
          y: cube2.y
        }
        context.fillRect(xpos3 , new_cube3.y, new_cube3.width, new_cube3.height) //CREATE CUBES3
        break;
      case 3:
        new_cube3 = {
          width: cube3.width,
          height: cube3.height,
          y: cube3.y
        }
        context.fillRect(xpos3 , new_cube3.y, new_cube3.width, new_cube3.height) //CREATE CUBES3
        break;
    }




    counter++
    $('#counter').html(Math.round(counter/10))
    // console.log('counter=' + Math.round(counter/10));


  }else{

    // console.log('end');
  }
}


function startGame() {
  startBtn.removeClass('show')
  updateCube()
}

let updateCube = () =>{
  requestAnimationFrame(updateCube)
  if (controller.up && player.jumping == false) {
    player.ySpeed -= 20;
    player.jumping = true;
  }
  player.ySpeed += player.gravity;// gravity
  player.y += player.ySpeed;
  player.ySpeed *= 0.9;// friction
  if (player.y > context.canvas.height- 20 - 32) {
    player.jumping = false;
    player.y = context.canvas.height -20 - 32;
    player.ySpeed = 0;
  }


  if(xpos1 < -cube1.width && !endGame){
    rndPixels1 = rnd(-450,450);
    rndCubes1 = rnd(1,3);
    xpos1 = xpos3+cube1.x + dist + rndPixels1
    console.log('rndCubes1=' + rndCubes1);


  }else if(xpos2 < -cube2.width && !endGame){
    rndPixels2 = rnd(-450,450);
    rndCubes2 = rnd(1,3);
    xpos2 = xpos1+ cube2.x + dist + rndPixels2
    console.log('rndCubes2=' + rndCubes2);

  }else if(xpos3 < -cube3.width && !endGame){
    rndPixels3 = rnd(-450,450);
    rndCubes3 = rnd(1,3);
    xpos3 = xpos2+ cube3.x +dist + rndPixels3
    console.log('rndCubes3=' + rndCubes3);

  }else{
    xpos1 -= (speed+(0.5*counter/1000))
    xpos2 -= (speed+(0.5*counter/1000))
    xpos3 -= (speed+(0.5*counter/1000))
  }
  draw()
}



// var rndPixels1 = rnd(100,250);
// var rndPixels2 = rnd(300,450);
// var rndPixels3 = rnd(500,600);
let rndCubes1 = rnd(1,3);
let rndCubes2 = rnd(1,3);
let rndCubes3 = rnd(1,3);
console.log('rndCubes1=' + rndCubes1);
console.log('rndCubes2=' + rndCubes2);
console.log('rndCubes3=' + rndCubes3);

xpos1 = cube1.x + dist
xpos2 = xpos1 + cube2.x + dist
xpos3 = xpos2 + cube3.x + dist
// console.log('xpos1=' + xpos1);  //750
// console.log('xpos2=' + xpos2);  //1500
// console.log('xpos3=' + xpos3);  //2250

ypos1 = cube1.y
ypos2 = cube1.y
ypos3 = cube1.y

var new_cube1 = {
  width: 0,
  height: 0,
  y: 0
}
var new_cube2 = {
  width: 0,
  height: 0,
  y: 0
}
var new_cube3 = {
  width: 0,
  height: 0,
  y: 0
}
// let new_cube2
// let new_cube3




window.addEventListener("touchstart", controller.listener)

window.addEventListener("touchend", controller.listener)
window.addEventListener("keydown", controller.listener)
window.addEventListener("keyup", controller.listener)
