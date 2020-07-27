<template>
  <div class="page">
    <h1 class="page-title _mt48">
      <span class="_ja">作ったもの</span>
      <span class="_en">shalabo’s works</span>
    </h1>
    <div class="category-wrapper">
      <h3 class="page-categoryName _bb _mt64">カテゴリー</h3>
      <ul id="category-list" class="category-list">
        <li class="active" id="all">
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
    <p class="post_unknown" :key="'postUnknown'" v-if="totalCount <= 0">
      該当のコンテンツは<br class="_sp" />見つかりませんでした。
    </p>
    <div class="posts">
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
        <div class="postTag-list postSelect-item" v-if="post.tags">
          <span
            v-for="(tag, index) in post.tags"
            :key="index"
            class="post_tags"
            :id="tag.id"
            >{{ tag.name }}</span
          >
        </div>
      </nuxt-link>
    </div>
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
      nowCat: "",
      tagname: "",
      totalCount: "",
      nowPageNumber: "",
      offset: 0,
      limit: 5
    };
  },
  head() {
    return {
      title: "作ったもの - " + this.nowCat.name
    };
  },
  async asyncData({ params }) {
    const here = "works";
    const tagname = params.tags;
    // console.log("tagname is " + tagname);
    const dataList = await microcms.get(
      here + "?offset=0&limit=10&filters=category[contains]" + tagname
    );
    // console.log(here + "?offset=0&limit=5&filters=category[equals]" + tagname);

    let totalCount = dataList;
    totalCount = totalCount.data.totalCount;
    // console.log(totalCount);
    const category = await microcms.get("category");
    let nowCategory = await microcms.get("category/" + tagname);
    // console.log(nowCategory);

    // console.log("params is");
    // console.log(params);
    let posts = dataList.data.contents;
    let cats = category.data.contents;
    let nowCat = nowCategory.data;
    // console.log(nowCat);

    //現在のページ数を格納
    let nowPageNumber = 1;
    return {
      here,
      cats,
      nowCat,
      tagname,
      posts,
      totalCount,
      nowPageNumber
    };
  },
  mounted: function() {
    /* ---------------------------
        clicked button active.
      --------------------------- */

    var catList = document.getElementById("category-list").children;
    // console.log(catList);
    for (var i = 0; i < catList.length; i++) {
      var catItem = catList[i];
      catItem.classList.remove("active");
    }
    var catNowPage = document.getElementById(this.tagname);
    // console.log(catNowPage);
    catNowPage.classList.add("active");
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/works/_style.scss";
</style>
