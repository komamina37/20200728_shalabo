<template>
  <div class="paging-containar">
    <router-link
      :to="this.$parent.slug + 'page/' + (this.$parent.nowPageCount - 1) + '/'"
      v-if="this.$parent.nowPageCount - 1 > 0"
      class="paging-list paging-array paging-beforePage"
    ></router-link>
    <router-link
      :to="this.$parent.slug + 'page/' + (this.$parent.nowPageCount + -2) + '/'"
      class="paging-list"
      v-if="this.$parent.nowPageCount - 1 > 1"
    >
      {{ this.$parent.nowPageCount - 2 }}
    </router-link>
    <router-link
      :to="this.$parent.slug + 'page/' + (this.$parent.nowPageCount - 1) + '/'"
      class="paging-list"
      v-if="this.$parent.nowPageCount - 1 > 0"
    >
      {{ this.$parent.nowPageCount - 1 }}
    </router-link>
    <div class="paging-list paging-nowPage">
      {{ this.$parent.nowPageCount }}
    </div>
    <router-link
      :to="this.$parent.slug + 'page/' + (this.$parent.nowPageCount + 1) + '/'"
      class="paging-list"
      v-if="this.$parent.pageCount - this.$parent.nowPageCount > 0"
    >
      {{ this.$parent.nowPageCount + 1 }}
    </router-link>
    <router-link
      :to="this.$parent.slug + 'page/' + (this.$parent.nowPageCount + 2) + '/'"
      class="paging-list"
      v-if="this.$parent.pageCount - this.$parent.nowPageCount > 1"
    >
      {{ this.$parent.nowPageCount + 2 }}
    </router-link>
    <router-link
      :to="this.$parent.slug + 'page/' + (this.$parent.nowPageCount + 3) + '/'"
      class="paging-list"
      v-if="this.$parent.pageCount - this.$parent.nowPageCount > 2"
    >
      {{ this.$parent.nowPageCount + 3 }}
    </router-link>
    <router-link
      :to="this.$parent.slug + 'page/' + (this.$parent.nowPageCount + 1) + '/'"
      class="paging-list paging-array paging-afterPage"
      v-if="!(this.$parent.pageCount == this.$parent.nowPageCount)"
    ></router-link>
  </div>
</template>

<script>
export default {
  name: "Paging",
  props: [],
  methods: {}
};
</script>

<style lang="scss" scoped>
.paging-containar {
  display: flex;
  justify-content: center;
  margin: 64px auto 0;
  .paging-list {
    cursor: pointer;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    text-decoration: none;
    color: var(--color_font01);
    width: calc(48px - (2px * 2));
    height: calc(48px - (2px * 2));
    background-color: var(--color_font02);
    filter: drop-shadow(2px 4px 2px rgba(0, 0, 0, 0.3));
    -webkit-filter: drop-shadow(2px 4px 4px rgba(0, 0, 0, 0.3));
    transition: $ct;
    &:hover {
      transform: translate(0%, calc(0% + 1px));
      filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));
      -webkit-filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 8px;
      opacity: 1;
      width: calc(100% - (#{$bwb} * 2));
      height: calc(100% - (#{$bwb} * 2));
    }
    &:nth-last-of-type() {
      margin-right: 0px;
    }
    &.paging-nowPage {
      cursor: default;
      pointer-events: none;
      font-size: 14px;
      font-weight: 900;
      color: var(--color_font02);
      background-color: var(--color_font01);
      filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));
      -webkit-filter: drop-shadow(0px 0px 1px rgba(0, 0, 0, 0.1));
    }
    &.paging-array {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        transform: translate(0, -50%);
        top: 50%;
        width: 0;
        height: 0;
        padding: 0;
        border-bottom: 6px solid transparent;
        border-top: 6px solid transparent;
        pointer-events: none;
      }
      &.paging-beforePage {
        &::after {
          left: 36%;
          border-right: 8px solid var(--color_font01);
        }
      }
      &.paging-afterPage {
        &::after {
          right: 36%;
          border-left: 8px solid var(--color_font01);
        }
      }
    }
  }
  .paging-list + .paging-list {
    margin-left: 16px;
  }
}
</style>
