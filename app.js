function slideItem(name, review, avatarUrl) {
    const item = $('<div>').addClass("text-center slide-item item");
    const avatar = $('<div>').addClass("mx-auto rounded-circle slide-img").css(
        'background-image', `url(${avatarUrl})`
    );
    const stars = $('<div>').addClass('stars');

    for (let i = 1; i <= 5; i++) {
        $(stars).append(i <= review ? $('<i>').addClass('fa-solid fa-star') : $('<i>').addClass('fa-regular fa-star'))
    }
    $(item).append(avatar).
        append($('<h2>').text(name)).
        append($('<h4>').text('Member')).
        append(stars).
        append($('<p>').addClass('text-muted').text('“Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, odio nobis officiis ea dignissimos facilis voluptatum omnis officia autem harum!”'));
    return item;
}

function getReviews(slideCount) {
    $.ajax({
        url: `https://namey.muffinlabs.com/name.json?count=${slideCount}&with_surname=true&frequency=all`,
        dataType: 'json',
        async: false,
        success: (data) => {
            data.forEach((name, k) => {
                $('.owl-carousel').append(slideItem(name, Math.floor(Math.random() * 5) + 1, `https://i.pravatar.cc/300?img=${k + 20}`));
            });
        }
    });
}

function carouselItemsGenerator(images) {
    images.forEach(img => {
        $('<div>').css(
            'background-image', img
        ).appendTo($(".carousel-item"))
    });
}

$(document).ready(() => {
    getReviews(4);
    $(window).on('scroll', () => {
        let scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $('.sticky').addClass('stickyAdd')
        }
        else {
            $('.sticky').removeClass('stickyAdd')
        }
    })
    new Typed(".event", {
        strings: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos dolorum in non, ut possimus voluptates.'],
        showCursor: false,
        smartBackspace: true,
        typeSpeed: 20,
        backSpeed: 20,
        loop: true,
        loopCount: Infinity,
        startDelay: 1000
    });


    // carousel with {owl carousel library}
    $('.owl-carousel').owlCarousel({
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        items: 1,
    });
    // carousel with bootstrap 5.2.3
    $('.carousel').carousel();
})