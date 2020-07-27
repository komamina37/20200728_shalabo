<template>
  <div class="page">
    <h1 class="page-title _mt48">
      <span class="_ja">作ったもの</span>
      <span class="_en">shalabo’s works</span>
    </h1>
    <div class="category-wrapper">
      <h3 class="page-categoryName _bb _mt64">カテゴリー</h3>
      <ul id="category-list" class="category-list">
        <li class="active" id="category-all">
          <router-link :to="'/works/'">
            全て
          </router-link>
        </li>
        <li v-for="cat in cats" :key="cat.id" class="" :id="cat.id">
          <router-link :to="'/works/category/' + cat.id">
            {{ cat.name }}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="posts" v-if="totalCount > 0">
      <nuxt-link
        :to="'/works/' + post.id"
        class="post"
        v-for="(post, index) in posts"
        :key="index"
      >
        <div class="thumb">
          <img
            v-if="post.images"
            :src="post.images[0].img.url"
            :alt="post.title"
          />
        </div>
        <div class="post-text">
          <time class="post-time">{{ $formatDate(post.date_start) }}</time>
          <h2 class="post_list_title">{{ post.title }}</h2>
        </div>
        <div
          class="postTag-list postSelect-item"
          v-if="post.tags || post.ended"
        >
          <span v-if="post.ended" class="post_tags -ended">制作途中</span
          ><span
            v-for="(tag, index) in post.tags"
            :key="index"
            class="post_tags"
            :class="tag.id"
            >{{ tag.name }}</span
          >
        </div>
      </nuxt-link>
    </div>
    <p class="post_unknown" :key="'postUnknown'" v-if="totalCount <= 0">
      該当のコンテンツは<br class="_sp" />見つかりませんでした。
    </p>
    <Paging v-if="totalCount > 9"></Paging>
  </div>
</template>

<script>
import microcms from "~/plugins/microcms";
import axios from "axios";

import Paging from "~/components/common/Paging";

export default {
  components: {
    Paging
  },
  data() {
    return {
      here: "works",
      posts: "",
      cats: "",
      tagName: "aaa",
      totalCount: "",
      nowPageNumber: "",
      offset: 0,
      limit: 5
    };
  },
  head: {
    title: "作ったもの"
  },
  async asyncData() {
    const here = "works";
    const dataList = await microcms.get(here + "?offset=0&limit=10");
    let totalCount = await microcms.get(here);
    totalCount = totalCount.data.totalCount;
    // console.log(totalCount);
    const category = await microcms.get("category");
    // console.log(category.data.contents);

    let posts = dataList.data.contents;
    posts.sort((a, b) => {
      return a.date_start < b.date_start
        ? 1
        : a.date_start > b.date_start
        ? -1
        : 0; // -1と1を入れ替え
    });
    let cats = category.data.contents;

    //現在のページ数を格納
    let nowPageNumber = 1;

    return {
      here,
      cats,
      posts,
      totalCount,
      nowPageNumber
    };
  },
  methods: {},
  mounted() {
    this.$store.commit("menuOpenFlag", false);
    document.body.classList.remove("onModal");
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/works/_style.scss";
</style>
<style lang="scss" scoped>
.post.-ended {
  .post-text {
    &::after {
      z-index: 2;
      content: "scroll";
      position: absolute;
      background-color: var(--color_sub01);
      top: 0;
      right: -8px;
      font-size: 12px;
      color: #fefefe;
      color: var(--color_font02);
      text-transform: uppercase;
      border: solid var(--color_font01) 1px;
      border-radius: 4px;
      padding: 6px 12px 8px;
    }
  }
}
</style>
