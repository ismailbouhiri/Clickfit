$(document).ready(() => {
    $(window).on('scroll', () => {
        let scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $('.sticky').addClass('stickyAdd')
        }
        else {
            $('.sticky').removeClass('stickyAdd')
        }
    })
    let typed = new Typed(".event", {
        strings: ['Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, facere.'],
        showCursor: false,
        smartBackspace: true,
        typeSpeed: 20,
        backSpeed: 20,
        loop: true,
        loopCount: Infinity,
        startDelay: 1000
    });
})