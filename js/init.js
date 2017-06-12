/**
 * Created by mao on 17-6-5.
 */
Date.prototype.Format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
const img = new Image;
img.src = 'img/color-bg.png';
let real = {luminance: 0, chromx: 0, chromy: 0, timeNow: ''};
let test = {
    rx: 0,
    ry: 0,
    gx: 0,
    gy: 0,
    bx: 0,
    by: 0,
    w: 0,
    timeNow: '',
    luminance: real.luminance
};
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
        ctx.fillStyle = 'white';	//设置填充样式
        ctx.strokeStyle = 'black';	//设置表框样式
        ctx.lineWidth = 1;	//设置边框的大小
        ctx.fillRect(centerX + scale * 0.5, centerY - scale * 0.85, 10, 10);	//在50,50处画一个矩形，并填充它
        ctx.strokeRect(centerX + scale * 0.5, centerY - scale * 0.85, 10, 10);	//在来画个边框
        ctx.fillStyle = 'black';	//设置填充样式
        ctx.lineWidth = 1;	//设置边框的大小
        ctx.fillRect(centerX + scale * 0.5, centerY - scale * 0.85 + 20, 10, 10);	//在50,50处画一个矩形，并填充它
        ctx.strokeRect(centerX + scale * 0.5, centerY - scale * 0.85 + 20, 10, 10);	//在来画个边框
        ctx.font = "15px Georgia";
        ctx.fillText("检测数据", centerX + scale * 0.5 + 20, centerY - scale * 0.85 + 10);
        ctx.fillText("标准数据", centerX + scale * 0.5 + 20, centerY - scale * 0.85 + 30);
    } else {
        img.onload = () => {
            draw(canvas, values);
        };
    }
}
function getRealtime() {

    $.post(window.location, {type: 'realtime'},
        function (data) {
            if (data.error) {
                window.location = '404.html';
            }
            real.chromx = data.chromx;
            real.chromy = data.chromy;
            real.luminance = data.luminance;
            test.luminance = data.luminance;
            real.timeNow = new Date().Format("yyyy-MM-dd hh:mm:ss");
            setTimeout(getRealtime, 1000);
        }).fail(function (err) {
        console.log('ERROR', err);
        setTimeout(getRealtime, 1000);
    });

}


function getTestsequence() {
    $.post(window.location, {type: 'test'},
        function (data) {
            if (data.error) {
                window.location = '404.html';
            }
            test.rx = data.rx;
            test.ry = data.ry;
            test.gx = data.gx;
            test.gy = data.gy;
            test.bx = data.bx;
            test.by = data.by;
            test.w = data.w;
            test.timeNow = new Date().Format("yyyy-MM-dd hh:mm:ss");
            setTimeout(getTestsequence, 60000);
        }).fail(function (err) {
        console.log('ERROR', err);
        setTimeout(getTestsequence, 1000);
    });

}
if (/[0-9]{6,}/.test(window.location)) {
    getTestsequence();
    getRealtime();
} else {
    window.location = '404.html'
}

