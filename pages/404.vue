<template>
  <div class="layout-error">
    <section class="error">
      <h2>404</h2>
      <ArticleBody>
        <h3>名前はまだ無い</h3>
        <p>アクセスされたページは存在しないか、すでに削除されています。</p>
      </ArticleBody>
    </section>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "ページが見つかりませんでした"
    };
  }
};
</script>
