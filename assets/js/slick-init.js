$(document).ready(function () {
    //for(var i;i < 8;i++) {
    //    $('.slick-container')
    //    .append($('<div><img src="/assets/images/container_6/' + i + '.jpg" /></div>'));
    //}

    $('.slick-slideshow').slick({
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'linear',
        dots: false,
        fade: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 500
    });

});
