import VideoCard from "./video-card.vue";

const card = {
  install: function(Vue) {
    Vue.component("VideoCard", VideoCard);
  }
};

export default card;
