
function getDailyList(el){
    var insert_text = "";
    var date = el.attr("date");
    $.ajax({
        url: "/getDailyList",
        dataType: 'JSON',
        data: {
            "date" : date
        },
        success: function(data){
            insert_text = '<div date="'+ date +'" class="row list">'
                +'<div class="col-md-8 col-md-offset-2" style= "border: 1px solid gold; background-color: black; padding: 10px">';
            if(data.event_list.length == 0){  
            return false              
            }
            else{
                for(var idx in data.event_list){
                    event_ = data.event_list[idx];
                    insert_text += '<p class="text-left" style="color: white">' + event_['title'] + '</p>';
                }
            }
            insert_text += '</div></div>';
            $(insert_text).insertAfter($(el.parents('.row')));
            $('.list').hide();
            $('.list').slideToggle("slow");
        },
        error: function(status){
            insert_text = "<div id='list_1' class='col-md-8 col-md-offset-2 row list'><h1>This is an error</h1></div>";
            $(insert_text).insertAfter('#here');
            return false;
        } 
    });
        console.log('out');
}    

$(document).ready(function(){
    $('.day').click(function(){
        console.log('-------');

        if($(this).parents('.row').next().attr("id") == $(this).attr("id")){
            $(this).parents('.row').next().slideToggle('slow'); 
            // if($(this).parents('.row').next().css('display') == "none")
            // $(this).parents('.row').next().remove();
        }
        else{
            $(".list").remove();
            getDailyList($(this));
            // $('body').on('condition', '.list', function(e){
            //     console.log('-----');
            //     $('.list').slideToggle('slow');
            // });
        }
        console.log('last');
    });
})
