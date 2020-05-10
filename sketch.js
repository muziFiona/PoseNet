let video;//own name, you name that var as long as you can match the function below
let poseNet;
let noseX = 0;
let noseY = 0;
let eyelX = 0; //x position of left eye
let eyelY = 0;


function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  //console.log(ml5); //the console means the part below
  poseNet = ml5.poseNet(video, modelReady); //I want to load the model, and tell me when it's ready 
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses){
  //console.log(poses);//detecting poses and update under, it is analysising which part of the body is showing in camera
  
  if(poses.length>0){
    let nX = poses[0].pose.keypoints[0].position.x //search from the console
    let nY = poses[0].pose.keypoints[0].position.y
    
    let eX = poses[0].pose.keypoints[1].position.x 
    let eY = poses[0].pose.keypoints[1].position.y
    
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyelX = lerp(eyelX, eX, 0.5);
    eyelY = lerp(eyelY, eY, 0.5);
  }
}


function modelReady(){
  console.log('model ready');

}

function draw() {
  image(video, 0, 0);
  
  let d = dist(noseX, noseY, eyelX, eyelY);
  
  fill(255, 0,0);
  ellipse(noseX, noseY, d);
  
  //fill(0,0,255); //the eye display
  //ellipse(eyelX, eyelY, 50);

}