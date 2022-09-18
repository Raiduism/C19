var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(300,170);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  invisibleBlockGroup = new Group();
}

function draw() {
  background(200);
  
  
  if(gameState === "play"){
    spawndoors();
    if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3;
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3;
  }
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY + 0.5;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(ghost.y > 600||invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy();
    gameState = "over";
    
  }
  drawSprites();
  }
  if(gameState === "over"){
    textSize(30);
    text("GAMEOVER", 200, 300);
  }

  
  

  
}

function spawndoors()
{
  if(frameCount % 320 === 0){
    door = createSprite(200, -25);
    door.addImage(doorImg); 
    door.velocityY = 1;
    door.x = Math.round(random(100, 500));
    doorsGroup.add(door);
    door.lifetime = 600;
    climber = createSprite(200, 45);
    climber.addImage(climberImg); 
    climber.velocityY = 1;
    climber.x = door.x;
    climbersGroup.add(door);
    climber.lifetime = 600;
    ghost.depth = door.depth;
    ghost.depth += 1;
    invisibleBlock = createSprite(200, 50);
    invisibleBlock.velocityY = 1;
    invisibleBlock.x = door.x;
    invisibleBlockGroup.add(door);
    invisibleBlock.lifetime = 600;
    invisibleBlock.debug = true;
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
  }
}