var img;
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

const browseBtnHandler = () => {
    $('#fileSelectorInput').click();
};

const deleteHandler = () => {
    $('#dragger').html($(`
    <div class="icon d-flex justify-content-center">
        <i class="fa-solid fa-images"></i>
    </div>
    <h2 class="dragMsg text-center">Drag and drop image</h2>
    <h3 class="dragMsg1 text-center">Or</h3>
    <div class="d-grid gap-2 col-6 mx-auto">
    <button
      class="btn btn-outline-secondary text-center mx-auto btn-sm browseFileBtn"
      onclick="browseBtnHandler()"
    >
      Browse file
    </button>
    </div>
    <input type="file" id="fileSelectorInput" hidden/>`))
        .removeClass('active');
    $('#filename').html("");
    img = '';
}

const uploadFileandler = (file, dragger) => {
    const validFileExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validFileExtensions.includes(file.type)) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
            let fileUrl = fileReader.result;
            img = fileUrl;
            let imgTag = $(`<img src="${fileUrl}" alt="image input"/>`)
            dragger.html(imgTag);
            if (!($('.img-name').length)) {
                $('#filename').html($('<p>').text(`${file.name.split('.')[0]}`)
                    .addClass('img-name'));
                $('#filename').append($('<i>')
                    .addClass('fa-solid fa-trash-can')
                    .click(deleteHandler));
            }
            else
                $('.img-name').text(`${file.name.split('.')[0]}`);
        }
        fileReader.readAsDataURL(file);
        dragger.addClass('active');
    }
}

function UploadImg() {
    if (img) {
        $('.close-popup').click();
        $('.carousel-inner').append($('<div>').addClass('carousel-item'))
            .append($('<div>'))
            .addClass('slide-tran')
            .css(
                'background-image', `url(${img})`
            );
        img = '';
    }
}

function setupListners() {
    let dragger = $('#dragger');
    let draggerMsg = $('.dragMsg');
    let fileSelector = $('#fileSelectorInput');


    fileSelector.on("change", function (e) {
        console.log(this.files[0]);
        let file = this.files[0];
        uploadFileandler(file, dragger);
    });

    dragger.on('dragover', (e) => {
        e.preventDefault();
        draggerMsg.text("Release to upload image");
    })

    dragger.bind('dragleave', function () {
        draggerMsg.text("Drag and drop image");

    });

    dragger.bind('drop', function (e) {
        e.preventDefault();
        let file = e.originalEvent.dataTransfer.files[0];
        uploadFileandler(file, dragger);
    });

}


$(document).ready(() => {

    setupListners();

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