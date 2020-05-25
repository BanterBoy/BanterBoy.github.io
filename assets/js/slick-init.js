$(document).ready(function () {
    //for(var i;i < 8;i++) {
    //    $('.slick-container')
    //    .append($('<div><img src="/assets/images/container_6/' + i + '.jpg" /></div>'));
    //}

    $('.slick-container').slick({
        dots: false,
        infinite: true,
        speed: 500,
        fade: true,
        centerMode: true,
        variableWidth: true,
        cssEase: 'linear'
    });

    $('.slick-slideshow').slick({
        dots: false,
        autoplay: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        adaptiveHeight: true
    });

    $('.slick-variable-width').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true
    });

    $('.slick-center').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });

});
