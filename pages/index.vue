<template>
  <div class="page">
    <TopAsset></TopAsset>
    <div class="top-hero">
      <div class="top-hero-svg-wrapper">
        <svg
          version="1.1"
          class="top-hero-svg"
          viewBox="0 0 100 75"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="100px"
          height="75px"
        >
          <!-- transformは 100:75 の逆数 -->
          <clipPath
            id="clip"
            clipPathUnits="objectBoundingBox"
            transform="scale(0.01, 0.0133333)"
          >
            <path>
              <animate
                dur="5s"
                repeatCount="indefinite"
                attributeName="d"
                values="M99.9,48.1c-2.1,11.7-7.6,10.3-22.3,17c-6.6,3-11.2,6.8-23.2,6.5C36.5,71.1,34.7,66,23.8,60.1
		C12.6,54,1,53.4,0.1,39.4c-0.6-9,3.2-10.8,8.2-16.3c3.5-3.8,9.5-2.5,13.8-6.8c7.7-7.6,10.2-7.6,23.6-6.9C57.2,10,67.3-0.1,79.9,5.8
		c9.8,4.5,8.8,11.7,12.3,21.1C94,31.7,101.1,41.1,99.9,48.1z"
              ></animate>
              <animate
                attributeName="enable-background:"
                dur="5s"
                repeatCount="indefinite"
                values="new 0 0 100 67.6;new 0 0 94 65.6;new 0 0 96 68;new 0 0 100 67.6"
              />
            </path>
          </clipPath>
        </svg>
        <div class="image">
          <TheBinKurage></TheBinKurage>
        </div>
      </div>
      <h1 class="title">
        <span class="_ruby">シャラボ</span>
        <TopTitle></TopTitle>
      </h1>
      <time class="top-time">
        <span class="_month">{{ mm }}</span>
        <span class="bar"></span>
        <span class="_date">{{ dd }}</span>
      </time>
      <div class="top-subtext-wrapper">
        <h2 class="_sub">
          <span><span>サボりがち</span></span>
          <span><span>フロントエンド志望</span></span>
          <span><span>大学生のポートフォリオ</span></span>
        </h2>
        <h3 class="_link">
          <nuxt-link :to="'/blog/' + blog.id">
            <span class="_desc">ブログ</span
            ><span class="_title">{{ blog.title }}</span>
          </nuxt-link>
        </h3>
        <h3 class="_link">
          <nuxt-link :to="'/works/' + work.id">
            <span class="_desc">作ったもの</span
            ><span class="_title">{{ work.title }}</span></nuxt-link
          >
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import microcms from "~/plugins/microcms";
import axios from "axios";

import TopTitle from "~/components/top/TopTitle";
import TopAsset from "~/components/top/TopAsset";
import TheBinKurage from "~/components/common/TheBinKurage";

export default {
  layout: "top",
  head() {
    return {
      titleTemplate: null,
      title: "shalabo | サボりがちフロントエンド志望大学生のポートフォリオ"
    };
  },
  components: {
    TopTitle,
    TopAsset,
    TheBinKurage
  },
  data() {
    return {
      work: "",
      blog: "",
      mm: "02",
      dd: "10",
      offset: 0,
      limit: 3
    };
  },
  async asyncData() {
    let blogsDate = await microcms.get(
      "blog?fields=title,updatedAt&-orders=updatedAt"
    );
    let worksDate = await microcms.get(
      "works?fields=title,updatedAt&-orders=updatedAt"
    );
    // console.log(worksDate);
    worksDate = new Date(worksDate.data.contents[0].updatedAt);
    blogsDate = new Date(blogsDate.data.contents[0].updatedAt);
    let update = function() {
      if (worksDate > blogsDate) {
        // console.log(worksDate);
        return worksDate;
      } else {
        // console.log(blogsDate);
        return blogsDate;
      }
    };
    // console.log(update());
    let mm = new String(update().getMonth() + 1).padStart(2, "0");
    let dd = new String(update().getDate()).padStart(2, "0");
    // console.log(mm, dd);

    let worksList = await microcms.get("works?offset=0&limit=3");
    let work = worksList.data.contents[0];
    let blogsList = await microcms.get("blog?offset=0&limit=3");
    let blog = blogsList.data.contents[0];
    // console.log(work);

    let w = await microcms.get("works");
    // console.log("w", w);
    return {
      work,
      blog,
      mm,
      dd
    };
  },
  mounted() {
    this.$store.commit("menuOpenFlag", false);
    document.body.classList.remove("onModal");
  }
};
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  .basicBtn {
    @include iPad {
    }
  }

  #top-asset {
    z-index: 1;
    overflow-y: hidden;
  }

  .top-hero {
    z-index: 2;
    overflow: hidden;
    position: relative;
    max-width: 1240px;
    width: calc(100% - (16px * 2));
    margin: 0 auto;
    @include iPad {
      width: calc(100% - (32px * 2));
      // width: 100%;
    }
    @include sp {
      width: calc(100% - (12px * 2));
    }
    &::before {
      z-index: 0;
      content: "";
      display: block;
      width: 100%;
      padding-top: 56%;
      @include sp {
        padding-top: 80vh;
      }
    }
    &::after {
      z-index: 2;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--color_font02);
      opacity: 0.5;
      opacity: 0;
    }
    .top-hero-svg-wrapper {
      position: absolute;
      // transform: translate(-50%, -50%);
      // top: 50%;
      // left: 50%;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 76%;
      @include iPad {
        top: 46%;
        left: 50%;
        width: 100%;
      }
      @include sp {
        top: 46%;
        left: 50%;
        width: 100%;
      }
      &::before {
        z-index: 0;
        content: "";
        display: block;
        width: 100%;
        padding-top: 75%;
        @include sp {
          // padding-top: 100%;
        }
      }
      .top-hero-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        #clip {
          position: absolute;
        }
      }
      .image {
        display: block;
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        clip-path: url(#clip);
        background-color: var(--color_sub01);
        width: 100%;
        height: 100%;
        .binkurage {
          position: absolute;
          transform: rotate(-8deg) translate(-50%, -50%);
          top: 47%;
          left: 50%;
          width: 16%;
        }
        &::after {
          z-index: 2;
          content: "";
          position: absolute;
          transform: translate(-50%, -50%);
          top: 50%;
          left: 50%;
          width: 100%;
          height: 100%;
          background-color: var(--color_sub01);
          mix-blend-mode: var(--blend-mode);
          // mix-blend-mode: color-burn;
          mix-blend-mode: hard-light;
          opacity: 0.3;
        }
      }
    }
    .top-hero-image {
      z-index: 1;
      position: absolute;
      transform: translate(-50%, -50%);
      top: 72%;
      left: 72%;
      top: 50%;
      left: 50%;
      width: 160%;
      @include sp {
        top: 88%;
        left: 80%;
        width: unset;
        height: 240%;
      }
    }

    h1 {
      position: absolute;
      z-index: 2;
      transform: translate(0, -50%);
      top: 12%;
      left: 0%;
      width: 420px;
      @include iPad {
        top: 14%;
        left: 0%;
        text-align: center;
        width: 50vw;
      }
      @include sp-se {
        top: 12%;
        left: 0%;
        width: 256px;
      }
      @include sp {
        top: 12%;
        left: 0%;
        width: 212px;
      }
      span._ruby {
        display: block;
        color: var(--color_sub02);
        font-size: 24px;
        font-weight: bold;
        letter-spacing: 24px;
        text-align: left;
        @include sp {
          font-size: 16px;
          letter-spacing: 16px;
        }
      }
      svg#top-title {
        display: block;
        transform: rotate(1deg);
        width: 100%;
        margin-top: 4px;
        @include iPad {
          width: calc(100% - 0px);
          margin: 0 auto;
        }
        @include sp {
        }
      }
    }

    .top-subtext-wrapper {
      position: absolute;
      z-index: 3;
      overflow: hidden;
      bottom: 8%;
      left: 48px;
      left: 0;
      max-width: 100%;
      // width: 420px;
      @include sp {
        bottom: 2.8%;
        left: 0;
      }
      @include sp-x {
        bottom: 8%;
        left: 0;
      }
      @include sp-se {
        bottom: 3.2%;
        left: 0;
      }
      h2._sub {
        display: block;
        text-align: left;
        color: var(--color_sub02);
        color: var(--color_font01);
        // opacity: 0.9;
        font-size: 32px;
        line-height: 56px;
        font-weight: bold;
        letter-spacing: 2.4px;
        // text-shadow: 2px 2px 1px var(--color_font02);
        transition: $ct;
        @include sp {
          font-size: 22px;
          line-height: 36px;
          font-weight: bold;
          letter-spacing: 1.6px;
          margin-top: 16px;
        }
        @include sp-se {
          font-size: 18px;
          line-height: 32px;
          font-weight: bold;
          letter-spacing: 1.6px;
          margin-top: 16px;
        }
        span {
          display: block;
          margin-top: 8px;
          &:first-child {
            margin-top: 0;
          }
          @include sp {
            margin-top: 4px;
          }
          @include sp-x {
            margin-top: 8px;
          }
          @include sp-se {
            margin-top: 2px;
          }
          span {
            display: inline-block;
            background-color: var(--color_sub03);
            background-color: var(--color_font02);
            border-bottom: solid 4px var(--color_sub01);
            padding: 0 12px;
            @include sp-se {
              border-bottom-width: 3px;
            }
          }
        }
      }

      h3._link {
        display: block;
        line-height: 24px;
        margin-top: 8px;
        overflow: hidden;
        &:first-of-type {
          margin-top: 16px;
          @include sp {
            margin-top: 16px;
          }
          @include sp-x {
            margin-top: 12px;
          }
          @include sp-se {
            margin-top: 4px;
          }
        }
        @include sp {
          line-height: 16px;
          margin-top: 4px;
        }
        @include sp-x {
          margin-top: 4px;
        }
        @include sp-se {
          line-height: 16px;
          margin-top: 2px;
        }
        a {
          position: relative;
          display: inline-block;
          transition: $ct;
          background-color: var(--color_font02);
          border-bottom: solid 4px var(--color_sub01);
          max-width: calc(100% - (12px * 2));
          padding: 10px 12px 6px;
          text-align: left;
          vertical-align: middle;
          text-decoration: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          @include sp {
            padding: 10px 12px 8px;
          }
          @include sp-se {
            border-bottom-width: 3px;
            padding: 8px 12px 6px;
          }

          &::before {
            position: relative;
            z-index: 1;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            transform: translate(-100%, 0);
            display: block;
            background-color: var(--color_sub01);
            width: 100%;
            height: 100%;
            transition: $ct;
          }
          span {
            position: relative;
            z-index: 2;
            display: inline;
            font-weight: bold;
            transition: $ct;

            &._desc {
              color: var(--color_sub01);
              font-size: 16px;
              letter-spacing: 2.4px;
              @include sp {
                font-size: 12px;
              }
              @include sp-se {
                font-size: 12px;
              }
            }
            &._title {
              color: var(--color_font01);
              font-size: 20px;
              font-weight: bold;
              letter-spacing: 2.4px;
              @include sp {
                font-size: 16px;
              }
              @include sp-se {
                font-size: 14px;
              }
            }
          }
          span + span {
            margin-left: 8px;
          }

          &:hover {
            &::before {
              transform: translate(0, 0);
            }
            span {
              color: var(--color_font02);
            }
          }
        }
      }
    }

    time.top-time {
      position: absolute;
      transform: translate(0, -50%);
      display: flex;
      flex-wrap: wrap-reverse;
      flex-direction: column-reverse;
      top: 12%;
      right: 4%;
      @include iPad {
        top: 12%;
        right: 0%;
      }
      span {
        display: block;
        text-align: center;
        &._date {
          font-size: 72px;
          @include sp {
            font-size: 56px;
          }
          @include sp-se {
            font-size: 48px;
          }
        }
        &._month {
          font-size: 56px;
          // letter-spacing: 8px;
          @include sp {
            font-size: 40px;
          }
          @include sp-se {
            font-size: 36px;
          }
        }
        &.bar {
          background-color: var(--color_font01);
          width: 100%;
          height: 6px;
          margin: 4px 0 8px;
          @include sp {
            height: 4px;
            margin: 2px 0 4px;
          }
        }
      }
    }
  }
}
</style>
