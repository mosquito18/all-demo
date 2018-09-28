$(function () {
    $('#lanPos').css('top', $('.left-nav .hover').offset().top-$('.left-nav').offset().top);
	$('.left-nav ul li').hover(function () {
		$('#lanPos').css('top', $(this).offset().top-$('.left-nav').offset().top);
	}, function () {
		$('#lanPos').css('top', $('.left-nav .hover').offset().top-$('.left-nav').offset().top);
	})

	$('.left-nav ul li').click(function () {
		for (var i = 0; i < $('.left-nav ul li').size(); i++) {
			if (this == $('.left-nav ul li').get(i)) {
				$('.left-nav ul li').eq(i).children('a').addClass('hover');
			} else {
				$('.left-nav ul li').eq(i).children('a').removeClass('hover');
			}
		}
	})

})