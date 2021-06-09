
video = "";
status="";
object=[];
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(440, 340);
    canvas.center();
}




function start(){
objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
document.getElementById("status").innerHTML = "status : detecting objects";

}

function modelLoaded(){
    console.log("model loaded");

    status = true;
    video.loop();
    video.speed(1);
    video.volume(5)

}

function gotresult(error , result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        object = result;
    }
}

function draw(){
    image(video , 0 ,0 ,440 ,340 );

    if(status != ""){
        objectDetector.detect(video , gotresult);

        r = random(255);
        g = random(255);

    b = random(255);

        for(i = 0; i < object.length; i++){
            document.getElementById("status").innerHTML = "Status : objects detected";
            document.getElementById("num_of_objects").innerHTML = "number of objects detected" + object.length;

            fill(r , g , b);
            percent = floor(object[i].confidence * 100);
              text(object[i].label + " " + percent + "%" , object[i].x +50 , object[i].y + 50);
              noFill();
              stroke(r, g , b);
              rect(object[i].x - 50 , object[i].y , object[i].width - 60, object[i].height);
          
        }
    }
}

