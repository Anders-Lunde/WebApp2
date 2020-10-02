<template>
  <div class="grid-container">
    <div class="heading">{{ screenDataReadOnly.heading }}</div>

    <video ref="instructionVideo" preload="auto">
      <source :src="screenDataReadOnly.introductionVideo + '#t=0.2'" />
    </video>

    <div class="audio-button" @click="playAudio()">
      <ButtonAudioPlay />
    </div>

    <div
      class="goto-next-button"
      v-if="showGotoNext === true"
      @click="gotoNextButton()"
    >
      <ButtonGotoNext />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ButtonAudioPlay from "@/components/ButtonAudioPlay.vue";
import ButtonGotoNext from "@/components/ButtonGotoNext.vue";

export default Vue.extend({
  name: "ParticipantIntroduction",
  components: {
    ButtonAudioPlay,
    ButtonGotoNext,
  },
  data() {
    return {
      screenDataReadOnly: this.tStore.screens[this.tStore.ii],
      showGotoNext: false,
      deactivateAllButtons: false,
    };
  },
  computed: {},
  props: ["tStore"],

  methods: {
    /*
     *METHOD START: gotoNextButton:
     */
    gotoNextButton: function () {
      if (this.deactivateAllButtons) {
        return;
      }
      this.tStore.ii++;
    },

    /*
     *METHOD START: playAudio
     */
    playAudio: function () {
      //Abort if something else is playing/animating
      if (this.deactivateAllButtons) {
        return;
      }
      //Temporarily deactivate buttons during playback
      this.deactivateAllButtons = true;

      const instructionVideo = this.$refs.instructionVideo as HTMLVideoElement;

      instructionVideo.addEventListener("ended", () => {
        this.deactivateAllButtons = false;
        this.showGotoNext = true;
      });

      //Excecute playback
      instructionVideo.play();
    },
  },
});
</script>

<style scoped>
.grid-container {
  display: grid;

  grid-template-columns:
    calc(var(--vw) * 25)
    calc(var(--vw) * 25)
    calc(var(--vw) * 25)
    calc(var(--vw) * 25);

  grid-template-rows: calc(var(--vh) * 15) calc(var(--vh) * 65) calc(
      var(--vh) * 20
    );

  margin: 0;
  padding: 0;
}

.heading {
  font-size: calc(var(--vh) * 6);
  grid-row: 1;
  grid-column: 1/-1;
  justify-self: center;
}

video {
  grid-row: 2;
  grid-column: 1/-1;
  justify-self: center;
  height: 100%;
}

.audio-button {
  grid-row: 3;
  grid-column: 1/-1;
  margin: calc(var(--vw) * 0.3);
  justify-self: center;
  align-self: end;
}

.goto-next-button {
  grid-row: 3;
  grid-column: 1/-1;
  justify-self: end;
  align-self: end;
}
</style>
