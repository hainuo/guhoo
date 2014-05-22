$(function(){
	$('.header-i.deafult').bind('mouseover mouseout',function(){
		var o = $(this);
		if (o.hasClass('deafult'))
			o.removeClass('deafult').addClass('hover');
		else
			o.removeClass('hover').addClass('deafult');
	})

	$('#txtKey').live('focus',function(){
		if ($(this).val()=='输入淘宝帐号')
			$(this).val('').css('color','rgb(24,36,71)');
	}).live('blur',function(){
		if ($(this).val()==''){
			$(this).val('输入淘宝帐号').css('color','gray');
		}
	});
	
	$(".list tbody tr:even").addClass("even"); 
	$(".list tbody tr:odd").addClass("odd"); 
	
	//getSearchNum();
	//get_rate();
	
	$(function(){
		$(".pl_nav li").each(function(index){
			$(this).click(function(){ 
			$(".pl_nav li").removeClass("pl_bg");
			$(this).addClass("pl_bg");
			$(".pl_table").hide();
			$(".pl_table").eq(index).show();
			});
		});
	});
	
	/*中差url*/
	$(function(){
		var cont = request('p');
		if(cont == 'z'){
			$(".pl_nav li").removeClass("pl_bg");
			$(".pl_table").hide();
			$(".pl_nav li:eq(1)").addClass("pl_bg");
			$(".pl_table:eq(1)").show();
		}
		if(cont == 'c'){
			$(".pl_nav li").removeClass("pl_bg");
			$(".pl_table").hide();
			$(".pl_nav li:eq(2)").addClass("pl_bg");
			$(".pl_table:eq(2)").show();
		}
	});
});

// function getSearchNum(){
// 	$.get('/Index/countSearchNum',{},function(request){
// 		var i=0,
// 			num = request.split(''),
// 			len=0;
// 		len = num.length;
// 		$('.numbers').empty();
// 		for (var k in num){

// 			$('.numbers').prepend('<i class="numbers-i wh n'+num[len-k-1]+'"></i>');
// 			i++;
// 			if (i%3==0 && i!=len)
// 				$('.numbers').prepend('<img src="/Public/images/Comma.png" />');
// 		}
		
// 	});
// 	setTimeout(getSearchNum,6000);
// }

function get_rate(){
	$.get('/TaobaoLook/get_rate?username='+$('#txtKey').val(),{},function(request){
		$('.msg-blue-u').html(request);
	});
}

/*获取URL制定参数*/
function request(paras){ 
	var url = location.href; 
	var paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	var paraObj = {} 
	for (i=0; j=paraString[i]; i++){ 
	paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	} 
	var returnValue = paraObj[paras.toLowerCase()]; 
	if(typeof(returnValue)=="undefined"){ 
	return ""; 
	}else{ 
	return returnValue; 
	} 
}