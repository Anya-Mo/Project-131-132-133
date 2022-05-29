image_water_bottle="";
status_object="";
objects=[];
function preload() {
    image_water_bottle=loadImage("water bottle.png");
}
function setup() {
    canvas=createCanvas(600,400);
    canvas.position(345,175);
    object_detector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function draw() {
    if (status_object != "") {
        image(image_water_bottle,0,0,600,400);
        for (var i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("black");
            percentage=floor(objects[i].confidence*100);
            console.log(percentage);
            text(objects[i].label+" "+percentage+"%",objects[i].x+5,objects[i].y+15);
            noFill();
            stroke("black");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded");
    status_object=true;
    object_detector.detect(image_water_bottle,gotResults);
}
function gotResults(error,results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects=results;
    }
}