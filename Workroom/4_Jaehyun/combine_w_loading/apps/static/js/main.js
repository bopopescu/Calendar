var global_year = 2014,
global_month = 9;

// function makeDetail(number){
// 	$.ajax({
// 		url:"/get_inform",
// 		dataType : 'JSON',
// 		data: {
// 			"number" : number
// 			//원래는 이벤트의 id를 주고, 그에 맞는 정보들을 받아오는 것입니다.
// 		},
// 		success:function(data){
// 			temp = data.inform;
// 			string = '<div id="myModal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="close" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
// 			'<h4 class="modal-title">' + temp['title'] + '<small>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + temp['category_char'] + '/' + temp['category_host']+'</small></h4></div>'+
// 			'<div class="modal-body">'+
// 			'<p>주최 : '+temp['host']+'</p><p>행사시간 : '+temp['date_start'] + ' ~ '+temp['date_end'] + '</p><p>행사장소 : '+temp['location']+'</p><p>행사소개 : '+temp['content']+'</p>'+
// 			'<p class="text-warning"><small>행사 관련 정보에 오류가 있을 경우 관리자에게 연락바랍니다.</small></p>'+
// 			'</div>'+
// 			'<div class="modal-footer">'+
// 			'<button type="button" class="btn btn-default" data-dismiss="modal" id="close">Close</button>'+
// 			'</div></div></div></div>';
// 			$("#zone").append(string);
// 			$("#myModal").modal('show');
// 		},
// 		error: function(status){
// 			string = "<div class='well' id='article_" + data.id + ".><h1>에러가 발생했습니다..</h1></div>";
// 			$("#zone").append(string);
// 		}
// 	});
// return true;
// };

function makeDetail(number){
	$.ajax({
		url:"/get_inform",
		dataType : 'JSON',
		data: {
			"number" : number
			//원래는 이벤트의 id를 주고, 그에 맞는 정보들을 받아오는 것입니다.
		},
		success:function(data){
			temp = data;
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
};

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
};

function makeMonthtemplate(year,month){ //week 만드는 방식 flow가 같았으면 좋겠다.
	$('.day').children().remove();
	$('.calendar').css('display','block');
	var head_month = month>9? month : '0'+month;
	$('.calendar-head h2 span').text(year + '.' + head_month);
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
		$temp.children().append('<span class="date other" date="'+(first_date_ds-i)+'">'+(last_last-i+1)+
			'</span>' 
			// + '<div class="row row0">asdf</div>'+
			// '<div class="row row1">asdf</div>'+
			// '<div class="row row2">asdf</div>'+
			// '<div class="row row3">asdf</div>'+
			// '<div class="row row4">asdf</div>'
			);
	};

	for (var i = 1; i <= last_day; i++) {
		if (temp_day==7) {
			temp_day = 0;
			temp_week++;
		};
		$temp = $('tr[week="'+temp_week+'"]').children('td[day="'+temp_day+'"]');
		$temp.children().append('<span class="date" date="'+(date_ds)+'">'+i+
			'</span>' 
			// + '<div class="row row0">asdf</div>'+
			// '<div class="row row1">asdf</div>'+
			// '<div class="row row2">asdf</div>'+
			// '<div class="row row3">asdf</div>'+
			// '<div class="row row4">asdf</div>'
			);
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
		$temp.children().append('<span class="date other" date="'+(date_ds)+'">'+i+
			'</span>' 
			// + '<div class="row row0">asdf</div>'+
			// '<div class="row row1">asdf</div>'+
			// '<div class="row row2">asdf</div>'+
			// '<div class="row row3">asdf</div>'+
			// '<div class="row row4">asdf</div>'
			);
		temp_day++;
		date_ds++;
	};


	// jhlim
	// window.console.log("first_day: ");
	// window.console.log(first_day);
	// window.console.log("last_day: ");
	// window.console.log(last_day); 
	// window.console.log("year: ");
	// window.console.log(year);
	// window.console.log("month: ");
	// window.console.log(month);
	var first_date = getFirstDateOfThisWeek(year,month,first_day);
	var last_date = getLastDateOfThisWeek(year,month,last_day); 
	window.console.log("fist_date: "); 
	window.console.log(first_date);
	window.console.log("last_date: ");
	window.console.log(last_date);
	var first_date_str = String(first_date.getFullYear()) + "-" + String(first_date.getMonth() + 1) + "-" + String(first_date.getDate()),
		last_date_str = String(last_date.getFullYear()) + "-" + String(last_date.getMonth() + 1) + "-" + String(last_date.getDate()) ;

    
	window.console.log("fist_date_str: "); 
	window.console.log(first_date_str);
	window.console.log("last_date_str: ");
	window.console.log(last_date_str);

	eventListAtMonthView(first_date_str, last_date_str);
};



function getFirstDateOfThisWeek(year,month,date){ //week ¸¸µå´Â ¹æ½Ä flow°¡ °°¾ÒÀ¸¸é ÁÁ°Ú´Ù.
    // get current date
    target = new Date(year,month-1,date); // This date variable has to be initialized by function arguments. Today is the default setting. 
    // window.console.log("today :");
    // window.console.log(target);

    var target_date = target.getDate(), // date 1-31
	target_day = target.getDay(); // day of week. 0-6
	
    // get the first and the last date of the target week. 
    var first = new Date(target);
    // var last = new Date(target);
    first.setDate(target.getDate() - target_day);
    // window.console.log("first: ");
    // window.console.log(first); 
    // last.setDate(target.getDate() + ( 6 - target_day )); 
    // window.console.log("last: ");
    // window.console.log(last);
    return first;
}

function getLastDateOfThisWeek(year,month,date){ //week ¸¸µå´Â ¹æ½Ä flow°¡ °°¾ÒÀ¸¸é ÁÁ°Ú´Ù.
    // get current date
    target = new Date(year,month-1,date); // This date variable has to be initialized by function arguments. Today is the default setting. 
    // window.console.log("today :");
    // window.console.log(target);

    var target_date = target.getDate(), // date 1-31
	target_day = target.getDay(); // day of week. 0-6
	
    // get the first and the last date of the target week. 
    //var first = new Date(target);
    var last = new Date(target);
    // first.setDate(target.getDate() - target_day);
    // window.console.log("first: ");
    // window.console.log(first); 
    last.setDate(target.getDate() + ( 6 - target_day )); 
    // window.console.log("last: ");
    // window.console.log(last);
    return last;
}

function diffInDays(src_date, dst_date){
	var diffDays = Math.abs(dst_date.getTime() - src_date.getTime()) / (1000 * 3600 * 24);
	return diffDays;
}

function eventListAtMonthView(first_date_str, last_date_str){
	$.ajax({
		url:"/event_list",
		dataType:'JSON',
		data:{
			"first_date":first_date_str,
			"last_date":last_date_str,
		},
		success:function(data){
			// do what you want
			// window.console.log(data.context.event_list); 
			var first_date = new Date(first_date_str),
				target_date_t1_str = "",
				target_date_t2_str = "";
			// window.console.log("first_date_str: ");
			// window.console.log(first_date_str);
			var days = 0, weeks = 0, diffdays = 0; 

			for (var i = 0; i < data.context.event_list.length; i++) {
				window.console.log(data.context.event_list[i]);

				target_date_t1_str = data.context.event_list[i].date_start[0].split("-");
				target_date_t2_str = data.context.event_list[i].date_start[1].split(":");
				// window.console.log("start_str: ");
				// window.console.log(target_date_t1_str);
				var target_date_start = new Date(parseInt(target_date_t1_str[0]), parseInt(target_date_t1_str[1])-1, parseInt(target_date_t1_str[2]), parseInt(target_date_t2_str[0]), parseInt(target_date_t2_str[1]), parseInt(target_date_t2_str[2]), 0);

				// window.console.log("target_date_start: ");
				// window.console.log(target_date_start);

				target_date_t1_str = data.context.event_list[i].date_end[0].split("-");
				target_date_t2_str = data.context.event_list[i].date_end[1].split(":");
				// window.console.log("end_str: ");
				// window.console.log(target_date_t1_str);
				var target_date_end = new Date(parseInt(target_date_t1_str[0]), parseInt(target_date_t1_str[1])-1, parseInt(target_date_t1_str[2]), parseInt(target_date_t2_str[0]), parseInt(target_date_t2_str[1]), parseInt(target_date_t2_str[2]), 0);

				// window.console.log("target_date_end: ");
				// window.console.log(target_date_end);

				// draw events
				var target_date = new Date(target_date_start);
				for (var j = 0; j <= diffInDays(target_date_start, target_date_end); j++){
					// calculate n-th week w.r.t first_date
					diffdays = diffInDays(first_date, target_date);
					// window.console.log("days: ");
					// window.console.log(diffdays);

					// calculate n-th day w.r.t the week
					weeks = parseInt(diffdays / 7) + 1;
					days = parseInt(diffdays % 7);
					
					// window.console.log("weeks: ");
					// window.console.log(weeks);
					// window.console.log("days: ");
					// window.console.log(days); 

					$tmp = $('tr[week="'+weeks+'"] > td[day="'+days+'"] > div.day'); 
					var ind = $tmp.length - 1; 
					// window.console.log("num children:"); 
					// window.console.log(ind); 
					if (ind < 6){
						$tmp.append('<div class="row row'+ind+'">'+ 'event' + i +'</div>'); 	
					}				

					// increase one day
					target_date.setTime(target_date.getTime() + 24 * 60 * 60 * 1000);
				}
			}
		}
	});
};


$(document).ready(function(){

	makeMonthtemplate(2014,9);

	$('.btn-upload').click(function(){
		makeDetail(1);
	});
	// $('.btn-upload').click(function(){
	// 	upload_request(1);
	// });
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
	$('.day').hover(function(e){
		$target = $(this).parent();
		$target.toggleClass("grayday");
	});

});