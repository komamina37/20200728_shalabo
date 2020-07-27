<template>
  <div class="post-containar _mt80">
    <div class="post-list">
      <div v-for="post in this.$parent.posts" :key="post.id" class="post">
        <nuxt-link :to="/blog/ + post.id" class="post_link">
          <div class="thumb">
            <img v-if="post.img" :src="post.img.url" :alt="post.title" />
            <img
              v-if="!post.img"
              src="~/assets/images/article-default-image.png"
              alt="image"
            />
          </div>
          <div class="post-text">
            <time class="post-time">{{ $formatDate(post.postDate) }}</time>
            <h2>{{ post.title }}</h2>
            <span
              v-for="(tag, index) in post.tags"
              :key="index"
              class="post_tags"
              >{{ tag.name }}</span
            >
          </div>
        </nuxt-link>
      </div>
      <Paging v-if="this.$parent.totalCount >= 1"></Paging>
      <p class="post_unknown" v-if="this.$parent.totalCount <= 0">
        お探しのコンテンツは<br class="_sp" />見つかりませんでした。
      </p>
    </div>
    <div class="postSelect-wrapper">
      <div class="postSelect-list">
        <h3 class="list-title _tag"><span>タグ検索</span></h3>
        <div class="postTag-list postSelect-item">
          <router-link
            :to="'/blog/tags/' + tag.id + '/page/1'"
            v-for="(tag, index) in this.$parent.tags"
            :key="index"
            class="post_tags"
            :id="tag.id"
            >{{ tag.name }}</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paging from "~/components/common/Paging";

export default {
  name: "PostList",
  data() {
    return {
      slug: this.$parent.slug,
      totalCount: this.$parent.totalCount,
      pageCount: this.$parent.pageCount,
      nowPageCount: this.$parent.nowPageCount
    };
  },
  components: {
    Paging
  },
  props: {},
  mounted() {
    if (this.$parent.nowTag) {
      let nowTagName = this.$parent.nowTag;
      // console.log(nowTagName);
      let postTagList = document.getElementsByClassName("postTag-list");
      let nowTag = document.getElementById(nowTagName);
      // console.log(nowTag);
      nowTag.classList.add("active");
    }
  },
  methods: {}
};
</script>

<style lang="scss">
@import "~assets/scss/blog/_list.scss";
</style>
