/////////////////////
//Audio Elements
/////////////////////

var audio = document.createElement("audio");
audio.id = "audio";
audio.src = "assets/digitalDreams.mp3";
audio.preload = "auto";
audio.loop = true;
// audio.play();

window.onload = function() {
    audio.play();
}

var click = document.createElement("audio");
click.id = "click";
click.src = "assets/clickSound.wav";
click.preload = "auto";

/////////////////////
//Animated Title
/////////////////////

var titleDiv = document.createElement("div");
titleDiv.id = "titleDiv";
document.body.appendChild(titleDiv);

var titleText = "PIXEL-PAINTER";
for (var i=0; i<titleText.length; i++) {
    var splitTitle = titleText.split("");
    var makeCharDivs = document.createElement("div");
    makeCharDivs.className = "charDivs";
    makeCharDivs.innerHTML = splitTitle[i];
    titleDiv.appendChild(makeCharDivs);
}

var charDivs = document.getElementsByClassName("charDivs");

var titleSpacing = 50;
for (var i=0; i<charDivs.length; i++) {
    charDivs[i].style.left = titleSpacing;
    titleSpacing += 50;
}


/////////////////////
//Creating Pixel Painter Area
/////////////////////

var pixelPainter = document.getElementById("pixelPainter");

var options = document.createElement("div");
options.id = "options";
pixelPainter.appendChild(options);

/////////////////////
//Creating Color Options Area
/////////////////////

var colorDiv = document.createElement("div");
colorDiv.id = "colorDiv";
options.appendChild(colorDiv);

for (var i=0; i<10; i++) {
    var makeColorRow = document.createElement("div");
    makeColorRow.className = "colorRow";
    colorDiv.appendChild(makeColorRow);
}
var colorRow = document.getElementsByClassName("colorRow");

for (var i=0; i<colorRow.length; i++) {
    for (var j=0; j<8; j++) {
        var makeColorSquare = document.createElement("div");
        makeColorSquare.className = "colorSquare";
        makeColorSquare.addEventListener("click", selectColor);
        colorRow[i].appendChild(makeColorSquare);
    }
}

var colorSquare = document.getElementsByClassName("colorSquare");
colorSquare[0].style.border = "2px solid yellow";

var colorArr = ["indianred", "lightcoral", "salmon", "crimson", "red", "firebrick", "darkred", "maroon", "coral", "tomato", "orangered", "darkorange", "orange", "gold", "yellow", "sandybrown", "goldenrod", "darkgoldenrod", "khaki", "lime", "springgreen", "mediumseagreen", "seagreen", "forestgreen", "green", "darkgreen", "olivedrab", "lightseagreen", "darkcyan", "teal", "aqua", "turquoise", "mediumturquoise", "steelblue", "skyblue", "deepskyblue", "dodgerblue", "cornflowerblue", "blue", "mediumblue", "darkblue", "midnightblue", "darkslateblue", "slateblue", "indigo", "rebeccapurple", "purple", "darkorchid", "darkviolet", "blueviolet", "mediumorchid", "magenta", "orchid", "violet", "plum", "pink", "lightpink", "hotpink", "deeppink", "mediumvioletred", "burlywood", "tan", "rosybrown", "peru", "chocolate", "saddlebrown", "sienna", "brown", "black", "grey", "lightgrey", "white"]

for (var i=0; i<colorArr.length; i++) {
    colorSquare[i].style.backgroundColor = colorArr[i];
}

/////////////////////
//Select Color Function
/////////////////////

var currentColor = colorSquare[0].style.backgroundColor;
var eraseStatus = false;

function selectColor() {
    if (this.style.backgroundImage) {
        currentColor = null;
        currentImage = this.style.backgroundImage;
        console.log(currentImage);
        console.log(this.style.backgroundColor);
    } else {
        currentImage = null;
        currentColor = this.style.backgroundColor;
        console.log(currentImage);
        console.log(this.style.backgroundColor);
    }  
    for (var i=0; i<colorSquare.length; i++) {
        if (colorSquare[i].style.border === "2px solid yellow") {
            colorSquare[i].style.border = "none";
        }
    }
    this.style.border = "2px solid yellow";
    eraseStatus = false;
    click.play();
}

var imgArr = ["url(assets/avocadoGif.gif)", "url(assets/catGif.gif)", "url(assets/coverGif.gif)", "url(assets/dogGif.gif)", "url(assets/peeleGif.gif)", "url(assets/penguinGif.gif)", "url(assets/shiaGif.gif)", "url(assets/spaceGif.gif)"];

for (var i=0; i<imgArr.length; i++) {
    colorSquare[72+i].style.backgroundImage = imgArr[i];
    colorSquare[72+i].style.backgroundSize = "30px";
}
var currentImage;

/////////////////////
//Creating Erase and Clear Divs
/////////////////////

var eraseColorDiv = document.createElement("div");
eraseColorDiv.id = "eraseColorDiv";
options.appendChild(eraseColorDiv);

var eraseButton = document.createElement("div");
eraseButton.id = "eraseButton";
eraseButton.innerHTML = "ERASE";
eraseButton.addEventListener("click", eraseTool);
eraseColorDiv.appendChild(eraseButton);

function eraseTool() {
    eraseStatus = true;
}

var clearButton = document.createElement("div");
clearButton.id = "clearButton";
clearButton.innerHTML = "CLEAR";
clearButton.addEventListener("click", areYouSure);
eraseColorDiv.appendChild(clearButton);

function areYouSure() {
    click.play();
    disable();
    areYouSure.style.display = "block";
}

/////////////////////
//Creating Pixel Canvas
/////////////////////

var canvasDiv = document.createElement("div");
canvasDiv.id = "canvasDiv";
pixelPainter.appendChild(canvasDiv);

for (var i=0; i<20; i++) {
    var makeCanvasRow = document.createElement("div");
    makeCanvasRow.className = "canvasRow";
    canvasDiv.appendChild(makeCanvasRow);
}

var canvasRow = document.getElementsByClassName("canvasRow");

for (var i=0; i<canvasRow.length; i++) {
    for (var j=0; j<20; j++) {
        var makeCanvasSquare = document.createElement("div");
        makeCanvasSquare.className = "canvasSquare";
        makeCanvasSquare.addEventListener("mousedown", paint);
        makeCanvasSquare.addEventListener("mouseover", dragPaint);
        makeCanvasSquare.addEventListener("mouseup", stopPaint);
        canvasRow[i].appendChild(makeCanvasSquare);
    }
}

var canvasSquare = document.getElementsByClassName("canvasSquare");

/////////////////////
//Creating History Elements
/////////////////////

var historyArr = [];
var historyIndex = 0;
var changes = [];
var pixelDetail = [];
for (var i=0; i<canvasSquare.length; i++) {
    changes.push(canvasSquare[i].style.backgroundColor);
}
historyArr.push(changes);
changes = [];
console.log(historyArr);

/////////////////////
//Painting Functions
/////////////////////

var isClicked;

function paint() {
    if (historyArr.length-1 > historyIndex) {
        historyArr.splice(historyIndex+1, historyArr.length-historyIndex-1);
    }

    if (eraseStatus === false) {
        if (currentColor) {
            this.style.backgroundColor = currentColor;
            this.style.backgroundImage = null;
        } else if (currentImage) {
            this.style.backgroundImage = currentImage;
            this.style.backgroundSize = "30px";
            this.style.backgroundColor = null;
        }
    } else {
        this.style.backgroundColor = null;
        this.style.backgroundImage = null;
    } 
    isClicked = true;
    click.play();
}

function dragPaint() {
    if (isClicked) {
        if (eraseStatus === false) {
            if (currentColor) {
                this.style.backgroundColor = currentColor;
                this.style.backgroundImage = null;
            } else if (currentImage) {
                this.style.backgroundImage = currentImage;
                this.style.backgroundSize = "30px";
                this.style.backgroundColor = null;
            }
        } else {
            this.style.backgroundColor = null;
            this.style.backgroundImage = null;
        } 
    }
}

function stopPaint() {
    for (var i=0; i<canvasSquare.length; i++) {
        if (canvasSquare[i].style.backgroundColor) {
            pixelDetail[0] = true;
            pixelDetail[1] = canvasSquare[i].style.backgroundColor;
            changes.push(pixelDetail);
            pixelDetail = [];
        } else if (canvasSquare[i].style.backgroundImage) {
            pixelDetail[0] = false;
            pixelDetail[1] = canvasSquare[i].style.backgroundImage;
            changes.push(pixelDetail);
            pixelDetail = [];
        } else {
            changes.push([]);
        }
    }
    historyIndex++;
    historyArr.push(changes);
    changes = [];
    console.log(historyArr);
    console.log(historyIndex);
    isClicked = false;
    captionDiv.innerHTML = "";
    playVid();
}

/////////////////////
//Creating Clear Canvas Options
/////////////////////

var areYouSure = document.createElement("div");
areYouSure.id = "areYouSure";
areYouSure.innerHTML = "ARE YOU SURE?"
document.body.appendChild(areYouSure);
areYouSure.style.display = "none";

var yesButton = document.createElement("div");
yesButton.id = "yesButton";
yesButton.innerHTML = "YES";
yesButton.addEventListener("click", clearCanvas);
areYouSure.appendChild(yesButton);

function clearCanvas() {
    enable();
    for (var i=0; i<canvasSquare.length; i++) {
        canvasSquare[i].style.backgroundColor = null;
        canvasSquare[i].style.backgroundImage = null;
    }
    if (areYouSure.style.display === "block") {
        areYouSure.style.display = "none";
    }
    historyArr = [];
    historyIndex = 0;
    changes = [];
    for (var i=0; i<canvasSquare.length; i++) {
        changes.push(canvasSquare[i].style.backgroundColor);
    }
    historyArr.push(changes);
    changes = [];
    captionDiv.innerHTML = "CANVAS CLEARED";
    click.play();
}

var noButton = document.createElement("div");
noButton.id = "noButton";
noButton.innerHTML = "NO";
noButton.addEventListener("click", closeMenu);
areYouSure.appendChild(noButton);

function closeMenu() {
    enable();
    areYouSure.style.display = "none";
    click.play();
}

/////////////////////
//Creating Save/Load Options
/////////////////////

var saveLoadDiv = document.createElement("div");
saveLoadDiv.id = "saveLoadDiv";
options.appendChild(saveLoadDiv);

var saveButton = document.createElement("div");
saveButton.id = "saveButton";
saveButton.innerHTML = "SAVE";
saveButton.addEventListener("click", savePic);
saveLoadDiv.appendChild(saveButton);

var loadButton = document.createElement("div");
loadButton.id = "loadButton"; 
loadButton.innerHTML = "LOAD";
loadButton.addEventListener("click", loadPic);
saveLoadDiv.appendChild(loadButton);

var saveArr;
function savePic() {
    saveArr = [];
    for (var i=0; i<canvasSquare.length; i++) {
        if (canvasSquare[i].style.backgroundColor) {
            pixelDetail[0] = true;
            pixelDetail[1] = canvasSquare[i].style.backgroundColor;
            saveArr.push(pixelDetail);
            pixelDetail = [];
        } else if (canvasSquare[i].style.backgroundImage) {
            pixelDetail[0] = false;
            pixelDetail[1] = canvasSquare[i].style.backgroundImage;
            saveArr.push(pixelDetail);
            pixelDetail = [];
        } else {
            saveArr.push([]);
        }
    }
    console.log(saveArr);
    console.log("Pic Saved!");
    captionDiv.innerHTML = "PIC SAVED!";
    click.play();
}

function loadPic() {
    if ((saveArr)) {
        for (var i=0; i<canvasSquare.length; i++) {
            if (saveArr[i][0] === true) {
                canvasSquare[i].style.backgroundColor = saveArr[i][1];
                canvasSquare[i].style.backgroundImage = null;
            } else if (saveArr[i][0] === false) {
                canvasSquare[i].style.backgroundImage = saveArr[i][1];
                canvasSquare[i].style.backgroundSize = "30px";
                canvasSquare[i].style.backgroundColor = null;
            } else {
                canvasSquare[i].style.backgroundColor = null;
                canvasSquare[i].style.backgroundImage = null;
            }
        }
        console.log("Pic Loaded!");
        captionDiv.innerHTML = "PIC LOADED!";
    } else {
        console.log("Nothing to load");
        captionDiv.innerHTML = "NOTHING TO LOAD";
    }
    
    historyArr = [];
    historyIndex = 0;
    changes = [];
    for (var i=0; i<canvasSquare.length; i++) {
        changes.push(canvasSquare[i].style.backgroundColor);
    }
    historyArr.push(changes);
    changes = [];
    click.play();
}

/////////////////////
//Creating Undo/Redo Options
/////////////////////

var actionDiv = document.createElement("div");
actionDiv.id = "actionDiv";
options.appendChild(actionDiv);

var undoButton = document.createElement("div");
undoButton.id = "undoButton";
undoButton.innerHTML = "UNDO";
undoButton.addEventListener("click", undo);
actionDiv.appendChild(undoButton);

var redoButton = document.createElement("div");
redoButton.id = "redoButton";
redoButton.innerHTML = "REDO";
redoButton.addEventListener("click", redo);
actionDiv.appendChild(redoButton);

function undo() {
    historyIndex--;
    if (historyIndex < 0) {
        historyIndex++;
        console.log("Nothing to undo");
        captionDiv.innerHTML = "NOTHING TO UNDO";
        console.log(historyIndex);
    } else {
        for (var i=0; i<canvasSquare.length; i++) {
            if (historyArr[historyIndex][i][0] === true) {
                canvasSquare[i].style.backgroundColor = historyArr[historyIndex][i][1];
                canvasSquare[i].style.backgroundImage = null;
            } else if (historyArr[historyIndex][i][0] === false) {
                canvasSquare[i].style.backgroundImage = historyArr[historyIndex][i][1];
                canvasSquare[i].style.backgroundSize = "30px";
                canvasSquare[i].style.backgroundColor = null;
            } else {
                canvasSquare[i].style.backgroundColor = null;
                canvasSquare[i].style.backgroundImage = null;
            }
        }
        captionDiv.innerHTML = "";
        console.log(historyArr);
        console.log(historyIndex);
    }
    click.play();
}

function redo() {
    historyIndex++;
    if (historyIndex === historyArr.length) {
        historyIndex--;
        console.log("Nothing to redo");
        captionDiv.innerHTML = "NOTHING TO REDO";
        console.log(historyIndex);
    } else {
        for (var i=0; i<canvasSquare.length; i++) {
            if (historyArr[historyIndex][i][0] === true) {
                canvasSquare[i].style.backgroundColor = historyArr[historyIndex][i][1];
                canvasSquare[i].style.backgroundImage = null;
            } else if (historyArr[historyIndex][i][0] === false) {
                canvasSquare[i].style.backgroundImage = historyArr[historyIndex][i][1];
                canvasSquare[i].style.backgroundSize = "30px";
                canvasSquare[i].style.backgroundColor = null;
            } else {
                canvasSquare[i].style.backgroundColor = null;
                canvasSquare[i].style.backgroundImage = null;
            }
        }
        captionDiv.innerHTML = "";
        console.log(historyArr);
        console.log(historyIndex);
    }   
    click.play();
}

/////////////////////
//Creating Captions Div to Display Comments
/////////////////////

var captionDiv = document.createElement("div");
captionDiv.id = "captionDiv";
captionDiv.innerHTML = "";
document.body.appendChild(captionDiv)

/////////////////////
//Creating Video Div that will pop up
/////////////////////

var videoDiv = document.createElement("div");
videoDiv.id = "videoDiv";
videoDiv.style.display = "none";
document.body.appendChild(videoDiv);

var closeVideoOptions = document.createElement("div");
closeVideoOptions.id = "closeVideoOptions";
videoDiv.appendChild(closeVideoOptions);

var closeVideoDiv = document.createElement("div");
closeVideoDiv.id = "closeVideoDiv";
closeVideoDiv.innerHTML = "X";
closeVideoDiv.addEventListener("click", closeVideo);
closeVideoOptions.appendChild(closeVideoDiv);

function closeVideo() {
    for (var i=0; i<videos.length; i++) {
        if (videos[i].style.display === "block") {
            videos[i].style.display = "none";
            videos[i].pause();
            videos[i].currentTime = 0;
        }
    }
    videoDiv.style.display = "none";
    audio.play();
    enable();
    document.body.style.backgroundImage = 'url("assets/spaceBackground.png")';
    click.play();
}

var videoArr = ["assets/avocadoVid.mp4", "assets/catVid.mp4", "assets/coverVid.mp4", "assets/dogVid.mp4", "assets/peeleVid.mp4", "assets/penguinVid.mp4", "assets/shiaVid.mp4", "assets/spaceVid.mp4"];

for (var i=0; i<videoArr.length; i++) {
    var makeVideo = document.createElement("video");
    makeVideo.className = "videos";
    makeVideo.src = videoArr[i];
    makeVideo.style.display = "none";
    videoDiv.appendChild(makeVideo);
}

var videos = document.getElementsByClassName("videos");

/////////////////////
//Making Videos Visible Function
/////////////////////

function playVid() {
    //AVOCADO
    if (canvasSquare[0].style.backgroundImage === 'url("assets/avocadoGif.gif")' && canvasSquare[19].style.backgroundImage === 'url("assets/avocadoGif.gif")' && canvasSquare[380].style.backgroundImage === 'url("assets/avocadoGif.gif")' && canvasSquare[399].style.backgroundImage === 'url("assets/avocadoGif.gif")') {
        
        videoDiv.style.display = "block";
        videos[0].style.display = "block";
        videos[0].play();
        audio.pause();
        disable();
        // console.log("Avocado");
        // return "Avocado";

    //CAT
    } else if (canvasSquare[0].style.backgroundImage === 'url("assets/catGif.gif")' && canvasSquare[19].style.backgroundImage === 'url("assets/catGif.gif")' && canvasSquare[380].style.backgroundImage === 'url("assets/catGif.gif")' && canvasSquare[399].style.backgroundImage === 'url("assets/catGif.gif")') {

        videoDiv.style.display = "block";
        videos[1].style.display = "block";
        videos[1].play();
        audio.pause();
        disable();
        // console.log("Cat");
        // return "Cat";

    //COVER
    } else if (canvasSquare[0].style.backgroundImage === 'url("assets/coverGif.gif")' && canvasSquare[19].style.backgroundImage === 'url("assets/coverGif.gif")' && canvasSquare[380].style.backgroundImage === 'url("assets/coverGif.gif")' && canvasSquare[399].style.backgroundImage === 'url("assets/coverGif.gif")') {

        videoDiv.style.display = "block";
        videos[2].style.display = "block";
        videos[2].play();
        audio.pause();
        disable();
        // console.log("Cover");
        // return "Cover";

    //DOG
    } else if (canvasSquare[0].style.backgroundImage === 'url("assets/dogGif.gif")' && canvasSquare[19].style.backgroundImage === 'url("assets/dogGif.gif")' && canvasSquare[380].style.backgroundImage === 'url("assets/dogGif.gif")' && canvasSquare[399].style.backgroundImage === 'url("assets/dogGif.gif")') {

        videoDiv.style.display = "block";
        videos[3].style.display = "block";
        videos[3].play();
        audio.pause();
        disable();
        // console.log("Dog");
        // return "Dog";

    //PEELE
    } else if (canvasSquare[0].style.backgroundImage === 'url("assets/peeleGif.gif")' && canvasSquare[19].style.backgroundImage === 'url("assets/peeleGif.gif")' && canvasSquare[380].style.backgroundImage === 'url("assets/peeleGif.gif")' && canvasSquare[399].style.backgroundImage === 'url("assets/peeleGif.gif")') {

        videoDiv.style.display = "block";
        videos[4].style.display = "block";
        videos[4].play();
        audio.pause();
        disable();
        // console.log("Peele");
        // return "Peele";

    //PENGUIN
    } else if (canvasSquare[0].style.backgroundImage === 'url("assets/penguinGif.gif")' && canvasSquare[19].style.backgroundImage === 'url("assets/penguinGif.gif")' && canvasSquare[380].style.backgroundImage === 'url("assets/penguinGif.gif")' && canvasSquare[399].style.backgroundImage === 'url("assets/penguinGif.gif")') {

        videoDiv.style.display = "block";
        videos[5].style.display = "block";
        videos[5].play();
        audio.pause();
        disable();
        // console.log("Penguin");
        // return "Penguin";

    //SHIA
    } else if (canvasSquare[0].style.backgroundImage === 'url("assets/shiaGif.gif")' && canvasSquare[19].style.backgroundImage === 'url("assets/shiaGif.gif")' && canvasSquare[380].style.backgroundImage === 'url("assets/shiaGif.gif")' && canvasSquare[399].style.backgroundImage === 'url("assets/shiaGif.gif")') {

        videoDiv.style.display = "block";
        videos[6].style.display = "block";
        document.body.style.backgroundImage = 'url("/assets/shiaBackground.jpg")';
        videos[6].play();
        audio.pause();
        disable();
        // console.log("Shia");
        // return "Shia";

    //SPACE
    } else if (canvasSquare[0].style.backgroundImage === 'url("assets/spaceGif.gif")' && canvasSquare[19].style.backgroundImage === 'url("assets/spaceGif.gif")' && canvasSquare[380].style.backgroundImage === 'url("assets/spaceGif.gif")' && canvasSquare[399].style.backgroundImage === 'url("assets/spaceGif.gif")') {

        videoDiv.style.display = "block";
        videos[7].style.display = "block";
        videos[7].play();
        audio.pause();
        disable();
        // console.log("Space");
        // return "Space";

    } else {
        return;
    }
};

function disable() {
    for (var i=0; i<colorSquare.length; i++) {
        colorSquare[i].removeEventListener("click", selectColor);
    }
    eraseButton.removeEventListener("click", eraseTool);
    clearButton.removeEventListener("click", areYouSure);
    for (var i=0; i<canvasSquare.length; i++) {
        canvasSquare[i].removeEventListener("mousedown", paint);
        canvasSquare[i].removeEventListener("mouseover", dragPaint);
        canvasSquare[i].removeEventListener("mouseup", stopPaint);
    }
    saveButton.removeEventListener("click", savePic);
    loadButton.removeEventListener("click", loadPic);
    undoButton.removeEventListener("click", undo);
    redoButton.removeEventListener("click", redo);
}

function enable() {
    for (var i=0; i<colorSquare.length; i++) {
        colorSquare[i].addEventListener("click", selectColor);
    }
    eraseButton.addEventListener("click", eraseTool);
    clearButton.addEventListener("click", areYouSure);
    for (var i=0; i<canvasSquare.length; i++) {
        canvasSquare[i].addEventListener("mousedown", paint);
        canvasSquare[i].addEventListener("mouseover", dragPaint);
        canvasSquare[i].addEventListener("mouseup", stopPaint);
    }
    saveButton.addEventListener("click", savePic);
    loadButton.addEventListener("click", loadPic);
    undoButton.addEventListener("click", undo);
    redoButton.addEventListener("click", redo);
}