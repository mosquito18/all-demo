$(function () {
	$('#lanPos').css('top', $('.hover').offset().top);
	$('ul li').hover(function () {
		$('#lanPos').css('top', $(this).offset().top);
	}, function () {
		$('#lanPos').css('top', $('.hover').offset().top);
	})

	$('ul li').click(function () {
		for (var i = 0; i < $('ul li').size(); i++) {
			if (this == $('ul li').get(i)) {
				$('ul li').eq(i).children('a').addClass('hover');
			} else {
				$('ul li').eq(i).children('a').removeClass('hover');
			}
		}
	})

})