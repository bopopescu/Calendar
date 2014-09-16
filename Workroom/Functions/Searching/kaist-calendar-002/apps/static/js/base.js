function search(data){
    string ='';
    for(var i=0; i < data.found_list.length; i++){
        item = data.found_list[i];
        string = string + '<div class="search_result"><p>'+ data.event_list[item]["id"]+': '+ data.event_list[item]["title"] + '</p></div>';
    }
    $(string).insertAfter('#searchform');
}

function onSuccess(json, status){alert("success");}
function onError(data, status){alert("error");}

$(document).ready(function(){

    $("form#searchform").submit(function(){
        $('.search_result').remove();
        var formData = $("#searchform").serialize();
        $.ajax({
                    type : "POST",
                    url : "/search",
                    cache : false,
                    data : formData,
                    success: search,
                    error : onError
        });
        return false;
    });
})
