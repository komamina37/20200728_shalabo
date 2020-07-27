<template>
  <div class="page">
    <h1 class="page-title">
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
  async asyncData({ params }) {
    // console.log({ params });
    // console.log(params.page);

    let dataList = await microcms.get("blog");
    let slug = "/blog/";
    // console.log("slug is " + slug);
    //jsonの配列を格納
    let totalCount = dataList.data.totalCount;
    let pageCount = Math.ceil(totalCount / 5);
    let nowPageCount = parseInt(params.page);
    // console.log(nowPageCount);
    let posts = await microcms.get(
      "blog?offset=" + (0 + (nowPageCount - 1) * 5) + "&limit=5"
    );
    // console.log("blog?offset=" + (0 + (nowPageCount - 1) * 5) + "&limit=5");
    posts = posts.data.contents;
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
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/scss/blog/_style.scss";
@import "~assets/scss/blog/_list.scss";
</style>
