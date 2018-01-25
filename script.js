let sentenceCounter = 0;
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
    return (keyCodeToCheck === 32) || (keyCodeToCheck <= 122 && keyCodeToCheck >= 97)
};

let addTextToSenteceDiv = (sentenceToAdd) => {
    for(let i = 0; i < sentenceToAdd.length; i++)
    {
        let charSpanToAdd = $(`<span>${sentenceToAdd.charAt(i)}</span>`);
        charSpanToAdd.attr("id", `char${i+1}`);
        $("#sentence").append(charSpanToAdd);

    }
};

let changeSentenceCursor = (currentIndex, sentenceElement) => {
    if(currentIndex < sentenceElement.length){
        changeBackgroundColor(`#sentence #char${currentIndex+1}`, "#FFFF00");
        if(currentIndex > 0){
            removeStyling(`#sentence #char${currentIndex}`);
        }
    }
}

$(document).ready(() => {
    let sentenceDiv = $("#sentence");
    let currentCharacter = 0;
    let currentSentence = 0;
    addTextToSenteceDiv(sentences[currentSentence]);
    changeSentenceCursor(currentCharacter, sentenceDiv.children());
    $(document).on("keydown", function( event ) {
        let currentKeyCode = event.which;
        let shiftPressed = event.shiftKey;
        console.log(currentKeyCode);
        if ( shiftPressed ) {
            shiftKeyboard("#keyboard-lower-container", "#keyboard-upper-container");
            //check if ascii are numbers or letters
            if(!isKeyCodeAlphaNumeric(currentKeyCode))
            {
                changeBackgroundColor("#shift" + currentKeyCode, "#FFFF00");
                console.log("shifted");
            }
            changeBackgroundColor("#" + currentKeyCode, "#FFFF00");
        }else {
            let characterCode = isKeyCodeACharacter(currentKeyCode) ? (currentKeyCode + 32) : currentKeyCode; 
            console.log(isKeyCodeACharacter(currentKeyCode) ? (currentKeyCode + 32) : currentKeyCode);
            changeBackgroundColor("#" + characterCode, "#FFFF00");
            currentCharacter++;
            changeSentenceCursor(currentCharacter, sentenceDiv.children());
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