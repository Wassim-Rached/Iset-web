var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var positions = [
  {
    head: { x: 300, y: 150 },
    leftEye: { x: 300, y: 150 },
    rightEye: { x: 300, y: 150 },
    nose: { x: 300, y: 140 },
    mouth: { x: 300, y: 170 },
    neck: { x: 300, y: 200 },
    leftArm: { x: 230, y: 280 },
    rightArm: { x: 370, y: 280 },
    torso: { x: 300, y: 350 },
    leftLeg: { x: 350, y: 430 },
    rightLeg: { x: 250, y: 430 },
  },
  {
    head: { x: 250, y: 150 },
    leftEye: { x: 250, y: 150 },
    rightEye: { x: 250, y: 150 },
    nose: { x: 250, y: 140 },
    mouth: { x: 250, y: 170 },
    neck: { x: 250, y: 200 },
    leftArm: { x: 180, y: 280 },
    rightArm: { x: 320, y: 280 },
    torso: { x: 250, y: 350 },
    leftLeg: { x: 300, y: 430 },
    rightLeg: { x: 200, y: 430 },
  },
  {
    head: { x: 350, y: 150 },
    leftEye: { x: 350, y: 150 },
    rightEye: { x: 350, y: 150 },
    nose: { x: 350, y: 140 },
    mouth: { x: 350, y: 170 },
    neck: { x: 350, y: 200 },
    leftArm: { x: 280, y: 280 },
    rightArm: { x: 420, y: 280 },
    torso: { x: 350, y: 350 },
    leftLeg: { x: 400, y: 430 },
    rightLeg: { x: 300, y: 430 },
  },
];

var currentPosIndex = 0;

document.body.onload = draw();

function draw() {
  var currentPos = positions[currentPosIndex];

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;

  // hanger
  ctx.beginPath();
  ctx.moveTo(200, 550);
  ctx.lineTo(200, 50);
  ctx.lineTo(300, 50);
  ctx.lineTo(300, 100);
  ctx.stroke();

  //
  ctx.strokeStyle = "red";
  ctx.fillStyle = "yellow";

  // head
  ctx.beginPath();
  ctx.arc(currentPos.head.x, currentPos.head.y, 50, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  // left eye
  ctx.beginPath();
  ctx.moveTo(currentPos.leftEye.x - 20, currentPos.leftEye.y - 25);
  ctx.lineTo(currentPos.leftEye.x - 10, currentPos.leftEye.y - 25);
  ctx.stroke();

  // righ eye
  ctx.beginPath();
  ctx.moveTo(currentPos.rightEye.x + 20, currentPos.rightEye.y - 25);
  ctx.lineTo(currentPos.rightEye.x + 10, currentPos.rightEye.y - 25);
  ctx.stroke();

  // nose
  ctx.beginPath();
  ctx.moveTo(currentPos.nose.x, currentPos.nose.y - 10);
  ctx.lineTo(currentPos.nose.x, currentPos.nose.y);
  ctx.stroke();

  // Mouth
  ctx.beginPath();
  ctx.moveTo(currentPos.mouth.x - 10, currentPos.mouth.y);
  ctx.lineTo(currentPos.mouth.x + 10, currentPos.mouth.y);
  ctx.stroke();

  // neck
  ctx.beginPath();
  ctx.moveTo(currentPos.neck.x, currentPos.neck.y);
  ctx.lineTo(currentPos.neck.x, currentPos.neck.y + 50);
  ctx.stroke();

  // left arm
  ctx.beginPath();
  ctx.moveTo(currentPos.neck.x, currentPos.neck.y + 50);
  ctx.lineTo(currentPos.leftArm.x, currentPos.leftArm.y);
  ctx.stroke();

  //   right arm
  ctx.beginPath();
  ctx.moveTo(currentPos.neck.x, currentPos.neck.y + 50);
  ctx.lineTo(currentPos.rightArm.x, currentPos.rightArm.y);
  ctx.stroke();

  //   torso
  ctx.beginPath();
  ctx.moveTo(currentPos.neck.x, currentPos.neck.y + 50);
  ctx.lineTo(currentPos.torso.x, currentPos.torso.y);
  ctx.stroke();

  //   left leg
  ctx.beginPath();
  ctx.moveTo(currentPos.torso.x, currentPos.torso.y);
  ctx.lineTo(currentPos.leftLeg.x, currentPos.leftLeg.y);
  ctx.stroke();

  //   right leg
  ctx.beginPath();
  ctx.moveTo(currentPos.torso.x, currentPos.torso.y);
  ctx.lineTo(currentPos.rightLeg.x, currentPos.rightLeg.y);
  ctx.stroke();
}

canvas.addEventListener("click", function () {
  // this methode of getting next index was from chatgpt
  currentPosIndex = (currentPosIndex + 1) % positions.length;
  draw();
});
