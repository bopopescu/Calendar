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
			'<h4 class="modal-title">' + temp['title'] + '<small>        ' + temp['category_char'] + '/' + temp['category_host']+'</small></h4></div>'+
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

$(document).ready(function () {
	$('.btn-event').click(function(){
		makeDetail(1);
	});
	$('#myModal').on('hidden.bs.modal',function(e){
		console.log('-------');
		$('#myModal').remove();
	});
});