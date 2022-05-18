Status ="";
input_text ="";
objects =[];


function setup() {
    canvas= createCanvas(300,290);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(300, 290);
    video.hide();
}

function start() {
    object_detector =ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML ="Status : Object Detecting";
    input_text =document.getElementById("input_id").value;
}

function modelLoaded() {
    console.log("Model is Loaded");
    Status =true;
}

function draw() {
    image(video,0,0,300,290)
    if(Status != "") {
        object_detector.detect(video, gotResults);
        for(i=0; i<objects.length; i++) {
            document.getElementById("status").innerHTML ="Status : Object Detected";
            console.log(objects.length);
            fill("red");
            percent =floor(objects[i].confidence *100);
            text(objects[i].label + " " + percent +"%", objects[i].x,objects[i].y );
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label == input_text){
                video.stop();
                object_detector.detect(gotResults);
                document.getElementById("object_found").innerHTML =input_text + " Found ";
                synth =window.speechSynthesis;
                Utter_this = new SpeechSynthesisUtterance(input_text + " Found ");
                synth.speak(Utter_this);
            }
            else{
                document.getElementById("object_found").innerHTML =input_text + " Not Found ";
            }
        }
    }
}

function gotResults(error, result) {
    if(result) {
        console.log(result);
        objects =result;
    }else {
        console.error(error);
    }
}