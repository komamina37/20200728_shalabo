<template>
  <div class="page">
    <h1 class="page-title _mt48">
      <span class="_ja">ブログ</span>
      <span class="_en">shalabo’s blog</span>
    </h1>
    <PostList></PostList>
  </div>
</template>

<script>
import microcms from "~/plugins/microcms";
import axios from "axios";

import PostList from "~/components/blog/PostList";

export default {
  components: {
    PostList
  },
  head: {
    title: "ブログ記事一覧"
  },
  data() {
    return {
      slug: "",
      posts: "",
      totalCount: "",
      pageCount: "",
      nowPageCount: "",
      tags: ""
    };
  },
  async asyncData() {
    let dataList = await microcms.get("blog?offset=0&limit=5");
    // console.log(dataList.data);

    let slug = "/blog/";
    let totalCount = dataList.data.totalCount;
    let pageCount = Math.ceil(totalCount / 5);
    let nowPageCount = parseInt(1);
    //jsonの配列を格納
    let posts = dataList.data.contents;
    // console.log(posts);

    //jsonのタグの配列を格納
    let tagList = await microcms.get("tags-blog");
    // console.log(tagList);
    let tags = tagList.data.contents;
    // console.log(tags);

    return {
      slug,
      posts,
      totalCount,
      pageCount,
      nowPageCount,
      tags
    };
  },
  mounted() {
    this.$store.commit("menuOpenFlag", false);
    document.body.classList.remove("onModal");
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/blog/_style.scss";
@import "~assets/scss/blog/_list.scss";
</style>

<style lang="scss" scoped>
.post-transition-enter-active {
  transition: 0.5s;
}
.post-transition-enter,
.post-transition-leave-active {
  opacity: 0;
}
</style>
