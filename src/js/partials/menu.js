$(function() {
    $(window).scroll(function() {
        if ($(window).scrollTop() > 25 ) {
            $('.menu').addClass('menu_scroll')
            $('.menu__items').addClass('menu__items_scroll')
            $('.menu__link').addClass('menu__link_scroll')
        } else
        {
            $('.menu').removeClass('menu_scroll')
            $('.menu__items').removeClass('menu__items_scroll')
            $('.menu__link').removeClass('menu__link_scroll')
        }

        $('.menu__item_active').removeClass('menu__item_active');

        switch( findTopElement( $(window).scrollTop() ) ) {
            case 0 :
                $('.menu__item').eq(0).addClass('menu__item_active');
                break;
            case 1 :
                $('.menu__item').eq(1).addClass('menu__item_active');
                break;
            case 2 :
                $('.menu__item').eq(2).addClass('menu__item_active');
                break;
            case 3 :
                $('.menu__item').eq(3).addClass('menu__item_active');
                break;
            case 4 :
                $('.menu__item').eq(4).addClass('menu__item_active');
                break;
        }

    });

    $('.menu__items').on('click', function(e) {
        var target = e.target;
        $('.menu__item_active').removeClass('menu__item_active');
        $(target).closest('.menu__item').addClass('menu__item_active')
    });

});

function findTopElement(delta) {
    if (delta === 0) return 0;
    var items = [
        $('#main').offset().top - delta - 25,
        $('#about').offset().top - delta - 25,
        $('#tools').offset().top - delta - 25,
        $('#customers').offset().top - delta - 25,
        $('#contact').offset().top - delta - 25
    ]
    for( var i = 0; i < items.length; i++ ) {
        if (items[i] > 0) return i - 1;
    }
}