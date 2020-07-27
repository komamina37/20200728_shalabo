export default {
  mounted: function() {
    var unit = 200,
      body,
      height,
      width;

    function init() {
      body = document.getElementsByTagName("body");
      console.log(body);
      width = window.innerWidth;
      height = window.innerHeight;
      console.log("width : " + width + ", height : " + height);
      body[0].classList.add("color01");
    }
    init();
  }
};
