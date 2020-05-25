$(document).ready(function () {
    //for(var i;i < 8;i++) {
    //    $('.slick-container')
    //    .append($('<div><img src="/assets/images/container_6/' + i + '.jpg" /></div>'));
    //}

    $('.slick-slideshow').slick({
        autoplay: true,
        cssEase: 'linear',
        dots: false,
        fade: true,
        infinite: true,
        speed: 500,
        variableWidth: true
    });

});
