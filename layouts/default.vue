<template>
  <div id="wrapper" class="">
    <TheHeader />
    <transition name="page">
      <main class="contents">
        <nuxt />
      </main>
    </transition>
    <TheFooter />
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
#wrapper {
  transition: $ct;
  .contents {
    max-width: 1080px;
    width: calc(100% - (16px * 2));
    margin: 0 auto;
    padding: 48px 16px 0;
    @include sp {
      max-width: 400px;
      width: calc(100% - (16px * 2));
      padding: 24px 16px 0;
    }
  }

  .contents + footer {
    margin-top: 120px;
    @include sp {
      margin-top: 64px;
    }
  }
}
</style>
