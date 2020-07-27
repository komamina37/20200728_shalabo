<template>
  <div class="page">
    <h2 class="page-categoryName _bb">
      <span v-for="(cat, index) in post.category" :key="index" :id="cat.id">{{
        cat.name
      }}</span>
    </h2>
    <h1 class="page-title _mt32">{{ post.title }}</h1>
    <div class="postTag-list postSelect-item _mt16" v-if="post.tags">
      <span v-if="post.ended" class="post_tags -ended">制作途中</span
      ><span
        v-for="(tag, index) in post.tags"
        :key="index"
        class="post_tags"
        :id="tag.id"
      >
        {{ tag.name }}
      </span>
    </div>

    <section class="page-images">
      <div :class="mainimage.class" class="mainimage-wrapper _mt48">
        <div class="mainimage-inner" :style="mainimage.style">
          <img :src="mainimage.img.url" :alt="post.title" class="mainimage" />
        </div>
      </div>
      <p v-if="mainimage.title" class="mainimage-title _mt16">
        {{ mainimage.title }}
      </p>
      <div v-if="post.images.length" class="image-group-wrapper _mt48">
        <div
          v-for="(sub, index) in post.images"
          :key="index"
          :style="sub.style"
          :id="'img' + (index + 1)"
          :class="sub.class"
          class="subimage-wrapper"
          @click="imegeChanged"
        >
          <div class="subimage-inner">
            <img :src="sub.img.url" class="subimage" />
          </div>
        </div>
      </div>
    </section>
    <section class="section page-detail _mt80">
      <div class="page-detailContainar" v-if="post.date_start">
        <h3 class="page-detailTitle">DATE:</h3>
        <p class="page-detailDesc _flex _mt8">
          <span>{{ $formatDateJa(post.date_start) }}</span>
          <span v-if="post.date_end"
            >&nbsp;-&nbsp;{{ $formatDateJa(post.date_end) }}</span
          >
        </p>
      </div>
      <div class="page-detailContainar _mt48" v-if="post.client">
        <h3 class="page-detailTitle">CLIENT:</h3>
        <p class="page-detailDesc _mt8">{{ post.client }}</p>
      </div>
      <div
        class="page-detailContainar description _mt48"
        v-if="post.html || post.iframe_pptx"
      >
        <h3 class="page-detailTitle">DESCRIPTION:</h3>
        <div
          v-if="post.iframe_pptx"
          v-html="post.iframe_pptx"
          class="iframe-wrapper _mt16 _mb80"
        ></div>
        <div v-html="post.html" class="page-detailDesc _mt8"></div>
      </div>
      <div class="page-detailContainar _mt48" v-if="post.url">
        <h3 class="page-detailTitle">URL:</h3>
        <a :href="post.url" class="page-detailDesc _mt8" target="_blank" rel>{{
          post.url
        }}</a>
      </div>
    </section>
    <div class="back_btn_wrapper">
      <nuxt-link to="/works/" class="back_btn _bb">一覧に戻る</nuxt-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: "",
      mainimage: ""
    };
  },
  head() {
    return {
      title: this.post.title
    };
  },
  async asyncData({ params }) {
    // console.log({ params });
    // console.log(params.slug);
    // console.log("param is ", params);
    const { data } = await axios.get(
      `https://shalabo.microcms.io/api/v1/works/${params.slug}`,
      {
        headers: { "X-API-KEY": process.env.MCMS_ACCESS_TOKEN }
      }
    );
    // console.log(data.images[0]);
    return {
      post: data,
      mainimage: data.images[0]
    };
  },
  mounted() {
    // console.log(this.post.images.length);
    // console.log(this.mainimage.img.url);

    // top image default add class
    let img1 = document.getElementById("img1");
    img1.classList.add("-now");
    // console.log(img1);
  },
  methods: {
    imegeChanged(e) {
      // console.log("changed");
      let addClass = "-now";

      // remove -now class
      let now = document.getElementsByClassName(addClass);
      // console.log(now);
      // for (let i in now) {
      for (let i = 0; i < now.length; i++) {
        // console.log(now[i]);
        now[i].classList.remove(addClass);
      }

      // target ID
      let target = e.target;
      target = target.closest(".subimage-wrapper");
      target.classList.add(addClass);
      // console.log(target);
      let n = target.id;
      // console.log(n);
      n = parseInt(n.replace(/[^0-9]/g, ""), 10) - 1;
      // console.log(n);

      // img url
      let image = this.post.images[n];
      // console.log(image);
      // console.log(this.mainimage);
      this.mainimage = image;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/works/_style.scss";
</style>
<style lang="scss" scoped>
.page {
  max-width: 800px;
  margin: 0 auto;
  a {
    transition: 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
  .page-title {
    font-size: 32px;
    font-weight: 600;
    line-height: 1.4;
    margin: 16px 0 0 0;
    @include sp {
      font-size: 24px;
      @include sp-se {
        font-size: 20px;
        line-height: 1.2;
        margin: 4px 0 0 0;
      }
    }
  }
  .page-categoryName {
    display: inline;
    font-size: 18px;
    span + span::before {
      content: "/";
      padding: 0 4px;
    }
    @include sp-se {
      font-size: 16px;
      padding-bottom: 8px;
    }
  }
  .postTag-list {
    display: inline-block;
    @include sp {
      margin-top: 8px;
    }
    @include sp-se {
      margin-top: 4px;
    }
    .post_tags {
      font-size: 16px;
      margin: 8px 0 0 8px;
      @include sp {
        font-size: 14px;
        margin: 8px 8px 0 0;
        padding: 6px 12px 6px;
      }
      @include sp-se {
        font-size: 14px;
        margin: 4px 4px 0 0;
        padding: 6px 8px 6px;
      }
      &:first-child {
        margin-left: 0;
      }
    }
  }
  .page-images {
    text-align: left;
    .mainimage-wrapper {
      @include beforeAspect();
      // background-color: var(--color_font01);
      box-sizing: border-box;
      border: solid var(--color_font01) 1px;
      .mainimage-inner {
        @include beforeCont();
        overflow-y: scroll;
        .mainimage {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      &.-iphone {
        .mainimage {
          @include beforeContCenter($h: calc(100% - (24px * 2)));
          width: unset;
          filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.5));
          object-fit: contain;
        }
      }
    }
    .mainimage-title {
      display: inline-block;
      font-size: 16px;
      font-weight: bold;
      opacity: 0.8;
      // border-left: solid var(--color_sub01) 4px;
      // margin-left: 24px;
      // padding: 4px 0 4px 16px;
      &::before {
        content: "-";
        color: var(--color_sub01);
      }
      @include sp {
        font-size: 16px;
        // margin-left: 0px;
        // padding: 4px 0 4px 12px;
      }
    }
    .image-group-wrapper {
      display: grid;
      // grid-template-columns: repeat(4, 1fr);
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      // grid-template-rows: repeat(auto-fill, minmax(1fr, 1fr));
      gap: 16px;
      width: calc(100% - (40px * 2));
      margin: 0 auto;

      @include sp {
        grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
        gap: 12px;
        width: 100%;
      }

      .subimage-wrapper {
        cursor: pointer;
        box-sizing: border-box;
        border: solid var(--color_font01) 1px;
        width: 100%;
        transition: $ct;
        @include beforeAspect;

        .subimage-inner {
          @include beforeCont();
          &:hover {
            opacity: 0.7;
          }
          .subimage {
            @include beforeCont();
            object-fit: cover;
          }
        }
        &.-now {
          pointer-events: none;
          border-color: var(--color_sub02);
          border-width: 2px;
          &::before {
            z-index: 2;
            background-color: #0e0e0e;
            opacity: 0.5;
          }
        }
        &.-iphone {
          .subimage {
            @include beforeContCenter($h: calc(100% - (8px * 2)));
            object-fit: contain;
          }
        }
        &.-scroll {
          &::after {
            z-index: 2;
            content: "scroll";
            position: absolute;
            background-color: var(--color_sub02);
            bottom: 8px;
            right: -8px;
            font-size: 12px;
            color: var(--color_font02);
            text-transform: uppercase;
            border: solid var(--color_font01) 1px;
            border-radius: 4px;
            padding: 6px 12px 8px;
            @include sp {
              bottom: 4px;
              right: -4px;
              font-size: 10px;
              border-radius: 2px;
              padding: 4px 8px;
            }
          }
        }
      }
    }
  }
  .section {
    width: calc(100% - (40px * 2));
    margin: 0 auto;
    @include sp {
      font-size: 14px;
      line-height: 1.5;
      width: 100%;
      margin: 0 auto;
    }

    &.page-detail {
      text-align: left;
      font-size: 16px;
      letter-spacing: 1.2px;
      line-height: 1.5;
      .page-detailTitle {
        color: var(--color_sub01);
      }
      .page-detailDesc {
        color: var(--color_font01);
        &._flex {
          display: flex;
        }
        @include sp {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.page {
  .page-images {
    .mainimage-wrapper {
      &.-scroll {
        ::-webkit-scrollbar {
          // border: solid var(--color_font01) 0.5px;
          background-color: var(--color_font01);
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          // box-shadow: inset 0 0 2px var(--color_font01);
          // box-shadow: inset 0 0 2px #777;
          background-color: var(--color_font01);
        }
        ::-webkit-scrollbar-thumb {
          background-color: var(--color_font02);
          border: solid var(--color_font01) 1px;
          width: 6px;
          border-radius: 5px;
        }
        .mainimage {
          object-fit: unset;
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
<style>
.iframe-wrapper {
  position: relative;
  width: 100%;
  margin: 0 auto;
}
.iframe-wrapper::before {
  content: "";
  display: block;
  width: 100%;
  padding-top: 61.8%;
}
.iframe-wrapper > iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss">
@import "~assets/scss/works/_post.scss";
</style>
