var global_year = 2014,
    global_month = 9;

function makeDetail(number){
    $.ajax({
	url:"/get_inform",
	dataType : 'JSON',
	data: {
	    "number" : number
	    //원래는 이벤트의 id를 주고, 그에 맞는 정보들을 받아오는 것입니다.
	},
	success:function(data){
	    temp = data.inform;
	    string = '<div id="myModal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="close" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
		'<h4 class="modal-title">' + temp['title'] + '<small>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + temp['category_char'] + '/' + temp['category_host']+'</small></h4></div>'+
		'<div class="modal-body">'+
		'<p>주최 : '+temp['host']+'</p><p>행사시간 : '+temp['date_start'] + ' ~ '+temp['date_end'] + '</p><p>행사장소 : '+temp['location']+'</p><p>행사소개 : '+temp['content']+'</p>'+
		'<p class="text-warning"><small>행사 관련 정보에 오류가 있을 경우 관리자에게 연락바랍니다.</small></p>'+
		'</div>'+
		'<div class="modal-footer">'+
		'<button type="button" class="btn btn-default" data-dismiss="modal" id="close">Close</button>'+
		'</div></div></div></div>';
	    $("#zone").append(string);
	    $("#myModal").modal('show');
	},
	error: function(status){
	    string = "<div class='well' id='article_" + data.id + ".><h1>에러가 발생했습니다..</h1></div>";
	    $("#zone").append(string);
	}
    });
    return true;
};

function upload_request(number){
    $.ajax({
	url:"/get_inform",
	dataType : 'JSON',
	data: {
	    "number" : number
	    //원래는 이벤트의 id를 주고, 그에 맞는 정보들을 받아오는 것입니다.
	},
	success:function(data){
	    temp = data.inform;
	    string = '<div id="myModal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="close" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
		'<h4 class="modal-title">업로드신청</h4></div>'+
		'<div class="modal-body">'+
		'<p>업로드 신청 폼을 만들 공간</p>'+
		'<p class="text-warning"><small>뚝딱뚝딱</small></p>'+
		'</div>'+
		'<div class="modal-footer">'+
		'<button type="button" class="btn btn-default" data-dismiss="modal" id="close">Close</button>'+
		'</div></div></div></div>';
	    $("#zone").append(string);
	    $("#myModal").modal('show');
	},
	error: function(status){
	    string = "<div class='well' id='article_" + data.id + ".><h1>에러가 발생했습니다..</h1></div>";
	    $("#zone").append(string);
	}
    });
    return true;
};



function callMonth(month){
    $.ajax({
	url:"/get_month",
	dataType:'JSON',
	data:{
	    "month":month,
	},
	success:function(data){
	    string = '<div class="cal"> hello I am month view It is' +data.month +'</div>';
	    $('.cal').remove();
	    $('.container').append(string);
	}
    });
};

function callWeek(week){
    $.ajax({
	url:"/get_week",
	dataType:'JSON',
	data:{
	    "week":week,
	},
	success:function(data){
	    string = '<div class="cal"> hello I am week!!! view It is' + data.week + '</div>';
	    $('.cal').remove();
	    $('.container').append(string);
	}
    });
};

function getCategory(category){
    $.ajax({
	url:"/categorize",
	dataType:'JSON',
	data:{
	    "category" : category,
	},
	success:function(data){
	    string = '<div> Category is ' + data.category + '</div>';
	    $('.container').append(string);
	}
    });
}

function getLastDay(year,month){
    if (month ==2){
	if (year%4==0 && year%100!=0){
	    return 29;
	}else{ return 28;}
    }else if (jQuery.inArray(month,[1,3,5,7,8,10,12])== -1){
	return 30;
    }else  {
	return 31;
    };
}

function makeMonthtemplate(year,month){ //week 만드는 방식 flow가 같았으면 좋겠다.
    $('.day').children().remove();
    $('.calendar').css('display','block');
    $('.calendar-head h2 span').text(year + '.' + month);
    var first_date = new Date(year + "/"+month),
	first_date_ds = parseInt(first_date.getTime()/86400000) + 719163 ,
	date_ds = first_date_ds,
	first_day = first_date.getDay(),
	last_day = getLastDay(year,month);

    var temp_week = 1;
    var temp_day = first_day;

    var last_month,
	last_year,
	next_month,
	next_year;

    if (month==1){
	last_month = 12;
	last_year = year-1
    } else{
	last_month = month-1;
	last_year = year;
    };

    if (month==12){
	next_year = year +1
	next_month = 1;
    } else{
	next_month = month+1;
	next_year = year;
    };

    last_last = getLastDay(last_year,last_month);
    for (var i = 1; i<=temp_day; i++) {
	$temp = $('tr[week="1"]').children('td[day="'+(temp_day-i)+'"]');
	$temp.children().append('<span class="date other" date="'+(first_date_ds-i)+'">'+(last_last-i+1)+'</span>');
    };

    for (var i = 1; i <= last_day; i++) {
	if (temp_day==7) {
	    temp_day = 0;
	    temp_week++;
	};
	$temp = $('tr[week="'+temp_week+'"]').children('td[day="'+temp_day+'"]');
	$temp.children().append('<span class="date" date="'+(date_ds)+'">'+i+'</span>');
	temp_day++;
	date_ds++;
    };
    for(var i = 1; i<= 14; i++){
	if (temp_day==7) {
	    temp_day = 0;
	    temp_week++;
	};
	if (temp_week==7){break;}
	$temp = $('tr[week="'+temp_week+'"]').children('td[day="'+temp_day+'"]');
	$temp.children().append('<span class="date other" date="'+(date_ds)+'">'+i+'</span>');
	temp_day++;
	date_ds++;
    };
}

function makeWeektemplate(year,month,date){ //week 만드는 방식 flow가 같았으면 좋겠다.
    // get current date
    target = new Date(); // This date variable has to be initialized by function arguments. Today is the default setting. 
    window.console.log("today :");
    window.console.log(target);

    var target_date = target.getDate(), // date 1-31
	target_day = target.getDay(), // day of week. 0-6
	target_month = target.getMonth() + 1, // month 0-11
	target_year = target.getFullYear(); // year four digits
    
    // clean calendar
    $("tr.days > td > div.days-date").remove();
    $('.calendar').css('display','block');

    // display target month and year
    $('.calendar-head h2 span').text(target_year + '.' + target_month);

    // window.console.log("day: ");
    // window.console.log(target_day);

    // get the first and the last date of the target week. 
    var first = new Date(target);
    // var last = new Date(target);
    first.setDate(target.getDate() - target_day);
    window.console.log("first: ");
    window.console.log(first); 
    // last.setDate(target.getDate() + ( 6 - target_day )); 
    // window.console.log("last: ");
    // window.console.log(last);

    var date_print = new Date(first); 
    for (var i = 0; i < 7; i++) {
	date_print.setDate(first.getDate() + i); 
	// var tmp_ds = parseInt(date_print.getTime()/86400000) + 719163; 
	// $temp = $('tr[week="2"]').children('td[day="'+date_print.getDay()+'"]');
	// $temp.children().append('<span class="date" date="'+(tmp_ds-i)+'">'+date_print.getDate()+'</span>');
	$("tr.days > td[day="+i+"]").append('<div class="days-date">'+date_print.getDate()+'</div>');
    };

    // draw rows of weekly table
    var diff = 30; // minutes
    // initialize date_print to 00:00:00 (HH:DD:MM)
    date_print.setHours(0); 
    date_print.setMinutes(0);
    date_print.setSeconds(0); 
    date_print.setMilliseconds(0); 
    window.console.log("date_print :"); 
    window.console.log(date_print); 
    
    for (var i = 0; i < 24/0.5; i++){
	$("table.calendar.table").append('<tr hours='+date_print.getHours()+' mins='+date_print.getMinutes()+' secs='+date_print.getSeconds()+'>'+
	'<td day="0"><div></div></td>'+
        '<td day="1"><div></div></td>'+
        '<td day="2"><div></div></td>'+
        '<td day="3"><div></div></td>'+
        '<td day="4"><div></div></td>'+
        '<td day="5"><div></div></td>'+
        '<td day="6"><div></div></td>'+'</tr>');
	date_print.setTime(date_print.getTime() + diff*60000);
    }
}

$(document).ready(function () {

    // makeMonthtemplate(2014,9);
    makeWeektemplate(2014,9,18); 

    $('.btn-event').click(function(){
	makeDetail(1);
    });
    $('.btn-upload').click(function(){
	upload_request(1);
    });
    $('body').on('hidden.bs.modal','#myModal',function(e){
	console.log('-------');
	$('#myModal').remove();
    });
    $('.buttons button').click(function(){
	$(this).toggleClass("active");
    });
    $('.a').click(function(){
	callMonth(1);
	makeMonthtemplate(2014,9)
    });
    $('.b').click(function(){
	callWeek(1);
    });
    $('button[category]').click(function(){
	var temp_category = $(this).attr('category');
	getCategory(temp_category);
    });
    $('#previous-month').click(function(){
	if (global_month==1) {
	    global_year--;
	    global_month=12;
	} else{
	    global_month--;
	};
	makeMonthtemplate(global_year,global_month);
    });
    $('#next-month').click(function(){
	if (global_month==12) {
	    global_year++;
	    global_month=1;
	} else{
	    global_month++;
	};
	makeMonthtemplate(global_year,global_month);
    });
});
