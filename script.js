$(document).ready(() => {
    let keyShifted = false;
    $(document).bind("keydown", function( event ) {
        let currentKeyCode = event.keyCode;
        console.log(currentKeyCode);
        //console.log(currentKeyCode);
        if ( event.keyCode == 16 ) {
            keyShifted = true;
            $("#keyboard-upper-container").toggle();
            $("#keyboard-lower-container").toggle();
        }else if(keyShifted){
            
        }else {
            let characterCode = (event.keyCode + 32) <= 122 || (event.keyCode + 32) >= 97 ? (event.keyCode + 32) : event.keyCode; 
            console.log((event.keyCode + 32) <= 122 || (event.keyCode + 32) >= 97 ? (event.keyCode + 32) : event.keyCode);
            $("#" + characterCode).css("background-color", "yellow");
        }
    }),$(document).bind("keyup", function( event ) {
        let currentKeyCode = event.keyCode;
        if ( event.keyCode == 16 ) {
            keyShifted = false;
            $("#keyboard-upper-container").toggle();
            $("#keyboard-lower-container").toggle();
        }else if(keyShifted){
            
        }else{
            let characterCode = (event.keyCode + 32) <= 122 || (event.keyCode + 32) >= 97 ? (event.keyCode + 32) : event.keyCode; 
            $("#" + characterCode).removeAttr("style");
        }
    });

});