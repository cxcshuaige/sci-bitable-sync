export default function doWaterMark(u) {
    function waterMark({ width = "150", height = "150", content = "", rotate = -30 } = {}) {
        // console.log(document.querySelector('.g-iceroot-main'))
        const canvas = document.createElement("canvas");
        canvas.setAttribute("width", width);
        canvas.setAttribute("height", height);
        var ctx = canvas.getContext("2d")!;
        ctx.rotate((rotate * Math.PI) / 180);
        ctx.globalAlpha = 0.1;
        ctx.strokeStyle = "#999"; 
        ctx.font = `lighter 16px sans-serif`;
        ctx.strokeText(content, 10, 60);
        // ctx.translate(50, 0);
        // ctx.fillText(content, parseFloat(width) / 3, parseFloat(height) / 3);
        // document.body.appendChild(canvas);
        return canvas.toDataURL();
    }

    function getInfo() {
        if (!u) {
            return "";
        }
        const { userName } = u;
        return `${userName}`;
    }

    setTimeout(() => {
        const info = getInfo();
        if (info) {
            const url = waterMark({
                content: info
            });
            const dom = document.createElement("div");
            dom.setAttribute(
                "style",
                `position: fixed;top: 0;z-index: 2147483647;pointer-events: none;width: 100vw;height: 100vh;background: url(${url}) space repeat;`
            );
            document.body.appendChild(dom);
        }
    }, 0);
}