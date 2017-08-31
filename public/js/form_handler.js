$(document).ready(function(){
    $(".peek_box").click(()=>{
        fruit_selection();
    });
    $(":button").click(()=>{
        form_evaluation();
    });
});

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
    //once they click the box they want to see what fruit came out.
    let selected_box = $(event.currentTarget).attr('id');
    $(".selection").text(selected_box);
    //no matter which box, the fruit is random between the two
    let random = Math.round(Math.random());
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

function form_evaluation(){
    let email_regex = /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/
    let email = $("input[type='text'][name='user_email']").val();
//this function will first validate the forms
    if (email_regex.test(email)!==true){
        console.log("the email entered is not valid");
        return;
    } else {
        console.log("Email valid")
        //hand the newly validate email to the user object constructor
        win_condition(new User_result(email, final_answer));
    }  
    $(":button").val("Submitted")
}
function random_fruit(){
    
}

function win_condition(current_user) {
    let correct_answer = "both"
    if (current_user.answer===correct_answer){
        current_user.correct=true;
        $(".user_report").text("you've answered correctly!");
    } else {
        current_user.correct=false;
        $('.user_report').text("you've answered incorrectly. If you'd like to try again refresh the page.");
    }
    input_result(current_user);
}

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
            console.log(thrownError);
        }
    })
}

function User_result(email,answer){
    this.email = email;
    this.answer = answer;
    this.correct= null;
}

