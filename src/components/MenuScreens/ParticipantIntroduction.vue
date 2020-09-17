<template>
  <div class="grid-container">
    <div class="heading">{{ screenDataReadOnly.heading }}</div>

    <div class="narrator">
      <div v-show="animateNarrator === false">
        <Narrator1Static />
      </div>
      <div v-show="animateNarrator === true">
        <Narrator1Animated />
      </div>
    </div>

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
import Narrator1Static from "@/components/Narrator1Static.vue";
import Narrator1Animated from "@/components/Narrator1Animated.vue";

export default Vue.extend({
  name: "ParticipantIntroduction",
  components: {
    ButtonAudioPlay,
    ButtonGotoNext,
    Narrator1Static,
    Narrator1Animated,
  },
  data() {
    return {
      screenDataReadOnly: this.tStore.screens[this.tStore.ii],
      showGotoNext: false,
      deactivateAllButtons: false,
      animateNarrator: false,
    };
  },
  computed: {},
  props: ["tStore"],

  methods: {
    /*
     *METHOD START: gotoNextButton:
     */
    gotoNextButton: function() {
      if (this.deactivateAllButtons) {
        return;
      }
      this.tStore.ii++;
    },

    /*
     *METHOD START: playAudio
     */
    playAudio: function() {
      //Max 2 replays, except during edit mode.
      if (this.tStore.editMode === false) {
        if (this.tStore.screens[this.tStore.ii].nPlaybackTimes >= 3) {
          return;
        }
      }
      //Abort if something else is playing/animating
      if (this.deactivateAllButtons) {
        return;
      }
      //Temporarily deactivate buttons during playback
      this.deactivateAllButtons = true;

      /*
      If "isNarratorInstruction === true" for this screen, start by playing
      narrator instruction audio w/animation.

      */
      const instructionAudio = new Audio(
        this.tStore.screens[this.tStore.ii].instructionAudio
      );
      //Setup animation start/stop during playback
      instructionAudio.addEventListener("ended", () => {
        this.animateNarrator = false;
        this.deactivateAllButtons = false;
        this.showGotoNext = true;
      });
      instructionAudio.addEventListener("play", () => {
        this.animateNarrator = true;
      });

      //Excecute playback
      instructionAudio.play();
      this.tStore.screens[this.tStore.ii].nPlaybackTimes++;
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

.narrator {
  grid-row: 2;
  grid-column: 1/-1;
  justify-self: center;
  height: 100%;
}

.narrator > div {
  height: 100%;
}

.narrator > div > img {
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
