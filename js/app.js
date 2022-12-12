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
})