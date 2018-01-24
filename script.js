$(document).ready(() => {
    let keyShifted = false;
    $(document).keydown(function( event ) {
        let currentKeyCode = event.keyCode;
        console.log(currentKeyCode);
        //console.log(currentKeyCode);
        if ( event.keyCode == 16 ) {
            keyShifted = true;
            $("#keyboard-upper-container").toggle();
            $("#keyboard-lower-container").toggle();
        }else if(keyShifted)if(currentKeyCode >= 48 && currentKeyCode <= 57){
            console.log("Its a number!!!");
            $("#" + currentKeyCode).css("background-color", "#ffff99");
        }else if(currentKeyCode >= 65 && currentKeyCode <= 90){
            if(keyShifted){
                console.log(String.fromCharCode(event.keyCode));
                $("#" + currentKeyCode).css("background-color", "#ffff99");
            }
            else{
                let lowerCaseCode = String.fromCharCode(event.keyCode).toLowerCase().charCodeAt();
                console.log(String.fromCharCode(event.keyCode).toLowerCase());
                console.log(lowerCaseCode);
                $("#" + lowerCaseCode).css("background-color", "#ffff99");
            }
        }
        else{
            console.log("Special key entered");
            console.log(event.keyCode);
            $("#" + currentKeyCode).css("background-color", "#ffff99");
        }
    }),$(document).keyup(function( event ) {
        let currentKeyCode = event.keyCode;
        if ( event.keyCode == 16 ) {
            keyShifted = false;
            $("#keyboard-upper-container").toggle();
            $("#keyboard-lower-container").toggle();
        }else if(currentKeyCode >= 48 && currentKeyCode <= 57){
            console.log("Its a number!!!");
            $("#" + currentKeyCode).removeAttr("style");
        }else if(currentKeyCode >= 65 && currentKeyCode <= 90){
            if(keyShifted){
                console.log(String.fromCharCode(event.keyCode));
                $("#" + currentKeyCode).removeAttr("style");
            }
            else{
                let lowerCaseCode = String.fromCharCode(event.keyCode).toLowerCase().charCodeAt();
                console.log(String.fromCharCode(event.keyCode).toLowerCase());
                console.log(lowerCaseCode);
                $("#" + lowerCaseCode).removeAttr("style");
            }
        }
        else{
            console.log("Special key entered");
            console.log(event.keyCode);
            $("#" + currentKeyCode).removeAttr("style");
        }
    });

});