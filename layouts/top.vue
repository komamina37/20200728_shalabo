<template>
  <div id="wrapper" class="">
    <TheHeader />
    <transition name="page">
      <main class="contents">
        <nuxt />
      </main>
    </transition>
    <footer>
      <small class="copyright">copyright&copy;shalabo.com</small>
    </footer>
  </div>
</template>

<script>
import TheHeader from "~/components/common/TheHeader";
import TheFooter from "~/components/common/TheFooter";

export default {
  components: {
    TheHeader,
    TheFooter
  }
};
</script>

<style scoped lang="scss">
@import "~assets/scss/variables";
.header {
  position: inherit !important;
}
#wrapper {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  transition: $ct;
  padding-top: 0;
  .contents {
    display: flex;
    width: 100%;
    margin: 0 auto;
    padding: 0px 0 0;
    .page {
      display: flex;
      width: 100%;
    }
  }
  footer {
    z-index: 1;
    text-align: center;
    margin-top: -2px;
    padding: 16px 0;
    small.copyright {
      z-index: 2;
      display: inline-block;
      color: var(--color_font02);
      color: var(--color_font01);
      font-size: 16px;
      font-weight: 300;
      letter-spacing: 1.5px;
    }
  }
}
</style>
