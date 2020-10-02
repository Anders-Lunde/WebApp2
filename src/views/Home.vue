<template>
  <div class="home">
    <div class="heading">Oslo SPeLL digitale tester</div>
    <h3>Server version:</h3>
    <div class="button-container">
      <a href="/oslospell/#/morfologi">Morfo Logi</a>
      <a href="/oslospell/#/si">Si!</a>
      <a href="/oslospell/#/les">Les!</a>
      <a href="/oslospell/#/tallforstaaelse">Tallforståelse</a>
      <a href="/oslospell/#/ordforraad">Ordforråd</a>
    </div>
    <h3>Local version:</h3>
    <div class="button-container">
      <a href="/#/morfologi">Morfo Logi</a>
      <a href="/#/si">Si!</a>
      <a href="/#/les">Les!</a>
      <a href="/#/tallforstaaelse">Tallforståelse</a>
      <a href="/#/ordforraad">Ordforråd</a>
    </div>

    <div class="video-area">
      <video class="narrator-video">
        <source :src="video1" />
      </video>
      <br />
      <button @click="playVideo()">Play video</button>
    </div>
    <img class="logo" :src="logoImg" />
  </div>
</template>

<script>
// @ is an alias to /src
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  components: {},
  computed: {},
  props: {},
  data() {
    return {
      video1: require("@/assets/vid_1.mp4"),
      video2: require("@/assets/vid_2.mp4"),
      logoImg: this.$store.state.logoOsloSpell,
    };
  },

  methods: {
    /*
     *METHOD START: playVideo:
     */
    playVideo: function () {
      const video = document.querySelector(".narrator-video");
      const source = document.querySelector(".narrator-video > source");

      //source.setAttribute("src", this.video1);

      //video.appendChild(source);
      video.play();
      video.addEventListener("ended", () => {
        video.pause();
        source.setAttribute("src", this.video2);
        video.load();
        video.play();
      });
    },
  },
  mounted() {
    /*
    const constraints = { audio: true, video: false };

    try {
      const stream = navigator.mediaDevices.getUserMedia(constraints);
      console.log("getUserMedia ok");
    } catch (err) {
      console.log("getUserMedia failed:");
      console.log(err);
    }
  */
  },
});
</script>

<style scoped>
.heading {
  font-size: 4vw;
  text-align: center;
  margin: 3%;
  margin-bottom: 1%;
  color: #ff0000;
}

.logo {
  display: block;
  margin-top: 7%;
  margin-left: auto;
  margin-right: auto;
  width: 25%;
}

.button-container {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

a {
  padding: 1vw 1vw;
  margin: 1vw 1vw;
  border: 0.4vw solid rgba(255, 255, 255, 0);
  border-radius: 3vw;
  box-sizing: border-box;
  text-decoration: none;
  font-family: "Roboto", sans-serif;
  font-size: 2.5vw;
  color: #95e638;
  text-shadow: 0 0.03em 0.04em rgba(0, 0, 0, 0.35);
  text-align: center;
  border-color: rgb(83, 156, 74);
}
h3 {
  text-align: center;
}
.video-area {
  text-align: center;
  justify-content: center;
  align-content: center;
}
.video-area > button {
  font-size: 4vw;
}
.video-area > .narrator-video {
  height: 20vh;
}
</style>
