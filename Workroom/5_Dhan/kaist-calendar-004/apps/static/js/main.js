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

function getDailyList(el){
    var insert_text = "";
    var date = el.children('.date').attr("date");
    console.log('hello!');
    $.ajax({
        url: "/getDailyList",
        dataType: 'JSON',
        data: {
            "date" : date
        },
        success: function(data){
        	 // data.context.event_list[i].date_start[0]
            insert_text = '<tr date="' + date +'" class="list" style="background-color:black;"><td colspan="7"><div date="'+ date +'" class="list">'
                +'<div style= "border: 1px solid gold; background-color: black; padding: 10px">';
            if(data.event_list.length == 0){  
            	console.log('nothing');
            return false;              
            }
            else{
            	console.log('yes!');
            	for(var i = 0; i < data.event_list.length; i++){
            		var element = data.event_list[i]
;            		insert_text += '<p class="text-left" style="color: white">' + element.title + '</p>';
            	}
            }
            insert_text += '</div></div></td></tr>';
            window.console.log(insert_text);
            $(insert_text).insertAfter($(el.parent().parent()));
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

function makeDetail(id_){
	$.ajax({
		url:"/get_inform",
		dataType : 'JSON',
		data: {
			"id_" : id_
			//원래는 이벤트의 id를 주고, 그에 맞는 정보들을 받아오는 것입니다.
		},
		success:function(data){
			temp = data.context.event;
			category = ['공연', '전시/상영', '대회', '강연/세미나/워크샵', '모집', '공모전', '판매', '기타', '동아리', '자치단체', '학교'];

			var i = 0;
			var j = 0;

			if (temp['category_char'] == 'concert'){
				i = 0;
			}
			else if (temp['category_char'] == 'exib'){
				i = 1;
			}
			else if (temp['category_char'] == 'comp'){
				i = 2;
			}
			else if (temp['category_char'] == 'seminar'){
				i = 3;
			}
			else if (temp['category_char'] == 'recr'){
				i = 4;
			}
			else if (temp['category_char'] == 'contest'){
				i = 5;
			}
			else if (temp['category_char'] == 'sell'){
				i = 6;
			}
			else{
				i = 7;
			}

			if (temp['category_host'] == 'club'){
				j = 8;
			}
			else if (temp['category_host'] == 'student'){
				j = 9;
			}
			else if (temp['category_host'] == 'uni'){
				j = 10;
			}
			else{
				j = 7;
			}

			string ='<div id="myModal" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" id="close" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
			'<h4 class="modal-title">' + temp['title'] + '<small>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp' + category[i]+ '/' + category[j] +'</small></h4></div>'+
			'<div class="modal-body">'+
			'<div class="row">'+
			'<div class="col-lg-4 text-center">'+
            '</div>'+ // Poster loading space
			'<div class="col-lg-8">'+
			'<p>주최 : '+temp['host']+'</p><p>행사시간 : '+temp['date_start'] + ' ~ '+temp['date_end'] + '</p><p>행사장소 : '+temp['location']+'</p><p>행사소개 : '+temp['content']+'</p>'+
			'<p class="text-warning"><small>행사 관련 정보에 오류가 있을 경우 관리자에게 연락바랍니다.</small></p>'+
			'</div>'+
			'</div>'+
			'</div>'+
			'<div class="modal-footer">'+
			'<button type="button" class="btn btn-default" data-dismiss="modal" id="close">Close</button>'+
			'</div></div></div></div>';
			$("#zone").append(string);
			$("#myModal").modal('show');
		},
		error: function(status){
			string = "<div class='well' id='article_" + id_ + ".><h1>에러가 발생했습니다..</h1></div>";
			$("#zone").append(string);
		}
	});
return true;
};

function upload_request(id_){
	$.ajax({
		url:"/get_inform",
		dataType : 'JSON',
		data: {
			"id_" : id_
			//원래는 이벤트의 id를 주고, 그에 맞는 정보들을 받아오는 것입니다.
		},
		success:function(data){
			temp = data.context.event;
			string = 
            '<div id="myModal" class="modal modal-wide fade">'+
                '<div class="modal-dialog">'+
                    '<div class="modal-content">'+
                        '<div class="modal-header">'+
                            '<button type="button" id="close" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                            '<h4 class="modal-title">이벤트 업로드 신청</h4>'+
                        '</div>'+
                        '<div class="modal-body">'+
                            '<form class="form-horizontal" role="form" action="/create" method="POST">'+
                                '<div class="form-group">'+ // title
                                    '<label for="input_Title" class="col-lg-2 control-label">제목</label>'+
                                    '<div class="col-lg-10">'+
                                        '<input type="text" class="form-control" id="title" name="title" placeholder="제목을 적어주세요.">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // title_cal
                                    '<label for="input_Title_cal" class="col-lg-2 control-label">짧은 제목</label>'+
                                    '<div class="col-lg-10">'+
                                        '<input type="text" class="form-control" id="title_cal" name="title_cal" placeholder="달력에 표시될 제목입니다. 15자 내로 적어주세요.">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // content
                                    '<label for="input_Content" class="col-lg-2 control-label">소개</label>'+
                                    '<div class="col-lg-10">'+
                                        '<textarea class="form-control" id="content" name="content" rows="10" placeholder="이벤트 소개 부탁드립니다."></textarea>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // host
                                    '<label for="input_Host" class="col-lg-2 control-label">주최</label>'+
                                    '<div class="col-lg-10">'+
                                        '<input type="text" class="form-control" id="host" name="host" placeholder="주최자 또는 주최단체">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // category_host
                                    '<label for="input_Category_host" class="col-lg-2 control-label">주최 카테고리</label>'+
                                    '<div class="col-lg-10">'+
                                        '<select class = "form-control" id="category_host" name="category_host" placeholder="선택하세요.">'+
                                            '<option>동아리</option>'+
                                            '<option>자치단체</option>'+
                                            '<option>학교</option>'+
                                            '<option>기타</option>'+
                                        '</select>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // category_char
                                    '<label for="input_Category_char" class="col-lg-2 control-label">이벤트 카테고리</label>'+
                                    '<div class="col-lg-10">'+
                                        '<select class = "form-control" id="category_char" name="category_char" placeholder="선택하세요.">'+
                                            '<option>공연</option>'+
                                            '<option>전시/상영</option>'+
                                            '<option>대회</option>'+
                                            '<option>강연/세미나/워크샵</option>'+
                                            '<option>모집</option>'+
                                            '<option>공모전</option>'+
                                            '<option>판매</option>'+
                                            '<option>기타</option>'+
                                        '</select>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // date_start
                                    '<label for="input_Date_start" class="col-lg-2 control-label">시작 일시</label>'+
                                    '<div class="col-lg-10">'+
	                                    // '<div class="input-group date">'+
	                                        '<input type="text" class="form-control" id="datetimepicker1" value="2014-09-28 00:00:00" data-date-format="YYYY-MM-DD hh:mm:00" id="date_start" name="date_start"/>'+
	                                        // '<span class="input-group-addon"><span class="glyphicon-calendar glyphicon"></span>'+
	                                        // '</span>'+
	                                    // '</div>'+
	                                '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // date_end
                                    '<label for="input_Date_end" class="col-lg-2 control-label">종료 일시</label>'+
                                    '<div class="col-lg-10">'+
                                        // '<div class="input-group date">'+
                                            '<input type="text" class="form-control" id="datetimepicker2" value="2014-09-28 00:00:00" data-date-format="YYYY-MM-DD hh:mm:00" id="date_end" name="date_end"/>'+
                                            // '<span class="input-group-addon"><span class="glyphicon-calendar glyphicon"></span>'+
                                            // '</span>'+
                                        // '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // location
                                    '<label for="input_Location" class="col-lg-2 control-label">장소</label>'+
                                    '<div class="col-lg-10">'+
                                        '<input type="text" class="form-control" id="location" name="location" placeholder="이벤트 장소는 어디인가요?">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // link
                                    '<label for="input_Link" class="col-lg-2 control-label">링크</label>'+
                                    '<div class="col-lg-10">'+
                                        '<input type="url" class="form-control" id="link" name="link" placeholder="관련 정보 url">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // poster
                                    '<label for="input_Poster" class="col-lg-2 control-label">포스터 링크</label>'+
                                    '<div class="col-lg-10">'+
                                        '<input type="url" class="form-control" id="poster" name="poster" placeholder="이미지 파일 url">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // contact
                                    '<label for="input_Contact" class="col-lg-2 control-label">Email</label>'+
                                    '<div class="col-lg-10">'+
                                        '<input type="email" class="form-control" id="contact" name="contact" placeholder="연락가능한 Email">'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+ // contact_open
                                    '<label for="input_Title_cal" class="col-lg-2 control-label">Email 공개여부</label>'+
                                    '<div class="col-lg-10">'+
                                        '<div class=checkbox>'+
                                            '<label>'+
                                                '<input type="checkbox" id="contact_open" name="contact_open" value="y">비공개'+
                                            '</label>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="form-group">'+
                                    '<div class="col-lg-offset-2 col-lg-10">'+
                                        '<button type="submit" class="btn btn-default" id="submit" name="submit">등록</button>'+
                                    '</div>'+
                                '</div>'+
                            '</form>'
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>';

			$("#zone").append(string);
			$("#myModal").modal('show');
			$('#datetimepicker1').datetimepicker();
            $('#datetimepicker2').datetimepicker();

		},
		error: function(status){
			string = "<div class='well' id='article_" + id_ + ".><h1>에러가 발생했습니다..</h1></div>";
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
			);
		temp_day++;
		date_ds++;
	};

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

	// 4 differernt example
	// all
	// eventListAtMonthViewAll(first_date_str, last_date_str);

	// query 
	// eventListAtMonthViewQuery(first_date_str, last_date_str, "빌게이츠");

	// category
	// eventListAtMonthViewCategory(first_date_str, last_date_str, "sell");

	// custom
	eventListAtMonthView(first_date_str, last_date_str, "2014", "sell");
};

function getFirstDateOfThisWeek(year,month,date){ 
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

function getLastDateOfThisWeek(year,month,date){ 
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

function drawEventListAtMonthView(first_date_str, last_date_str, data) {
	$("tr > td > div.day > div.row").remove(); 

	window.console.log(data.context.event_list); 
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
				// $tmp.append('<div class="row row'+ind+'">'+ 'event' + i +'</div>');
				event_ = data.context.event_list[i]; 	
				$tmp.append('<div class="row row'+ind+'" date_start="'+event_.date_start+'" date_end="'+event_.date_end+'">'+ event_.title_cal +'</div>'); 	
			}				

			// increase one day
			target_date.setTime(target_date.getTime() + 24 * 60 * 60 * 1000);
		}
	}
}

function eventListAtMonthView(first_date_str, last_date_str, query, category){
	window.console.log("query: ");
	window.console.log(query);
	$.ajax({
		url:"/event_list",
		dataType:'JSON',
		type: "GET",
		data:{
			"first_date":first_date_str,
			"last_date":last_date_str,
			"query":query,
			"category":category,
		},
		success:function(data){
			// do what you want
			drawEventListAtMonthView(first_date_str, last_date_str, data) ;
		}
	});
};

function eventListAtMonthViewAll(first_date_str, last_date_str) {
	eventListAtMonthView(first_date_str, last_date_str, null, null);
}

function eventListAtMonthViewCategory(first_date_str, last_date_str, category) {
	eventListAtMonthView(first_date_str, last_date_str, null, category);
}


function eventListAtMonthViewQuery(first_date_str, last_date_str, query) {
	eventListAtMonthView(first_date_str, last_date_str, query, null);
}

$(document).ready(function(){

	makeMonthtemplate(2014,9);

	// $('.btn-upload').click(function(){
	// 	makeDetail(27);
	// });

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
	$('.day').hover(function(e){
		$target = $(this).parent();
		$target.toggleClass("grayday");
	});
	
	$('.day').click(function(){
        console.log('-------');

        if($(this).parent().parent().next().children().children('.list').attr("date") == $(this).children('.date').attr("date")){
        	console.log($(this).attr("date"));
        	console.log($(this).parent().parent().next().attr("date"));
            $(this).parent().parent().next().children().children('.list').slideToggle('fast');
            $('.list').remove();
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

});