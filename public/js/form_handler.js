$(document).ready(function(){
    $(":radio").click(()=>{
        let selected = $("input[type='radio'][name='fruit_box']:checked").val();
        $(".selection").text("you've selected, " + selected)
    })
    $(":button").click(function(){
        let email_regex = /^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/
        let email = $("input[type='text'][name='user_email']").val();
        let final_answer = $("input[type='radio'][name='fruit_box']:checked").val();
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
        $("input[type='radio']").attr("disabled", true);
    });
});

function random_fruit(){
    let random = Math.round(Math.random());
    if (random===1){
        $(".fruit_revealed").attr("src", "./../assets/images/apple.png");
    } else {
        $(".fruit_revealed").attr("src", "./../assets/images/orange.png");
    }
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

