/**
 * Created by mao on 17-6-5.
 */
const img = new Image;
img.src = 'img/color-bg.png';
let real = {luminance: 47.7, chromx: 0.314, chromy: 0.361};
let test = {rx: 0.680, ry: 0.320, gx: 0.265, gy: 0.690, bx: 0.150, by: 0.060, w: 47.7};
new Vue({
    el: '#real',
    data: real
});
new Vue({
    el: '#test',
    data: test
});
new Vue({
    el: '#canvas-container',
    data: test,
    directives: {
        refresh: function (canvasElement, binding) {
            draw(canvasElement, binding.value);
        }
    }
});
function draw(canvas, values) {
    if (img.complete) {
        let centerX = 47;
        let centerY = 492;
        let scale = 512.5;
        let canvasWidth, canvasHeight;
        let ctx = canvas.getContext('2d');
        let documentWidth = $(document).width() * 0.9;
        if (documentWidth < img.naturalWidth) {
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
        canvas.width = `${canvasWidth}`;
        canvas.height = `${canvasHeight}`;
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
        ctx.beginPath();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2.0;
        ctx.moveTo(centerX + scale * values.rx, centerY - scale * values.ry);
        ctx.lineTo(centerX + scale * values.gx, centerY - scale * values.gy);
        ctx.lineTo(centerX + scale * values.bx, centerY - scale * values.by);
        ctx.lineTo(centerX + scale * values.rx, centerY - scale * values.ry);
        ctx.stroke();
    } else {
        img.onload = () => {
            draw(canvas, values);
        };
    }
}