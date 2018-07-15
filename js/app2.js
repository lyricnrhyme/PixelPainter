const myFunc = (function() {
    var currentColor = colorSquare[0].style.backgroundColor;
    var currentImage;
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
    };

    function eraseTool() {
        eraseStatus = true;
    };

    function areYouSure() {
        disable();
        areYouSure.style.display = "block";
    };

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
    };

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
    }

    function closeMenu() {
        enable();
        areYouSure.style.display = "none";
    }

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
    }

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
    }

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
    }

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

    return {
        selectColor: selectColor,
        eraseTool: eraseTool,
        areYouSure: areYouSure,
        paint: paint,
        dragPaint: dragPaint,
        stopPaint: stopPaint,
        clearCanvas: clearCanvas,
        closeMenu: closeMenu,
        savePic: savePic,
        loadPic: loadPic,
        undo: undo,
        redo: redo,
        closeVideo: closeVideo,
        playVid: playVid,
        disable: disable,
        enable: enable
    }
})();