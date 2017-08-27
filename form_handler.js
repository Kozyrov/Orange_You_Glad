$(document).ready(function(){
    $(":button").click(function(){
        //this function will intake the user's selection
        form_handler();
    });
})

function form_handler() {
    //determine which answer was selected
    console.log($("input[type='radio'][name='fruit_box']:checked").val());
}