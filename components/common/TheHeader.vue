<template>
  <header class="header">
    <div class="header-inner">
      <nuxt-link to="/" class="header-logo"></nuxt-link>
      <div
        class="header_menu_button"
        @click="menuListToggle()"
        :class="{ active: $store.state.menuFlag }"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <transition name="overlay"
        ><div
          id="js-nav-overlay"
          class="navigation-overlay"
          v-show="this.$store.state.menuFlag"
          @click="menuListToggle()"
        ></div
      ></transition>
      <transition name="overlay">
        <div
          id="js-nav"
          class="navigation-wrapper"
          :class="{ active: $store.state.menuFlag }"
        >
          <ul class="main_nav">
            <!-- <li><nuxt-link to="/about/">about</nuxt-link></li> -->
            <li class="nav-list -works">
              <nuxt-link to="/works/"><span>works</span></nuxt-link>
            </li>
            <li class="nav-list -blog">
              <nuxt-link to="/blog/"><span>blog</span></nuxt-link>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </header>
</template>

<script>
// import store from "~/plugins/store_default.js";
export default {
  components: {},
  data() {
    return {
      modeSP: false,
      body: "",
      breakPC: 1980,
      breakTab: 770,
      breakSP: 480
    };
  },
  mounted: function() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize());
    // this.nowMenu();
  },
  methods: {
    handleResize: function() {
      // resizeのたびにこいつが発火するので、ここでやりたいことをやる
      let width = window.innerWidth;
      let height = window.innerHeight;
      // console.log("width: " + width + ", height: " + height);
      if (width <= this.breakTab) {
        this.modeSP = true;
      } else {
        this.$store.commit("menuOpenFlag", false);
        document.body.classList.remove("onModal");
        this.modeSP = false;
      }
    },
    nowMenu() {
      let path = this.$nuxt.$route.fullPath;
      path = path.split("/");
      let nav = document.querySelector("#js-nav");
      if (path[1]) {
        var nowli = nav.querySelector("*[class*='" + path[1] + "']");
        nowli.classList.add("-now");
      } else {
      }
    },
    menuListToggle() {
      let menuFlag = this.$store.state.menuFlag;

      let body = document.body;
      if (menuFlag) {
        menuFlag = false;
        body.classList.remove("onModal");
      } else {
        menuFlag = true;
        body.classList.add("onModal");
      }
      this.$store.commit("menuOpenFlag", menuFlag);
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  z-index: 10;
  position: fixed;
  // position: relative;
  top: 0;
  width: 100%;
}

.header-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1240px;
  width: calc(100% - (16px * 2));
  height: 60px;
  margin: 0 auto;
  padding: 0px 16px;
  @include sp {
    width: calc(100% - (8px * 2));
    height: 48px;
    padding: 0 8px;
  }

  a {
    color: inherit;
  }

  .header-logo {
    z-index: 2;
    width: 160px;
    background-color: var(--color_font01);
    mask-image: url(~assets/images/common/header/logo-text.svg);
    -webkit-mask-image: url(~assets/images/common/header/logo-text.svg);
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    mask-size: contain;
    -webkit-mask-size: contain;
    @include sp {
      width: 140px;
    }
    &::before {
      content: "";
      display: inline-block;
      width: 100%;
      padding-top: 15.625%;
    }
  }

  @include iPad {
    .header_menu_button {
      cursor: pointer;
      z-index: 10;
      display: block;
      position: absolute;
      right: 8px;
      width: 28px;
      height: 24px;
      $pad: 4px;
      padding: #{$pad};
      span {
        display: block;
        position: absolute;
        transform: translate(-50%, -50%);
        left: 50%;
        background-color: var(--color_font01);
        width: calc(100% - (#{$pad} * 2));
        $hei: 3px;
        height: #{$hei};
        border-radius: calc(#{$hei} / 2);
        transition: $ct;
        &:nth-child(1) {
          top: calc(#{$pad} + (#{$hei}/ 2));
        }
        &:nth-child(2) {
          top: 50%;
          top: calc(50%);
        }
        &:nth-child(3) {
          bottom: calc(#{$pad} - (#{$hei}/ 2));
        }
      }
      &.active {
        span {
          &:nth-child(1) {
            transform: translate(-50%, -50%) rotate(137deg);
            top: 50%;
          }
          &:nth-child(2) {
            opacity: 0;
          }
          &:nth-child(3) {
            transform: translate(-50%, -50%) rotate(43deg);
            top: 50%;
          }
        }
      }
    }
  }

  .navigation-wrapper {
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    transition: $ct;
    @include iPad {
      z-index: 9;
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(100%, 0);
      background-color: var(--color_font02);
      box-sizing: border-box;
      width: 80%;
      height: 100vh;
      padding: 8px 16px;

      &.active {
        display: block;
        transform: translate(0, 0);
      }
    }
    .main_nav {
      display: flex;
      flex-wrap: wrap;
      @include iPad {
        width: 100%;
        margin: 0 auto;
        margin-top: 80px;
      }

      li {
        position: relative;
        display: flex;
        align-items: center;
        font-size: 22px;
        letter-spacing: 2.4px;
        color: var(--color_font01);
        @include iPad {
          font-size: 20px;
          width: 100%;
        }

        &:not(:last-child):after {
          content: "/";
          margin: 0 8px;
          @include iPad {
            display: none;
          }
        }

        a {
          display: block;
          text-align: center;
          width: 100%;
          text-decoration: none;
          padding: 12px 8px 16px;
          span {
            padding: 0 16px;
            transition: $ct;
            @include beforeAbsolute($t: 50%, $l: 0%, $transX: 0%, $transY: 0%) {
              width: 0;
              height: 2px;
              background-color: var(--color_font01);
              animation-duration: 0.3s;
              animation-fill-mode: forwards;
            }
            @include sp {
              padding: 0 24px;
            }
          }
          &.nuxt-link-exact-active {
            pointer-events: none;
            transition: $ct;
          }
          &.nuxt-link-active {
          }
          @include iPad {
            padding: 20px 0 24px;
          }
        }
      }
    }
  }
}

// overlay
.onModal {
  .navigation-overlay {
  }
}
.navigation-overlay {
  @include overlay($rgb: #0e0e0e, $a: 0.7);
}
.overlay-enter {
  opacity: 0;
}
.overlay-enter-active {
  transition: opacity $ct;
}
</style>

<style lang="scss" scoped>
@keyframes navBorderNone {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}
@keyframes navBorderDeactive {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}
@keyframes navBorderActive {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

//test
@keyframes navBorderTest {
  0% {
    width: 100%;
  }
  100% {
    z-index: -1;
    width: 100%;
    height: 50%;
    transform: translate(0, 0);
    top: unset;
    bottom: 0;
    background-color: var(--color_sub03);
  }
}

span::before {
  // animation-name: navBorderNone;
  // width: 0;
}
.header-inner .navigation-wrapper .main_nav li a.nuxt-link-active span::before {
  animation-name: navBorderDeactive;
  width: 0;
}

.header-inner
  .navigation-wrapper
  .main_nav
  li
  a.nuxt-link-exact-active
  span::before {
  animation-name: navBorderActive;
  width: 100%;
}
</style>
