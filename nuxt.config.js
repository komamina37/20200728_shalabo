require("dotenv").config();
const axios = require("axios");
// get microcms
const microcms = axios.create({
  baseURL: `${process.env.MCMS_SPACE_ID}/api/v1/`,
  headers: {
    "X-API-KEY": process.env.MCMS_ACCESS_TOKEN
  }
});

export default {
  mode: "universal",
  // mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "shalabo | サボりがちフロントエンド志望大学生のポートフォリオ",
    titleTemplate: "%s | shalabo",
    meta: [
      {
        charset: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        hid: "description",
        name: "description",
        content:
          "shalabo（シャラボ）はフロントエンジニア志望の大学生のポートフォリオサイトです。気になった技術や趣味について記事にしたり、しなかったりします。"
      }
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico"
      }
    ],
    // typekit
    script: [{ src: "https://use.typekit.net/hra8fek.js" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#fff"
  },
  /*
   ** Global CSS
   */
  css: [
    "reset-css", // 上記でインスールしていれば
    "~/assets/scss/style.scss"
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: "~/plugins/formatDate.js" },
    { src: "~/plugins/typekit.js", mode: "client" },
    { src: "~plugins/googleAnalytics.js", mode: "client" },
    { src: "~plugins/localStorage.js", mode: "client", ssr: false }
  ],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  // site-map
  modules: [["@nuxtjs/sitemap"]],
  sitemap: {
    path: "/sitemap.xml"
  },
  // axios
  modules: ["@nuxtjs/axios"],
  axios: {
    proxyHeaders: false
  },
  // style-resources
  modules: ["@nuxtjs/style-resources"],
  styleResources: {
    scss: ["~/assets/scss/_variables.scss"]
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  /*
   ** 大文字と小文字の認識設定
   */
  router: {
    extendRoutes(routes) {
      for (const key in routes) {
        routes[key].caseSensitive = true;
      }
    },
    scrollBehavior: function(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  },
  generate: {
    routes() {
      const blogPost = microcms.get("blog").then(res => {
        return res.data.contents.map(post => {
          return "/blog/" + post.id;
        });
      });

      const blogPages = microcms.get("blog").then(res => {
        const totalCount = Array.from(
          Array(Math.ceil(res.data.totalCount / 5)).keys(),
          x => x + 1
        );
        return totalCount.map(tagsData => {
          return "/blog/page/" + tagsData;
        });
      });

      const blogTags = microcms
        .get("tags-blog")
        .then(async res => {
          const totalCount = await microcms.get("blog").then(e => {
            return Array.from(
              Array(Math.ceil(e.data.totalCount / 5)).keys(),
              x => x + 1
            );
          });
          return [res, totalCount];
        })
        .then(res => {
          let tags = res[0];
          let totalCount = res[1];
          return tags.data.contents.map(tagsData => {
            return totalCount.map(c => {
              return "/blog/tags/" + tagsData.id + "/page/" + c;
            });
          });
        });

      const worksPost = microcms.get("works").then(res => {
        return res.data.contents.map(post => {
          return "/works/" + post.id;
        });
      });

      const worksCategory = microcms.get("category").then(res => {
        return res.data.contents.map(post => {
          return "/works/category/" + post.id;
        });
      });

      return Promise.all([
        blogPost,
        blogPages,
        blogTags,
        worksPost,
        worksCategory
      ]).then(values => {
        return values.join().split(",");
      });
    }
  },
  env: {
    MCMS_SPACE_ID: process.env.MCMS_SPACE_ID,
    MCMS_ACCESS_TOKEN: process.env.MCMS_ACCESS_TOKEN
  }
};
