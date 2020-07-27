<template>
  <div class="page">
    <div class="post-containar">
      <div class="post_main">
        <time class="post-time">
          {{ $formatDate(post.postDate) }}
        </time>
        <h1>{{ post.title }}</h1>
        <div class="postTag-list postSelect-item">
          <nuxt-link
            :to="'/blog/tags/' + tag.id + '/page/1/'"
            v-for="(tag, index) in post.tags"
            :key="index"
            class="post_tags"
          >
            {{ tag.name }}
          </nuxt-link>
        </div>
        <img
          v-if="post.img"
          :src="post.img.url"
          :alt="post.title"
          class="post_mainImage"
        />
        <img
          v-if="!post.img"
          src="~/assets/images/article-default-image.png"
          alt="image"
          class="post_mainImage"
        />
        <div class="post_content _mt80" v-html="post.body"></div>
        <div class="post_linkContainar _mt80" v-if="post.links.length">
          <h2>関連リンク</h2>
          <div
            v-for="(link, index) in post.links"
            :key="index"
            class="post _mt24"
          >
            <a class="post_link" :href="'/works/' + link.id">
              <div class="thumbnail">
                <div class="thumb">
                  <img :src="post.img.url" :alt="post.title" />
                </div>
              </div>
              <div class="post_text">
                <p class="post_text_title">{{ link.title }}</p>
                <p class="post_text_detail">
                  <span>詳細を見る</span>
                </p>
              </div>
            </a>
          </div>
        </div>
        <div class="back_btn_wrapper">
          <nuxt-link to="/blog/" class="back_btn _bb">一覧に戻る</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import microcms from "~/plugins/microcms";
import axios from "axios";

export default {
  data() {
    return {
      post: ""
    };
  },
  head() {
    return {
      title: this.post.title
    };
  },
  async asyncData(params) {
    // console.log({ params });
    // console.log(params.slug);
    // let { data } = await microcms.get("blog/" + params.slug);
    // let post = { data }.data;
    // console.log(post);

    // console.log(params);
    let apipath = params.route.fullPath;
    // console.log(apipath);
    let { data } = await microcms.get(apipath);
    let post = { data }.data;
    // console.log(post);
    return {
      post
    };
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/blog/_style.scss";
</style>
<style lang="scss">
.post-containar {
  .post_main {
    max-width: 678px;
    width: 100%;
    margin: 0 auto;
    time {
      font-size: 16px;
      letter-spacing: 1.6px;
      padding: 0 0 0 22px;
      @include sp {
        font-size: 16px;
      }
      &::before {
        width: 16px;
        height: 16px;
        margin: 0px 8px 0 0;
        transition: $ct;
        @include sp {
          width: 18px;
          height: 18px;
        }
      }
    }
    h1 {
      font-size: 24px;
      font-weight: 600;
      line-height: 1.2;
      margin: 16px 0 0 0;
      @include sp {
        line-height: 1.2;
      }
    }
    .postTag-list {
      margin-top: 8px;
      @include sp {
        margin-top: 8px;
      }
    }

    h2 {
      display: block;
      position: relative;
      font-size: 24px;
      font-weight: 600;
      line-height: 1.5;
      width: calc(100% - (18px * 2));
      @include sp {
        font-size: 20px;
        line-height: 1.5;
        margin: 48px 0 0 0;
      }
    }

    .post_mainImage {
      width: 100%;
      margin: 32px 0 0 0;
    }

    .post_content {
      width: 100%;
      margin: 0;

      h3 {
        font-size: 20px;
        font-weight: bold;
        line-height: 1.5;
        width: calc(100% - (24px * 2));
        border-left: solid 4px var(--color_sub01);
        margin: 48px 0 0;
        padding-left: 16px;
        @include sp {
          font-size: 18px;
          line-height: 1.5;
          padding-left: 12px;
          margin: 24px 0 0 0;
        }
      }
      p {
        display: inline-block;
        font-size: 16px;
        line-height: 2;
        @include sp {
          font-size: 16px;
          line-height: 1.5;
        }
      }
      img {
        display: block;
        max-width: calc(100% - (0px * 2));
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
        // box-shadow: 4px 4px 0px rgba(0, 0, 0, .8);
        // border: solid $bw var(--color_font03);
        margin: 0px 0 24px;
        @include sp {
          margin: 0px auto 8px;
        }
      }
    }
    .post_linkContainar {
      width: 100%;
      .post {
        width: 100%;
        .post_link {
          z-index: 0;
          box-sizing: border-box;
          position: relative;
          display: flex;
          text-decoration: none;
          color: var(--color_font01);
          background-color: var(--color_font02);
          width: 100%;
          border: solid 2px var(--color_sub01);
          padding: 24px 16px;
          @include sp {
            border-width: 1px;
            padding: 8px 8px 12px;
          }
          .thumbnail {
            box-sizing: border-box;
            width: 30%;
            @include sp {
              width: 36%;
            }
            .thumb {
              width: 100%;
            }
          }
          .post_text {
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            justify-content: center;
            box-sizing: border-box;
            padding: 0 0 4px 24px;
            @include sp {
              max-width: 64%;
              padding: 0 0 8px 4.664%;
              @include sp-se {
                padding-bottom: 4px;
              }
            }
            .post_text_title {
              line-height: 1.5;
              @include pc {
                font-size: 22px;
                font-weight: bold;
              }
              @include sp {
                font-size: 16px;
              }
            }
            .post_text_detail {
              display: inline-block;
              position: relative;
              font-size: 16px;
              color: var(--color_sub01);
              width: 100%;
              margin-top: 12px;
              @include sp {
                margin-top: 8px;
                @include sp-se {
                  margin-top: 4px;
                }
              }
              span {
                z-index: 0;
                display: inline-block;
                background-color: var(--color_font02);
                padding: 0 12px 0 0;
                @include sp {
                  font-size: 14px;
                  padding: 0 8px 0 0;
                }
                // &::before {
                //   z-index: -1;
                //   content: "";
                //   position: absolute;
                //   transform: translate(0, -50%);
                //   left: 0;
                //   top: 50%;
                //   background-color: var(--color_sub01);
                //   width: 100%;
                //   height: 2px;
                //   @include sp {
                //     display: none;
                //   }
                // }
              }
            }
          }
        }
        &:first-of-type {
          margin-top: 24px;
        }
      }
    }
  }
  h2 + p {
    margin-top: 24px;
  }
  p + h2 {
    margin-top: 80px;
  }
  h3 + p {
    margin-top: 32px;
  }
}
</style>
