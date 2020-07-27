<template>
  <nuxt-link v-bind="$attrs" class="basicBtn">
    <p>
      <slot></slot>
    </p>
  </nuxt-link>
</template>

<style scoped lang="scss">
.basicBtn {
  display: block;
  margin: 32px 0 0 0;
  width: 208px;
  background-color: var(--color_sub03);
  // border: solid 2px var(--color_font01);
  border-radius: 30px;
  filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.2));
  transition: #{$ct};

  padding: 0;
  @include iPad {
    width: 180px;
    margin: 24px 0 0 0;
  }
  p {
    display: inline-block;
    width: 100%;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 5.4px;
    line-height: 1;
    color: var(--color_font02);
    text-align: center;
    text-decoration: none;
    padding: 16px 0;
    transition: #{$ct};
    @include iPad {
      font-size: 18px;
      padding: 12px 0;
    }
  }
  &:hover {
    transform: translateY(2px);
    filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.2));
  }
}
</style>
