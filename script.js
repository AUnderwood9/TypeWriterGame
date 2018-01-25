$(document).ready(() => {
    $(document).on("keydown", function( event ) {
        let currentKeyCode = event.which;
        let shiftPressed = event.shiftKey;
        console.log(currentKeyCode);
        if ( shiftPressed ) {
            $("#keyboard-upper-container").show();
            $("#keyboard-lower-container").hide();
            //check if ascii are numbers or letters
            if(!(currentKeyCode === 32) || !(currentKeyCode <= 122 && currentKeyCode >= 97))
            {
                $("#shift" + currentKeyCode).css("background-color", "yellow");
                console.log("shifted");
            }
            $("#" + currentKeyCode).css("background-color", "yellow");
        }else {
            let characterCode = (currentKeyCode + 32) <= 122 && (currentKeyCode + 32) >= 97 ? (currentKeyCode + 32) : currentKeyCode; 
            console.log((currentKeyCode + 32) <= 122 && (currentKeyCode + 32) >= 97 ? (currentKeyCode + 32) : currentKeyCode);
            $("#" + characterCode).css("background-color", "yellow");
        }
    }),$(document).on("keyup", function( event ) {
        let currentKeyCode = event.which;
        let shiftPressed = event.shiftKey;
        if ( !shiftPressed ) {
            $("#keyboard-upper-container").hide();
            $("#keyboard-lower-container").show();
            let characterCode = (currentKeyCode + 32) <= 122 && (currentKeyCode + 32) >= 97 ? (currentKeyCode + 32) : currentKeyCode; 
            $("#" + characterCode).removeAttr("style");
        }else if(shiftPressed){
            //check if ascii are numbers or letters
            if(!(currentKeyCode === 32) || !(currentKeyCode <= 122 && currentKeyCode >= 97))
            {
                $("#shift" + currentKeyCode).removeAttr("style");
            }
            $("#" + currentKeyCode).removeAttr("style");
        }else{
            
        }
    });

});