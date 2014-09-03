
function getArticleAfterArticle(article_id)
{
	var EndArticle = false;
 
	$.ajax({
		url: "/more",
		dataType: 'JSON',
		data: {
			last_article_id : article_id
		},
 
		success: function(data){
			if(data.count == 0){
				alert("마지막글입니다");
				$("#morebtn").hide();
				EndArticle =true;
			}else{
				for (var article_idx in data.article_list)
				{
					article = data.article_list[article_idx]
					string = "<div class='well' id='article_"+ article.id 
					+"'><h1><a href='/article/detail/"+ article.id +"'>"
					+ article.title +"</a></h1><h3>"+ article.author +"</h3><h6>"
					+"</h6><p> "
					+ article.content +" </p> </div>";
					$(string).insertAfter($(".well:last"))
				}
 
			}
		},
 
		error: function(status){
			string = "<div class='well' id='article_"+ data.id
			+"'><h1>에러가 발생했습니다..</h1></div>";
			$("#results").append(string);
		}
	});
	return true;
 
}
 
$(document).ready(function() {
	var number = 0;
	var string;
 
	$('#load_more_button').bind('click', function() {
		var article_id = $(".well:last").attr("article_id");
		getArticleAfterArticle(article_id);
		return false;
	});
});