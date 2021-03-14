imag_e="";
status="";
object=[];
var x = document.getElementById("myAudio"); 

function setup(){
    canvas=createCanvas(600,500);
    canvas.position(500,230); 

    capture = createCapture(VIDEO);
    capture.hide();

    object_detection=ml5.objectDetector("COCO SSD",model_loded);
    document.getElementById("status").innerHTML="Status : Detecting Object"; 
}
function model_loded(){
    console.log("Model Loded!!");
    status=true;
    object_detection.detect(capture,gotResults);
}
function draw(){
    image(capture,0,0,600,500);
    if(status != ""){
        for(i=0 ; i < object.length;i++){
            document.getElementById("status").innerHTML="Status : Detected Object";
            document.getElementById("status").style.backgroundColor="green";

            percentage=floor(object[i].confidence*100);

            fill("red");
            stroke("red");
            text(object[i].label+" "+percentage+"%",object[i].x,object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
    if(object[1].label = "Person"){
        document.getElementById("name").innerHTML=" Baby Found";
    }
    else{
        document.getElementById("name").innerHTML=" Baby Not Found";
        x.play();
    }

}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        object= results;
        
    }
}

