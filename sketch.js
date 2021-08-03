const Engine = Matter.Engine;
const World = Matter.World;
const Bodies =  Matter.Bodies;
const Constraint = Matter.Constraint;
var bg,ground,gimg;
var runner,runnerImg;
var ice = [];
var maxSnow = 40;

function preload(){
  bg = loadImage("snow2.jpg");
  gimg = loadImage("ground.png");

  //sc stands for santa claus
  runnerImg = loadAnimation("sc/sc1.png","sc/sc2.png","sc/sc3.png","sc/sc4.png","sc/sc5.png","sc/sc6.png","sc/sc7.png","sc/sc8.png","sc/sc9.png","sc/sc10.png","sc/sc11.png","sc/sc12.png")
  
}

function setup() {
  createCanvas(1300,600);
  
  engine = Engine.create();
  world = engine.world;

  ground = createSprite(650,670);
  ground.addImage(gimg);
  ground.scale=3.2;
  ground.velocityX=-10;

  runner = createSprite(150,480);
  runner.addAnimation("runner",runnerImg)
  runner.scale=1.1;
  runner.velocityX=2;
  
  spawnIce();  
}

function draw() {
  background(bg);  

  Engine.update(engine);

  runner.collide(ground);
  
  if(ground.x < 530){
    ground.x=600;
  }

  if(runner.x > 1200){
    runner.x=150;
  }

  for(var i = 0;i < maxSnow; i++){
    ice[i].display();
    ice[i].changePosition();
  }

  if(keyWentDown("space")&& runner.y >= 100) {
    runner.velocityY = -12;
  }

  runner.velocityY = runner.velocityY + 1

  drawSprites();

}

function spawnIce(){
  if(frameCount % 250 === 0){
    for(var i=0; i<maxSnow; i++){
      ice.push(new Snow(random(0,1350), random(0,50)));
    }
  }
}
