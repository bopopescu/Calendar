
function getDailyList(date){ // datetime 
    $.ajax({
        url: "/getDailyList",
        dataType: 'JSON',
        data: {
            "date" : date
        },
        success: function(data){
            string = '<div id="list_1" class="row list">'
                +'<div class="col-md-8 col-md-offset-2" style= "border: 1px solid gold; background-color: black; padding: 10px">';
            if(data.event_list.length == 0){                
            }
            else{
                for(var idx in data.event_list){
                    event_ = data.event_list[idx];
                    string = string + '<p class="text-left" style="color: white">' + event_['title'] + '</p>';
                }
            }
            string = string + '</div></div>';
            $(string).insertAfter($(this).parent());
            $(string).insertAfter('#here');
            return string
        },
        error: function(status){
            string = "<div id='list_1' class='col-md-8 col-md-offset-2 row list'><h1>This is an error</h1></div>";
            // $(string).insertAfter($(this).parent());
            $(string).insertAfter('#here');
            return string
        }
    });
    console.log('out');
}    

$(document).ready(function(){
    $('#day').click(function(){
        //date = datetime.date()
        console.log('-------');
        if($("#list_1").css("display") == "block"){
            $("#list_1").remove();
        }
        else{
            getDailyList(1);
        }
        console.log('last');
    });
})
