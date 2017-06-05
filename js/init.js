/**
 * Created by mao on 17-6-5.
 */
(function ($) {
    $(function () {
        // $('.carousel.carousel-slider').carousel({fullWidth: true});
        // $('.carousel').carousel();
        // $('.slider').slider();
        // $('.parallax').parallax();
        // $('.modal').modal();
        // $('.scrollspy').scrollSpy();
        // $('.datepicker').pickadate({selectYears: 20});
        // $('select').not('.disabled').material_select();
        // $(".button-collapse").sideNav();
    });
})(jQuery);
let canvasWidth, canvasHeight;
let myCanvas = document.getElementById('color-canvas');
let ctx = myCanvas.getContext('2d');
let img = new Image;
let centerX = 47;
// let centerX = 457;
let centerY = 492;
let scale = 51.25;
img.onload = () => {
    let documentWidth = $(document).width() * 0.9;
    if (documentWidth < img.naturalWidth) {
        console.log('resize');
        canvasWidth = documentWidth;
        let ratio = documentWidth / img.naturalWidth;
        centerX *= ratio;
        scale *= ratio;
        centerY *= ratio;
        canvasHeight = img.naturalHeight * ratio;
    } else {
        canvasWidth = img.naturalWidth;
        canvasHeight = img.naturalHeight;
    }
    myCanvas.width = `${canvasWidth}`;
    myCanvas.height = `${canvasHeight}`;
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    draw();

};
img.src = 'img/color-bg.png';

function draw() {
    "use strict";
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2.0;
    ctx.moveTo(centerX + scale * 1.5, centerY - scale * 0.5);
    ctx.lineTo(centerX + scale * 2.5, centerY - scale * 7);
    ctx.lineTo(centerX + scale * 6.5, centerY - scale * 3);
    ctx.lineTo(centerX + scale * 1.5, centerY - scale * 0.5);
    ctx.stroke();
}