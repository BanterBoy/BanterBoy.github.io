$(document).ready(function(){
for(var i;i < 8;i++) {
    $('.slick-container')
    .append($('<div><img src="/assets/images/container_6/' + i + '.jpg" /></div>'));
}

    $('.slick-container').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
  });