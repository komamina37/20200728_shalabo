import Vue from "vue";

Vue.prototype.$formatDate = function(iso) {
  const date = new Date(iso);
  const yyyy = new String(date.getFullYear());
  const mm = new String(date.getMonth() + 1).padStart(2, "0");
  const dd = new String(date.getDate()).padStart(2, "0");
  const hour = new String(date.getHours()).padStart(2, "0");
  const min = new String(date.getMinutes()).padStart(2, "0");
  // return `${yyyy}/${mm}/${dd} ${hour}:${min}`;
  return `${yyyy}.${mm}.${dd}`;
};

Vue.prototype.$formatDateJa = function(iso) {
  const date = new Date(iso);
  const yyyy = new String(date.getFullYear());
  const mm = new String(date.getMonth() + 1).padStart(2, "0");
  return `${yyyy}年${mm}月`;
};
