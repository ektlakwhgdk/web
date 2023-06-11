var Links = {
    setColor: function (color) {
        $('a').css('color', color);


    }
}

var Body = {

    setColor: function (color) {
        $('body').css('color', color);
    },
    setBackgroundColor: function (color) {
        $('body').css('backgroundColor', color);
    }
}


const URL = "https://teachablemachine.withgoogle.com/models/kbLOIDTwH/";

let model, webcam, labelContainer, maxPredictions;

async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    
    const flip = true; 
    webcam = new tmImage.Webcam(200, 200, flip); 
    await webcam.setup(); 
    await webcam.play();
    window.requestAnimationFrame(loop);

    
    document.getElementById("webcam-container").appendChild(webcam.canvas);
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}


async function predict() {
    

    const prediction = await model.predict(webcam.canvas);
    if (prediction[0].probability > 0.5) {
        Body.setBackgroundColor('white');
        Body.setColor('black');
        self.value = 'night';
        Links.setColor('powderblue');
    }
    else {
        Body.setBackgroundColor('darkred');
        Body.setColor('White')
        self.value = 'day';
        Links.setColor('greenyellow');
    }

}
init();
