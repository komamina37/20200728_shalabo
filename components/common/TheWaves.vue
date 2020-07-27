<template>
  <div id="canvasWaveWrapper" class="debug">
    <canvas id="canvasWave"></canvas>
    <button class="debug" id="btn">btn</button>
  </div>
</template>

<script src="~/assets/js/canvas_wave.js"></script>

<style scoped lang="scss">
#canvasWaveWrapper {
  overflow: hidden;
  max-width: 920px;
  width: 100%;
  max-height: 320px;
  margin: 0 auto;
  #canvasWave {
    width: 100%;
  }
  &.debug {
    z-index: -1;
  }
}

#btn {
  font-size: 24px;
  padding: 16px 0;
  width: 160px !important;
  &.debug {
    position: fixed !important;
    transform: translate(-50%, -50%) !important;
    left: 50% !important;
    top: 50% !important;
  }
}
</style>
