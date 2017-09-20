$(document).ready(function(){
    $(".peek_box").click(()=>{
        fruit_selection()
    });
    $(":button").click(()=>{
        form_evaluation()}
    );
    $(".email_input").click(()=>{
        message_clear();
    })
});

var random = null;

function goodToDrag(event){
    event.preventDefault();
}

function drag(event){
    event.dataTransfer.setData('text', event.target.id)
}

function drop(event){
    event.preventDefault();
    let data = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(data));
}

function fruit_selection(){
    //clear any validation messages
    message_clear();
    //once they click the box they want to see what fruit came out.
    let selected_box = $(event.currentTarget).attr('id');
    $(".selection").addClass("clicked").text(selected_box);
    //no matter which box, the fruit is random between the two
    random = Math.round(Math.random());
    if (random===1){
        $(".fruit").attr('id', 'fruit_orange');
        $(".fruit_text").text("Orange");
    } else {
        $(".fruit").attr('id','fruit_apple');
        $(".fruit_text").text("Apple");
    }
    //remove the click handler on the .peek_box
    $(".peek_box").off("click");
    //add the drag and drop functionality
    $(".drag_toggle").attr("draggable", true);
}
function message_clear(){
    $(".validation_message, .email_validation, .selection").text("");
    $("input").css({"border":"1px solid grey"});
    $(".selection").css({"color":"black"});
}
function form_evaluation(){
    //validate the email
    let email_regex = /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/
    let email = $("input[type='text'][name='user_email']").val();
    //validate submitted answer
    if (email_regex.test(email)!==true){
        $("input").css({"border":"3px solid red"});
        $(".validation_message, .email_validation").text("Please provide a valid email, so your results may be recorded.");
        return;
    } else {
        //evaluate the puzzle to see that they have made a fruit selection.
        if($(".selection").hasClass("clicked")) {
            win_condition_evaluation(email);
        } else {    
            $(".validation_message, .selection").text("You should click or tap one of the boxes to check inside. Remember, you only get one chance, so choose carefully.");
            $(".selection").css({"color":"red"});
        }
    }  
    $(":button").val("Submitted")
}

function win_condition_evaluation(email){    
    var apple_win = null;
    var orange_win = null;
    var mixed_win = null;
    if(random===1){
        apple_win = $("div#apple_zone").find("#Oranges").length;
        orange_win = $("div#orange_zone").find("#Mixed").length;
        mixed_win = $("div#mixed_zone").find("#Apples").length;
    } else {
        apple_win = $("div#apple_zone").find('#Mixed').length;
        orange_win = $("div#orange_zone").find("#Apples").length;
        mixed_win = $("div#mixed_zone").find("#Oranges").length;
    }
    var win_array=[apple_win, orange_win, mixed_win];

    for(i=0;i<3;i++){
        if(win_array[0]>0){
            win_array.splice(0,1);
        }
    }
    
    if(win_array.length!==0){
        alert("You've labeled the boxes incorrectly. If you'd like to try again, refresh the page.");
        let user_result = new User_result(email, win_array, false);
        input_result(user_result);
    } else {
        alert("You've labeled the boxes correctly! Congratulations!");
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
        url: 'http://localhost:3001/results',
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
}

