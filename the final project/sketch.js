var monkey, monkey_running, monkey_collided;
var banana, bananaImage, apple, appleImage, obstacleImage;
var bananaGroup, appleGroup, cloudsGroup;
var backgroundImage;
var gameOver, gameOverImage, restart, restartImage;
var invisibleGround,backGround;
var score=0;
var gameState="PLAY";

function preload(){
monkey_running = loadAnimation("pictures/monkey walking .gif");

bananaImage = loadImage("pictures/banana.png");
appleImage = loadImage("pictures/apple.jpg");
backgroundImage = loadImage("pictures/jungle png.jpg");
//groundImage = loadImage("pictures/ground.jpg");
gameOverImage = loadImage("pictures/game over.png");
restartImage = loadImage("pictures/restart.png");
}

function setup() {
  createCanvas(800,400);
  backGround = createSprite(400,200,100,400);
  backGround.addImage("background",backgroundImage);
  backGround.scale=3;
  monkey = createSprite(50,380,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.7;
  
  
  //ground = createSprite(300,390,800,20);
  //ground.addImage(groundImage);

  invisibleGround = createSprite(400,395,800,10);
  invisibleGround.visible = false;

  gameOver = createSprite(400,200,20,20);
  gameOver.addImage(gameOverImage);
  gameOver.scale=0.5;

  restart = createSprite(400,100,20,20);
  bananaGroup=new Group();
  appleGroup=new Group();
  
}

function draw() {
background(0)

stroke("black");
  textSize(20);  
  fill("black");
  text("Survival Time: "+score,110,100);
  
  if(gameState==="PLAY"){
    text("Get bonus 100 points for banana",50,50);
    backGround.velocityX=-3 ;
    if(backGround.x<0){
      backGround.x=width/2;
    }
     
    gameOver.visible=false;
    restart.visible=false;
    score=score + Math.round(frameCount/200); 
   
 //monkey jump
if(keyDown("J")){
  monkey.velocityY=-10;
}
monkey.velocityY = monkey.velocityY+1;
spawningBanana();
spawningApple();
if(bananaGroup.isTouching(monkey)){
  score=score+5;
}
 if(appleGroup.isTouching(monkey)){
  gameState="End";
}
  }
  if(gameState==="End"){
    gameOver.visible=true;
    restart.visible=true;
    bananaGroup.destroyEach();
    appleGroup.destroyEach();
    backGround.velocityX=0;
    monkey.velocityY=0
  }

monkey.collide(invisibleGround);
  drawSprites();
  textSize(30);
  text("Score:"+score,650,20);

}

function spawningApple(){
  if(frameCount % 100 ===0){
    apple=createSprite(800,40,20,20);
    apple.velocityX=-4;
    apple.addImage("apple",appleImage);
    apple.scale=0.2;
    apple.lifetime=200;
    appleGroup.add(apple);

  }
}

function spawningBanana(){
  if(frameCount % 60 ===0){
    banana=createSprite(800,50,20,20);
    banana.velocityX= -6;
    banana.addImage("banana",bananaImage);
    banana.scale =0.05;
    banana.lifetime=133;
    bananaGroup.add(banana);
    
  }
}
