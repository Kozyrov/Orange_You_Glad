window.onload = function() {
    let userEmail = localStorage.getItem("userEmail");
    if (userEmail !== null) {
        $(".email_input").val(userEmail);
    };
};

$(document).ready(function(){
    $(".peek_box").click(()=>{
        fruit_selection()
    });
    $("#relabel").click(()=>{
        form_evaluation()}
    );
    $(".email_input").click(()=>{
        message_clear();
    });
    window.onbeforeunload = function() {
        localStorage.setItem("userEmail", $(".email_input").val());
        let test = localStorage.getItem("userEmail");
    };
});

var random = null;
var selected_box = null;

function goodToDrag(event){
    event.preventDefault();
};

function drag(event){
    event.dataTransfer.setData('text', event.target.id)
};

function drop(event){
    peek_array = ["Apples", "Oranges", "Mixed"];
    let data = event.dataTransfer.getData('text');
    
    if($.inArray(event.target.id, peek_array) >= 0) {
        let bottom_element = event.target.id;
        let drop_target = event.target.parentNode;
        
        event.preventDefault();
        $("#"+bottom_element).detach().appendTo("#"+bottom_element+"_start");
        drop_target.appendChild(document.getElementById(data));
    } else {
        event.preventDefault();
        event.target.appendChild(document.getElementById(data));
    };
};

//this should likely be an object that generates and stores the current game state.
//Other objects to include might be one that deals with displaying messages to the user,
//transferring and recieving data from the api, and receiving the user actions.
function fruit_selection(){
    //clear any validation messages
    message_clear();
    //once they click the box they want to see what fruit came out.
    selected_box = $(event.currentTarget).attr('id');
    $(".selection").addClass("clicked").text(selected_box).css({"font-size":"2em"});
    //no matter which box, the fruit is random between the two
    random = Math.round(Math.random());
    if (random===1){
        $(".fruit").attr('id', 'fruit_orange');
        $(".fruit_text").text("Orange").css({"font-size":"2em"});
    } else {
        $(".fruit").attr('id','fruit_apple');
        $(".fruit_text").text("Apple").css({"font-size":"2em"});
    };
    //remove the click handler on the .peek_box
    $(".peek_box").off("click");
    //add the drag and drop functionality
    $(".drag_toggle").attr("draggable", true);
};

function message_clear(){
    if($(".selection").hasClass("clicked")) {
       return;
    } else {
        $(".validation_message, .email_validation, .selection").text("");
        $("input").css({"border":"1px solid grey"});
        $(".selection").css({"color":"black"});
    };
};

function form_evaluation(){
    //validate the email
    let email_regex = /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/
    let email = $("input[type='text'][name='user_email']").val();
    //validate submitted answer
    if (email_regex.test(email)!==true){
        $("input").css({"border":"3px solid red"});
        $(".validation_message, .email_validation").text("Please provide a valid email, so your results may be recorded.").css({"font-size":"1em"});
        return;
    } else {
        //evaluate the puzzle to see that they have made a fruit selection.
        if($(".selection").hasClass("clicked")) {
            zone_check();
        } else {    
            $(".validation_message, .selection").text("You should click or tap one of the boxes to check inside. Remember, you only get one chance, so choose carefully.");
            $(".selection").css({"color":"red", "font-size":"1.5em"});
        };
    };  
    $(":button").val("Submitted")
};

function zone_check() {
    let zone_array = ["apple", "orange", "mixed"];
    let result_array = [];

    for (i=0;i<3;i++){
        result_array.push($("div#"+zone_array[i]+"_zone").find("div.peek_box").length);
    };

    for(i=0;i<3;i++){
        if(result_array[0]>0){
            result_array.splice(0,1);
        };
    };

    if(result_array.length !== 0){
        $("#zone_note").text("There aren't enough boxes placed. Please place all of the boxes before trying to relabel them.").css({"color":"red", "font-size":"1.5em"});
        return;
    } else {
        win_condition_evaluation(localStorage.getItem("userEmail"));
    }
};

function win_condition_evaluation(email){ 
    let apple_win = null;
    let orange_win = null;
    let mixed_win = null;

    switch (true) {

        case random === 1 && selected_box === "Mixed":
        apple_win = $("div#apple_zone").find("#Oranges").length;
        orange_win = $("div#orange_zone").find("#Mixed").length;
        mixed_win = $("div#mixed_zone").find("#Apples").length;
        break;

        case random === 0 && selected_box === "Apples":
        apple_win = $("div#apple_zone").find("#Oranges").length;
        orange_win = $("div#orange_zone").find("#Mixed").length;
        mixed_win = $("div#mixed_zone").find("#Apples").length;
        break;

        case random === 0 && selected_box === "Mixed":
        apple_win = $("div#apple_zone").find('#Mixed').length;
        orange_win = $("div#orange_zone").find("#Apples").length;
        mixed_win = $("div#mixed_zone").find("#Oranges").length;
        break;

        case random === 1 && selected_box === "Oranges":
        apple_win = $("div#apple_zone").find('#Mixed').length;
        orange_win = $("div#orange_zone").find("#Apples").length;
        mixed_win = $("div#mixed_zone").find("#Oranges").length;
        break;

        default: 
        apple_win = 0;
        orange_win = 0;
        mixed_win = 0;
    };

    //todo you've gotta create a series of unique messages to tell the user what is wrong about the answer in relation to their choices.
    

    // if(random === 1 && selected_box === "Mixed" || random === 0 && selected_box === "Apples"){
    //     apple_win = $("div#apple_zone").find("#Oranges").length;
    //     orange_win = $("div#orange_zone").find("#Mixed").length;
    //     mixed_win = $("div#mixed_zone").find("#Apples").length;
    // } else if (random === 0 && selected_box === "Mixed" || random === 1 && selected_box === "Oranges") {
    //     apple_win = $("div#apple_zone").find('#Mixed').length;
    //     orange_win = $("div#orange_zone").find("#Apples").length;
    //     mixed_win = $("div#mixed_zone").find("#Oranges").length;
    // };

    let win_array=[apple_win, orange_win, mixed_win];

    for(i=0;i<3;i++){
        if(win_array[0]>0){
            win_array.splice(0,1);
        };
    };
    
    if(win_array.length!==0){
        $("#msgModal").modal({
            show: true,
            keyboard: false, 
            backdrop: "static"
        });
        $(".modal-body").text("Sorry, that answer was incorrect. You can try again if you'd like.");
        $("#msgModalBtn").text("Re-Try").addClass("btn btn-danger").click(function() {
            location.reload();
        });
        let user_result = new User_result(email, win_array, false);
        input_result(user_result);
    } else {
        $("#msgModal").modal({
            show: true,
            keyboard: false, 
            backdrop: "static"
        });
        $(".modal-body").text("Congratulations! Your answer was correct.");
        $("#msgModalBtn").text("Play Again").addClass("btn btn-primary").click(function() {
            location.reload();
        });
        let user_result = new User_result(email, win_array, true);
        input_result(user_result);
    };
};

function input_result(user_result){
    console.log(user_result);
    $.ajax ({
        dataType: 'JSON',
        data: user_result,
        method:'POST',
        url: 'https://orange-you-glad.herokuapp.com/results',
        success: (res)=>{
            console.log(res);
        },
        error: (xhr, ajaxOptions, thrownError)=>{
            console.log(xhr, thrownError);
        }
    });
};

function User_result(email, answer, correct){
    this.email = email;
    this.answer = answer;
    this.correct= correct;
    this.selected = selected_box;
    this.revealed = () => {
        if (random === 1) {
            return "Orange Revealed";
        } else {
            return "Apple Revealed";
        };
    };
};

