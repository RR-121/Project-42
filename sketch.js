var backgroundImg, ISS_Img, spacecraft_NoGas_Img, spacecraft_Gas_Img, spacecraft_RightGas_Img, spacecraft_LeftGas_Img;

var ISS_sprite, spacecraft_sprite, xPos, yPos;
var hasDocked = false;


function preload() {
  backgroundImg = loadImage("Project 42 Images/spacebg.jpg");
  ISS_Img = loadImage("Project 42 Images/iss.png");
  spacecraft_NoGas_Img = loadImage("Project 42 Images/spacecraft1.png");
  spacecraft_Gas_Img = loadImage("Project 42 Images/spacecraft2.png");
  spacecraft_LeftGas_Img = loadImage("Project 42 Images/spacecraft3.png");
  spacecraft_RightGas_Img = loadImage("Project 42 Images/spacecraft4.png");
}

function setup() {
  createCanvas(1000, 600);

  spacecraft_sprite = createSprite(280, 500);
  spacecraft_sprite.addImage("spacecraft", spacecraft_NoGas_Img);
  spacecraft_sprite.addImage("Going up", spacecraft_Gas_Img);
  spacecraft_sprite.addImage("Going down", spacecraft_Gas_Img);
  spacecraft_sprite.addImage("Going right", spacecraft_LeftGas_Img);
  spacecraft_sprite.addImage("Going left", spacecraft_RightGas_Img);
  spacecraft_sprite.scale = 0.3;

  ISS_sprite = createSprite(350, 260);
  ISS_sprite.addImage("ISS", ISS_Img);

  xPos = Math.round(random(180, 380));
  yPos = Math.round(random(450, 525));
}

function draw() {
  background(backgroundImg);

  if (!hasDocked) {
    spacecraft_sprite.x = xPos;
    spacecraft_sprite.y = yPos;
    if (keyDown(UP_ARROW)) {
      spacecraft_sprite.changeImage("Going up", spacecraft_Gas_Img);
      yPos -= 1;
    }
    if (keyDown(DOWN_ARROW)) {
      spacecraft_sprite.changeImage("Going down", spacecraft_Gas_Img);
      yPos += 1;
    }
    if (keyDown(RIGHT_ARROW)) {
      spacecraft_sprite.changeImage("Going right", spacecraft_LeftGas_Img);
      xPos += 1;
    }
    if (keyDown(LEFT_ARROW)) {
      spacecraft_sprite.changeImage("Going left", spacecraft_RightGas_Img);
      xPos -= 1;
    }
    if (ISS_sprite.x - 77 === spacecraft_sprite.x && ISS_sprite.y + 132 === spacecraft_sprite.y) {
      hasDocked = true;
    }
  }

  if(hasDocked) {
    xPos = 273;
    yPos = 392;
    spacecraft_sprite.changeImage("spacecraft", spacecraft_NoGas_Img);
    spacecraft_sprite.y = 352;
    spacecraft_sprite.x = 275;
    textSize(18);
    fill("White");
    text("Docking successful! Training exercise completed.", 250, 540)
  }

  drawSprites();
  controlPanel();
}

function controlPanel() {
  push();
  stroke("White");
  strokeWeight(3);
  fill("grey");
  rect(730, 180, 250, 40);
  rect(730, 220, 250, 150);
  line(730, 275, 980, 275);
  pop();

  push();
  fill("White");
  rect(820, 310, 80, 17);
  rect(820, 335, 80, 17);
  pop();

  push();
  textSize(20);
  stroke("Red");
  strokeWeight(1.5);
  fill("Red");
  textFont("Courier New");
  text("CONTROL PANEL", 777, 205);
  pop();

  push();
  textSize(13);
  fill("Black");
  text("TRAINING EXERCISE: Dock spacecraft to the ISS using arrow keys. Docking Coordinates- x : 273, y : 392.", 735, 225, 240, 1200);
  textSize(14);
  text("CURRENT COORDINATES", 768.5, 295);
  text("X", 795, 325);
  text("Y", 795, 350);
  text(xPos, 845, 323);
  text(yPos, 845, 348);
  pop();
}