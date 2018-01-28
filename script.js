let sentenceCounter = 0;
let currentCharacter = 0;
let currentSentence = 0;
let charactersWrong = 0;
let typingTime = 0;
let sentences = ["ten ate neite ate nee enet ite ate inet ent eate","Too ato too nOt enot one totA not anot tOO aNot", 
                    "oat itain oat tain nate eate tea anne inant nean", "itant eate anot eat nato inate eat anot tain eat", 
                    "nee ene ate ite tent tiet ent ine ene ete ene ate"];
var start = new Date();

let numOfWords = sentences.map((item)=>{
    console.log(item.split(" "))
    return Number(item.split(" ").length);
}).reduce((total, num2) => {
    return total + num2;
}, 0);

let changeBackgroundColor = (selector, color) => {
    $(selector).css("background-color", color);
};

let removeStyling = (selector) => {
    $(selector).removeAttr("style");
};

let shiftKeyboard = (keyBoardToHide, keyBoardToShow) => {
    $(keyBoardToHide).hide();
    $(keyBoardToShow).show();
};

let isKeyCodeACharacter = (keyCodeToCheck) => {
    return ((keyCodeToCheck + 32) <= 122 && (keyCodeToCheck + 32) >= 97);
};

let isKeyCodeAlphaNumeric = (keyCodeToCheck) => {
    return ((keyCodeToCheck === 32) || (keyCodeToCheck <= 122 && keyCodeToCheck >= 97) || (keyCodeToCheck + 32 <= 122 && keyCodeToCheck + 32 >= 97));
};

let addTextToSenteceDiv = (sentenceToAdd) => {
    for(let i = 0; i < sentenceToAdd.length; i++)
    {
        let charSpanToAdd = $(`<span>${sentenceToAdd.charAt(i)}</span>`);
        charSpanToAdd.attr("id", `char${i+1}`);
        $("#sentence").append(charSpanToAdd);

    }
};

let changeSentenceCursor = () => {
    let sentenceDiv = $("#sentence");
    let sentenceChildren = sentenceDiv.children();
    try{
        if(currentCharacter <= sentenceChildren.length-1){
            changeBackgroundColor(`#sentence #char${currentCharacter+1}`, "#FFFF00");
            if(currentCharacter > 0){
                removeStyling(`#sentence #char${currentCharacter}`);
            }
            currentCharacter++;
        }else if(currentCharacter === sentenceChildren.length){
            currentCharacter = 0;
            currentSentence++;
    
            emptyElement(sentenceDiv.empty());
            emptyElement($("#feedback").empty());
            addTextToSenteceDiv(sentences[currentSentence]);
            changeBackgroundColor(`#sentence #char${currentCharacter+1}`, "#FFFF00");
            currentCharacter++;
        }
    }catch(err){
        var elapsed = new Date() - start;
        elapsed /= 60000;
        typingTime = Math.round(numOfWords / elapsed - 2 * charactersWrong);

        alert("No more sentences! Time taken in Words Per Minute (WPM): " +  typingTime);
};

    }
let expectedLetter = (targetLetter) => {
    let characterDiv = $("#target-letter");

    characterDiv.empty();
    characterDiv.append(targetLetter);
};

let emptyElement = (elementToClear) => {
    elementToClear.empty();
}

let characterCheck = (charCodeToCheck) => {
    let doesCharCodeMatch = $(`#sentence #char${currentCharacter}`).text().charCodeAt() === charCodeToCheck;
    if(doesCharCodeMatch){
        let elementToAdd = $("<span></span>").addClass("glyphicon glyphicon-ok green");
        $("#feedback").append(elementToAdd);
    }else{
        let elementToAdd = $("<span></span>").addClass("glyphicon glyphicon-remove red");
        $("#feedback").append(elementToAdd);
        charactersWrong++;
    }

    return doesCharCodeMatch;
};


$(document).ready(() => {
    let sentenceDiv = $("#sentence");
    addTextToSenteceDiv(sentences[currentSentence]);
    changeSentenceCursor();
    expectedLetter($(`#sentence #char${currentCharacter}`).text());

    $(document).on("keydown", function( event ) {
        let currentKeyCode = event.which;
        console.log(`${currentKeyCode} ${String.fromCharCode(currentKeyCode)}`);
        let shiftPressed = event.shiftKey;
        console.log(`Shifted? ${shiftPressed}`);
        if (shiftPressed) {
            shiftKeyboard("#keyboard-lower-container", "#keyboard-upper-container");

            //check if ascii are numbers or letters
            if(isKeyCodeAlphaNumeric(currentKeyCode))
            {
                changeBackgroundColor("#" + currentKeyCode, "#FFFF00");
                if(characterCheck(currentKeyCode)){
                    changeSentenceCursor();
                    expectedLetter($(`#sentence #char${currentCharacter}`).text());
                }
                    
            }
            else
                changeBackgroundColor("#shift" + currentKeyCode, "#FFFF00");
        }else {
                let characterCode = isKeyCodeACharacter(currentKeyCode) ? (currentKeyCode + 32) : currentKeyCode; 
                changeBackgroundColor("#" + characterCode, "#FFFF00");
                if(characterCheck(characterCode)){
                    changeSentenceCursor();
                    expectedLetter($(`#sentence #char${currentCharacter}`).text());
                }
                    
        }
    }),$(document).on("keyup", function( event ) {
        let currentKeyCode = event.which;
        let shiftPressed = event.shiftKey;
        if (!shiftPressed) {
            shiftKeyboard( "#keyboard-upper-container", "#keyboard-lower-container");
            let characterCode = isKeyCodeACharacter(currentKeyCode) ? (currentKeyCode + 32) : currentKeyCode; 
            removeStyling("#" + characterCode);
        }else if(shiftPressed){
            //check if ascii are numbers or letters
            if(!isKeyCodeAlphaNumeric(currentKeyCode))
            {
                removeStyling("#shift" + currentKeyCode);
            }
            removeStyling("#" + currentKeyCode);
        }else{
            
        }
    });

});