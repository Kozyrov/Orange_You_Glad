$(document).ready(function(){
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
    });
})
function win_condition(current_user) {
    let correct_answer = "both"
    console.log(current_user.answer);
    if (current_user.answer===correct_answer){
        current_user.correct=true;
        console.log("you've answered correctly");
    } else {
        current_user.correct=false;
        console.log("you've answered incorreectly");
    }
    input_result(current_user);
}

function input_result(user_result){
    $.ajax ({
        dataType: 'JSON',
        data: {
            correct:user_result.correct,
            answer:user_result.answer,
            user_email:user_result.user_email
        },
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

