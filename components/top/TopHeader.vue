<template>
  <div id="canvasTopHeaderWrapper" class="debug">
    <canvas id="canvasTopHeader"></canvas>
  </div>
</template>

<style scoped lang="scss">
#canvasTopHeaderWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 480px;
  #canvasTopHeader {
    width: 100%;
  }
}
</style>

<script>
export default {
  mounted: function() {
    let unit = 200,
      wrapper,
      canvas,
      ctx,
      height,
      width,
      mouseX = 0,
      mouseY = 0,
      separateX = 0,
      mappingX = 0,
      separateY = 0,
      mappingY = 0,
      draw;

    function init() {
      wrapper = document.getElementById("canvasTopHeaderWrapper");
      canvas = document.getElementById("canvasTopHeader");
      console.log(canvas);
      ctx = canvas.getContext("2d");
      width = wrapper.innerWidth;
      height = wrapper.innerHeight;
      console.log("mouseX : " + mouseX + ", mouseY : " + mouseY);
      console.log("separateX : " + separateX + ", separateY : " + separateY);

      canvas_resize();
      drawSky();

      canvas.addEventListener("mousemove", getMousePosition, false);
    }

    /**
     * canvasリサイズ
     */
    function canvas_resize() {
      width = wrapper.clientWidth;
      height = wrapper.clientHeight;
      console.log("width : " + width + ", height : " + height);

      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      console.log("width : " + canvas.width + ", height : " + canvas.height);
    }

    function drawSky() {
      ctx.clearRect(0, 0, width, height);
      // キャンバスの塗り潰し;
      ctx.strokeStyle = "#3c00fe";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // console.log(
      //   "mouseX : " + mouseX + "mouseX : " + Math.floor(canvas.width / mouseX)
      // );

      ctx.fillStyle = "#F7FFD8";
      ctx.beginPath();
      // 円の中心座標: (100,100)
      // 半径: 50
      // 開始角度: 0度 (0 * Math.PI / 180)
      // 終了角度: 360度 (360 * Math.PI / 180)
      // 方向: true=反時計回りの円、false=時計回りの円
      ctx.arc(
        canvas.width / 2 - 0.7 * mappingX,
        canvas.height / 2 - 0.7 * mappingY,
        360 / 2,
        (0 * Math.PI) / 180,
        (360 * Math.PI) / 180,
        false
      );
      ctx.fill();

      // 描画を更新
      setTimeout(drawSky, 20);
    }

    function getMousePosition(e) {
      // console.log(e);
      var rect = e.target.getBoundingClientRect();
      // console.log(rect);
      mouseX = Math.floor(e.clientX - rect.left);
      mouseY = Math.floor(e.clientY - rect.top);
      console.log("mouseX : " + mouseX + ", mouseY : " + mouseY);
      separateX = canvas.width / 10;
      separateY = canvas.height / 10;
      console.log("separateX : " + separateX + ", separateY : " + separateY);
      mappingX = (mouseX - separateX * 5) / separateX;
      mappingY = (mouseY - separateY * 5) / separateY;
      console.log("mappingX : " + mappingX + ", mappingY : " + mappingY);
    }

    init();
    window.addEventListener(
      "resize",
      function() {
        canvas_resize();
        drawSky();
      },
      false
    );
  }
};
</script>
