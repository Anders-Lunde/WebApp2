<template>
  <div class="grid-container-test" :style="cssVarsForTest">
    <!-- Test stuff: -->
    <div class="left-area" :class="{ run_animation: animateLeft === true }">
      <div
        class="character-area"
        :class="{ selectedCharacter: screens[ii].userAnswer === 'left' }"
      >
        <div class="char-img left" @click="characterSelected('left')">
          <img :src="epiInflectionalCharImgLeft" />
        </div>
      </div>
    </div>

    <div class="middle-area">
      <img :src="screens[ii].img" />
    </div>

    <div class="right-area" :class="{ run_animation: animateRight === true }">
      <div
        class="character-area"
        :class="{ selectedCharacter: screens[ii].userAnswer === 'right' }"
      >
        <div class="char-img right" @click="characterSelected('right')">
          <img :src="epiInflectionalCharImgRight" />
        </div>
      </div>
    </div>

    <div
      class="narrator"
      v-if="editMode === false && screens[ii].isPractice === true"
    >
      <div v-show="animateNarrator === false">
        <Narrator1Static />
      </div>
      <div v-show="animateNarrator === true">
        <Narrator1Animated />
      </div>
    </div>

    <div class="button audio-button" @click="playAudio()">
      <ButtonAudioPlay />
    </div>

    <div
      v-show="screens[ii].userAnswer !== null && deactivateAllButtons === false"
      class="button goto-next-button"
    >
      <div @click="gotoNextButton">
        <ButtonGotoNext />
      </div>
    </div>

    <!-- Edit mode stuff: -->
    <div v-if="editMode === true" class="option-label-left">
      <div v-if="screens[ii].answerKey === 'left'">
        <EditModeLabelCorrectAnswer
          :label-text="screens[ii].sentenceLeft"
          font-size="2.5"
        />
      </div>
      <div v-else>
        <EditModeLabelWrongAnswer
          :label-text="screens[ii].sentenceLeft"
          font-size="2.5"
        />
      </div>
    </div>

    <div v-if="editMode === true" class="option-label-right">
      <div v-if="screens[ii].answerKey === 'right'">
        <EditModeLabelCorrectAnswer
          :label-text="screens[ii].sentenceRight"
          font-size="2.5"
        />
      </div>
      <div v-else>
        <EditModeLabelWrongAnswer
          :label-text="screens[ii].sentenceRight"
          font-size="2.5"
        />
      </div>
    </div>

    <div v-if="editMode === true" class="score-indicator">
      <div v-if="screens[ii].userAnswer === null">
        <EditModeLabelBinaryScore result="unanswered" font-size="2.5" />
      </div>
      <div v-else-if="screens[ii].userAnswer === screens[ii].answerKey">
        <EditModeLabelBinaryScore result="correct" font-size="2.5" />
      </div>
      <div v-else>
        <EditModeLabelBinaryScore result="wrong" font-size="2.5" />
      </div>
    </div>

    <div
      v-if="editMode === true && screens[ii].isPractice === true"
      class="ispractise-indicator"
    >
      <EditModeLabelIsPractice label-text="ØVELSESSKJERM" font-size="4" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import ButtonAudioPlay from "@/components/ButtonAudioPlay.vue";
import ButtonGotoNext from "@/components/ButtonGotoNext.vue";
import Narrator1Static from "@/components/Narrator1Static.vue";
import Narrator1Animated from "@/components/Narrator1Animated.vue";
import EditModeLabelCorrectAnswer from "@/components/EditModeLabelCorrectAnswer.vue";
import EditModeLabelWrongAnswer from "@/components/EditModeLabelWrongAnswer.vue";
import EditModeLabelBinaryScore from "@/components/EditModeLabelBinaryScore.vue";
import EditModeLabelIsPractice from "@/components/EditModeLabelIsPractice.vue";

const { mapMutations, mapState } = createNamespacedHelpers("morfologi"); //Set module namespace here

export default Vue.extend({
  name: "EpiInflectional",
  components: {
    ButtonAudioPlay,
    ButtonGotoNext,
    Narrator1Static,
    Narrator1Animated,
    EditModeLabelCorrectAnswer,
    EditModeLabelWrongAnswer,
    EditModeLabelBinaryScore,
    EditModeLabelIsPractice,
  },
  data() {
    return {
      tStore: this.$store.state.morfologi, //When repurposing test: Set module namespace here
      deactivateAllButtons: false,
      animateRight: false,
      animateLeft: false,
      animateNarrator: false,
    };
  },
  computed: {
    ...mapState([
      "ii",
      "screens",
      "editMode",
      "epiInflectionalCharImgRight",
      "epiInflectionalCharImgLeft",
    ]),
    cssVarsForTest(): Record<string, string> {
      return {
        "--grid-colums2":
          Math.round(this.$store.getters.canvasWidth * (1 / 6)) +
          "px " +
          Math.round(this.$store.getters.canvasWidth * (4 / 6)) +
          "px " +
          Math.round(this.$store.getters.canvasWidth * (1 / 6)) +
          "px ",

        "--grid-rows2":
          Math.round(this.$store.getters.canvasHeight * (5 / 11)) +
          "px " +
          Math.round(this.$store.getters.canvasHeight * (5 / 11)) +
          "px " +
          Math.round(this.$store.getters.canvasHeight * (1 / 11)) +
          "px ",
      };
    },
  },
  props: {},

  methods: {
    /*
     *METHOD START: Map mutations:
     */
    ...mapMutations([""]),

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
     *METHOD START: characterSelected:
     */
    characterSelected: function(userAnswer: object) {
      //Abort if something else is playing/animating, except in editMode
      if (this.deactivateAllButtons && this.editMode === false) {
        return;
      }
      //Abort if instruction audio has not yet played, except in editMode
      if (
        this.screens[this.ii].nPlaybackTimes === 0 &&
        this.editMode === false
      ) {
        return;
      }
      //Temporarily deactivate buttons during playback
      this.deactivateAllButtons = true;

      //Save answer to store ("left" or "right")
      this.screens[this.ii].userAnswer = userAnswer;

      if (this.screens[this.ii].isPractice === false) {
        this.deactivateAllButtons = false;
      } else {
        //Practice screen: Audio feedback - correct answer:
        if (this.screens[this.ii].answerKey === userAnswer) {
          const audio = new Audio(this.screens[this.ii].feedbackCorrect);
          audio.addEventListener("ended", () => {
            this.animateNarrator = false;
            this.deactivateAllButtons = false;
          });
          audio.addEventListener("play", () => {
            this.animateNarrator = true;
          });
          audio.play();
        }
        //Practice screen: Audio feedback - wrong answer:
        else {
          const audio = new Audio(this.screens[this.ii].feedbackWrong);
          audio.addEventListener("ended", () => {
            this.animateNarrator = false;
            this.deactivateAllButtons = false;
          });
          audio.addEventListener("play", () => {
            this.animateNarrator = true;
          });
          audio.play();
        }
      }
    },

    /*
     *METHOD START: playAudio
     */
    playAudio: function() {
      //Max 2 replays, except during edit mode.
      if (this.editMode === false) {
        if (this.screens[this.ii].nPlaybackTimes >= 3) {
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
      Regardless, always play left/right characters audio in succession.
      Characters are animated during playback.
      */
      const instructionAudio = new Audio(
        this.screens[this.ii].instructionAudio
      );
      //Setup animation start/stop during playback
      instructionAudio.addEventListener("ended", () => {
        this.animateNarrator = false;
      });
      instructionAudio.addEventListener("play", () => {
        this.animateNarrator = true;
      });

      /*
      Characters audio and animation. 
      Animate character during playback.
      Narrator first (if isNarratorInstruction === true).
      Then left.
      Then right.
      */
      const audioLeft = new Audio(this.screens[this.ii].audioLeft);
      const audioRight = new Audio(this.screens[this.ii].audioRight);
      //Setup animation start/stop during playback
      audioLeft.addEventListener("ended", () => {
        this.animateLeft = false;
      });
      audioRight.addEventListener("ended", () => {
        this.animateRight = false;
        this.deactivateAllButtons = false;
      });
      audioLeft.addEventListener("play", () => {
        this.animateLeft = true;
      });
      audioRight.addEventListener("play", () => {
        this.animateRight = true;
      });
      //Setup playback order
      audioLeft.addEventListener("ended", () => {
        audioRight.play(); //Start right character sound/animation after left ended
      });
      instructionAudio.addEventListener("ended", () => {
        audioLeft.play(); //Start left character sound/animation after narrator ended
      });
      //Excecute playback
      if (
        this.screens[this.ii].isNarratorInstruction === true &&
        this.screens[this.ii].nPlaybackTimes === 0 //Only play the narrator 1 time.
      ) {
        instructionAudio.play();
      } else {
        audioLeft.play();
      }
      this.screens[this.ii].nPlaybackTimes++;
    },
  },
});
</script>

<style scoped>
.grid-container-test {
  display: grid;
  grid-template-columns: var(--grid-colums2);
  grid-template-rows: var(--grid-rows2);
  margin: 0;
  padding: 0;
}

.right-area {
  grid-row: 2/2;
  grid-column: 3/4;
  margin: 1%;
  align-self: end;
  position: relative;
  bottom: 10%;
}

.left-area {
  grid-row: 2/2;
  grid-column: 1/2;
  margin: 1%;
  align-self: end;
  position: relative;
  bottom: 10%;
}

.char-img > * {
  cursor: pointer;
  width: 100%;
}

.character-area.selectedCharacter {
  border: calc(var(--vw) * 0.7) dotted blue;
  border-radius: calc(var(--vw) * 1.4);
  padding: calc(var(--vw) * 0.1);
}

.middle-area {
  grid-row: 1/3;
  grid-column: 2/3;
  margin-top: 15%;
  margin-bottom: 5%;
  margin-right: 5%;
  margin-left: 5%;
  border-radius: calc(var(--vw) * 2);
  border: calc(var(--vw) * 0.3) solid black;
}

.middle-area > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.narrator {
  grid-row: 1/1;
  grid-column: 3/4;
  width: 100%;
  height: 100%;
}

.narrator > div > img {
  width: 100%;
  transform: scale(1.1);
  transform-origin: right top;
}

.ispractise-indicator {
  grid-row: 1/1;
  grid-column: 1/-1;
  margin: 2%;
  align-self: start;
  justify-self: center;
}

.score-indicator {
  grid-row: 1/1;
  grid-column: 3/4;
  margin: 2%;
  align-self: start;
}

.option-label-left {
  align-self: end;
  grid-row: 1/1;
  grid-column: 1/2;
  margin: 2%;
}

.option-label-right {
  align-self: end;
  grid-row: 1/1;
  grid-column: 3/4;
  margin: 2%;
}

.button {
  grid-row: 3;
  grid-column: 2/3;
  margin: calc(var(--vw) * 0.3);
}

.button.audio-button {
  justify-self: center;
  align-self: end;
}

.button.goto-next-button {
  justify-self: end;
  align-self: end;
}

.run_animation {
  animation: character-animation 0.15s infinite alternate;
}

@keyframes character-animation {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(var(--vw) * -2.2));
  }
}
</style>
