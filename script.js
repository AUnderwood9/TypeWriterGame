let sentenceCounter = 0;
let currentCharacter = 0;
let currentSentence = 0;
let sentences = ["ten ate neite ate nee enet ite ate inet ent eate","Too ato too nOt enot one totA not anot tOO aNot", 
                    "oat itain oat tain nate eate tea anne inant nean", "itant eate anot eat nato inate eat anot tain eat", 
                    "nee ene ate ite tent tiet ent ine ene ete ene ate"];

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
    return ((keyCodeToCheck === 32) || (keyCodeToCheck <= 122 && keyCodeToCheck >= 97));
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
            console.log("Character Index: " + currentCharacter);
            currentCharacter++;
        }else if(currentCharacter === sentenceChildren.length){
            console.log("Done with this sentence");
            currentCharacter = 0;
            currentSentence++;
    
            sentenceDiv.empty();
            $("#feedback").empty();
            addTextToSenteceDiv(sentences[currentSentence]);
            changeBackgroundColor(`#sentence #char${currentCharacter+1}`, "#FFFF00");
            console.log(sentenceDiv);
        }
    }catch(err){
        alert("No more sentences!");
    }
};

let characterCheck = (charCodeToCheck) => {
    let doesCharCodeMatch = $(`#sentence #char${currentCharacter}`).text().charCodeAt() === charCodeToCheck;
    if(doesCharCodeMatch){
        let elementToAdd = $("<span class></span>").addClass("glyphicon glyphicon-ok");
        $("#feedback").append(elementToAdd);
    }else{
        let elementToAdd = $("<span class></span>").addClass("glyphicon glyphicon-remove");
        $("#feedback").append(elementToAdd);
    }
};


$(document).ready(() => {
    let sentenceDiv = $("#sentence");
    addTextToSenteceDiv(sentences[currentSentence]);
    changeSentenceCursor();

    $(document).on("keydown", function( event ) {
        let currentKeyCode = event.which;
        console.log(`${currentKeyCode} ${String.fromCharCode(currentKeyCode)}`);
        let shiftPressed = event.shiftKey;
        //console.log(currentKeyCode);
        if (shiftPressed) {
            shiftKeyboard("#keyboard-lower-container", "#keyboard-upper-container");
            //check if ascii are numbers or letters
            if(!isKeyCodeAlphaNumeric(currentKeyCode))
            {
                changeBackgroundColor("#shift" + currentKeyCode, "#FFFF00");
                //console.log("shifted");
            }
            else
            changeBackgroundColor("#" + currentKeyCode, "#FFFF00");
        }else {
                let characterCode = isKeyCodeACharacter(currentKeyCode) ? (currentKeyCode + 32) : currentKeyCode; 
                changeBackgroundColor("#" + characterCode, "#FFFF00");
                if(isKeyCodeAlphaNumeric(characterCode)){
                    //console.log(isKeyCodeACharacter(currentKeyCode) ? (currentKeyCode + 32) : currentKeyCode);
                    characterCheck(characterCode);
                    changeSentenceCursor();
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