<template>
  <footer class="footer">
    <small class="copyright">copyright&copy;shalabo.com</small>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  z-index: 1;
  position: relative;
  overflow: hidden;
  width: 100%;
  bottom: -4px;
  text-align: center;
  small.copyright {
    z-index: 2;
    display: block;
    position: relative;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 1.5px;
    padding: 24px 0 32px;
    @include sp {
      padding: 16px 0 24px;
    }
  }
}
</style>
