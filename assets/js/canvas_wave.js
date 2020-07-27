export default {
  mounted: function() {
    var unit = 200,
      canvas,
      context,
      height,
      width,
      xAxis,
      yAxis,
      speed,
      speedup,
      draw;

    function init() {
      canvas = document.getElementById("canvasWave");
      console.log(canvas);
      context = canvas.getContext("2d");
      // context.translate(0.5, 0.5);
      width = window.innerWidth;
      height = window.innerHeight * 2;
      console.log("width : " + width + ", height : " + height);

      xAxis = Math.floor(height / 16);
      yAxis = 0;

      // context.scale(0.5, 0.5);
      canvas_resize();
      draw();
    }

    function draw() {
      // キャンバスの描画を一度クリアにする
      context.clearRect(0, 0, width, height);

      // キャンバスの塗り潰し
      context.fillStyle = "#3c00fe";
      // context.fillRect(0, 0, canvas.width, canvas.height);

      //波～
      drawWave(draw.colorCode, 0.48, 3.2, 500);
      drawWave(draw.colorCode, 0.64, 2.4, 250);
      drawWave(draw.colorCode, 1.0, 1.6, 0);
      draw.seconds = draw.seconds + speed / 1000;
      draw.t = draw.seconds * Math.PI;
      var btn = document.getElementById("btn");
      btn.addEventListener("click", accel);
      setTimeout(draw, 20);

      //四角形
      context.fillStyle = "#ec4030";
      // context.fillRect(0, 0, 50, 50);
    }
    speedup = 4;
    speed = 14;
    draw.colorCode = "#a33c63";
    draw.seconds = 0;
    draw.t = 0;

    /**
     * 波(色,波幅のzoom,  不透明度, 波の開始位置の遅れを指示)
     */
    function accel() {
      speed += speedup;
      console.log(speed);
    }

    /**
     * canvasリサイズ
     */
    function canvas_resize() {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
    }
    window.addEventListener("resize", canvas_resize, false);

    /**
     * 波(色,波幅のzoom,  不透明度, 波の開始位置の遅れを指示)
     */
    function drawWave(color, alpha, zoom, delay) {
      context.fillStyle = color;
      context.globalAlpha = alpha;

      context.beginPath(); //パススタート
      drawSine(draw.t / 0.5, zoom, delay);
      context.lineTo(width + 10, height); //右下へ
      context.lineTo(0, height); //左下へ
      context.closePath(); //パスエンド
      context.fill(); //塗りつぶし
    }

    function drawSine(t, zoom, delay) {
      var x = t; //時間軸を横に
      var y = Math.sin(x) / zoom;
      context.moveTo(yAxis, unit * y + xAxis); //パスをスタートに置く

      // 横幅の波を描く
      var i;
      for (i = yAxis; i <= width + 10; i += 10) {
        x = t + (-yAxis + i) / unit / zoom;
        y = Math.sin(x - delay) / 3;
        context.lineTo(i, unit * y + xAxis);
      }
    }
    init();
  }
};
