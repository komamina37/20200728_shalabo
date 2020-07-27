import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  window.onNuxtReady(() => {
    createPersistedState({
      key: "shalabo-key"
      // storage: window.sessionStorage
    })(store);
  });
};
