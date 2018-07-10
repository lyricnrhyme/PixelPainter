var pixelPainter = document.getElementById("pixelPainter");

var options = document.createElement("div");
options.id = "options";
pixelPainter.appendChild(options);

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

var currentColor = colorSquare[0].style.backgroundColor;
console.log(currentColor)

var eraseStatus = false;

function selectColor() {
    for (var i=0; i<colorSquare.length; i++) {
        if (colorSquare[i].style.border === "2px solid yellow") {
            colorSquare[i].style.border = "none";
        }
    }
    currentColor = this.style.backgroundColor;
    this.style.border = "2px solid yellow";
    eraseStatus = false;
}

var buttonsDiv = document.createElement("div");
buttonsDiv.id = "buttonsDiv";
options.appendChild(buttonsDiv);

var eraseButton = document.createElement("div");
eraseButton.id = "eraseButton";
eraseButton.innerHTML = "ERASE";
eraseButton.addEventListener("click", eraseTool);
buttonsDiv.appendChild(eraseButton);

function eraseTool() {
    eraseStatus = true;
}

var clearButton = document.createElement("div");
clearButton.id = "clearButton";
clearButton.innerHTML = "CLEAR";
clearButton.addEventListener("click", areYouSure);
buttonsDiv.appendChild(clearButton);

function areYouSure() {
    areYouSure.style.display = "block";
}

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
        canvasRow[i].appendChild(makeCanvasSquare);
    }
}

var canvasSquare = document.getElementsByClassName("canvasSquare");

var historyArr = [];
var historyIndex = 0;
function paint() {
    if (historyArr.length > historyIndex) {
        historyArr.splice(historyIndex, (historyIndex - historyArr.length));
    }
    historyArr.push([this]);
    historyIndex++;
    console.log(historyArr);
    console.log(historyIndex);
    if (eraseStatus === false) {
        this.style.backgroundColor = currentColor;
    } else {
        this.style.backgroundColor = null;
    } 
    historyArr[historyArr.length].push(currentColor);;
}

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
    for (var i=0; i<canvasSquare.length; i++) {
        canvasSquare[i].style.backgroundColor = null;
    }
    if (areYouSure.style.display === "block") {
        areYouSure.style.display = "none";
    }
    historyArr = [];
    historyIndex = 0;
}

var noButton = document.createElement("div");
noButton.id = "noButton";
noButton.innerHTML = "NO";
noButton.addEventListener("click", closeMenu);
areYouSure.appendChild(noButton);

function closeMenu() {
    areYouSure.style.display = "none";
}

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
        saveArr.push(canvasSquare[i].style.backgroundColor);
    }
    console.log(saveArr);
    console.log("Pic Saved!");
}

function loadPic() {
    if ((saveArr)) {
        for (var i=0; i<canvasSquare.length; i++) {
            canvasSquare[i].style.backgroundColor = saveArr[i];
        }
        console.log("Pic Loaded!");
    } else {
        console.log("Nothing to load");
    }
    historyArr = [];
    historyIndex = 0;
}

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
    if (historyIndex === 0) {
        console.log("Nothing to undo")
    } else {
        historyIndex--;
        console.log("Add function to call historyArr item"); //** 
    }

}

function redo() {
    if (historyIndex === historyArr.length) {
        console.log("Nothing to redo")
    } else {
        historyIndex++;
        console.log("Add function to call historyArr item");
    }

}

// for history array [index, color that was there, currentColor]