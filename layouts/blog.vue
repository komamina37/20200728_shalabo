<template>
  <div id="wrapper" class="">
    <TheHeader />
    <transition name="page">
      <main class="contents">
        <div class="page">
          <h1 class="page-title">
            <span class="_ja">ブログ</span>
            <span class="_en">shalabo’s blog</span>
          </h1>
          <div class="post-containar">
            <div class="post-list">
              <transition-group tag="div" name="post-transition">
                <div v-for="post in posts" :key="post.id" class="post">
                  <nuxt-link :to="/blog/ + post.id" class="post_link">
                    <div class="thumb">
                      <img
                        v-if="post.img"
                        :src="post.img.url"
                        :alt="post.title"
                      />
                      <img
                        v-if="!post.img"
                        src="~/assets/images/article-default-image.png"
                        alt="image"
                      />
                    </div>
                    <div class="post-text">
                      <time class="post-time">{{
                        $formatDate(post.postDate)
                      }}</time>
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
              </transition-group>
              <p class="post_unknown" v-if="totalCount <= 0">
                該当のコンテンツは見つかりませんでした。
              </p>
              <Paging v-if="totalCount > 0"></Paging>
            </div>
            <div class="postSelect-list">
              <h3 class="list-title _tag"><span>タグ検索</span></h3>
              <div class="postTag-list postSelect-item">
                <span
                  v-on:click="search"
                  v-for="(tag, index) in tags"
                  :key="index"
                  class="post_tags"
                  :id="tag.id"
                  >{{ tag.name }}</span
                >
              </div>
            </div>
          </div>
          <nuxt />
        </div>
      </main>
    </transition>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "~/components/common/TheHeader";
import TheFooter from "~/components/common/TheFooter";

export default {
  components: {
    TheHeader,
    TheFooter
  }
};
</script>

<style scoped lang="scss">
@import "~assets/scss/variables";
#wrapper {
  transition: $ct;
  .contents {
    width: 1080px;
    margin: 0 auto;
    padding: 48px 0 0;
  }
  .page-enter {
    opacity: 0;
  }
  .page-enter-active {
    transition: opacity 0.7s;
  }

  .contents + footer {
    margin-top: 120px;
  }
}
</style>
