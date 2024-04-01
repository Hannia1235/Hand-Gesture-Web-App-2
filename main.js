Webcam.set({
    width:350;
    height:300;
    image_format: 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attatch( '#camera' );

function take_snapshot() {
Webcam.snap(function(data_uri) {
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
});
}

console.log('ml5 version:', ml5.version);

Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/LA3HC-LMV/model.json',modelLoaded);

function modelLoaded() 
{
   console.log('Model Loaded!');
}

function check()
{
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);

        document.getElementById("result_object_name").innerHTML = results[0].label;

        gesture = results[0].label;

        toSpeak = "";

        if(gesture == "Ok")
        {
            toSpeak = "That's Ok";
            document.getElementById("result_object_gesture_icon ").innerHTML = "&#128076";
        } else if(gesture == "Hello")
        {
            toSpeak = "Hello!";
            document.getElementById("result_object_gesture_icon ").innerHTML = "&#128075";
        }else if(gesture == "Good")
        {
            toSpeak = "That's Great";
            document.getElementById("result_object_gesture_icon ").innerHTML = "&#128077";
        }

        speak();
    }
}

function speak() 
{
    var synth = window.speechSynthesis;

    speak_data = toSpeak();

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);
}
