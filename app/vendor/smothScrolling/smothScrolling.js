function initSmothScrolling () {
    $(function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
}



//$(function() {
//    $('#highscoreButton').bind('click',function(event){
//        var $anchor = $(this);
//        /*
//         if you want to use one of the easing effects:
//         $('html, body').stop().animate({
//         scrollLeft: $($anchor.attr('href')).offset().left
//         }, 1500,'easeInOutExpo');
//         */
//        $('html, body').stop().animate({
//            scrollLeft: $($anchor.attr('href')).offset().left
//        }, 1000);
//        event.preventDefault();
//    });
//});