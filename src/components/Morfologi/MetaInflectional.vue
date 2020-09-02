<template>
  <div class="grid-container-test" :style="cssVarsForTest">
    <!-- Test stuff: -->

    <div class="narrator" :class="narratorPosition" v-if="editMode===false">
      <div v-show="animateNarrator===false">
        <Narrator1Static />
      </div>
      <div v-show="animateNarrator===true">
        <Narrator1Animated />
      </div>
    </div>

    <div class="left-img">
      <img :src="screens[ii].imgLeft" />
    </div>
    <div class="right-img">
      <img :src="screens[ii].imgRight" />
    </div>

    <div
      v-show="showRightAudioButton === false"
      class="button audio-button left"
      @click="playAudioLeft()"
    >
      <ButtonAudioPlay />
    </div>

    <div
      v-show="showRightAudioButton === true"
      class="button audio-button right"
      @click="playAudioRight()"
    >
      <ButtonAudioPlay />
    </div>

    <!-- Button that hides feedback buttons: -->
    <div
      v-show="showFeedbackButtons === false && screens[ii].isPractice===true"
      class="button-show-feedback"
      @click="buttonShowFeedback()"
    />

    <!-- Feedback button wrong: -->
    <div
      v-show="(showFeedbackButtons === true && screens[ii].isPractice===true) || editMode===true"
      class="feedback-button wrong"
      @click="feedbackAudio('wrong')"
    >
      <ButtonFeedbackWrongGentle />
    </div>
    <!-- Feedback button correct: -->
    <div
      v-show="(showFeedbackButtons === true && screens[ii].isPractice===true) || editMode===true"
      class="feedback-button correct"
      @click="feedbackAudio('correct')"
    >
      <ButtonFeedbackCorrectGentle />
    </div>

    <!-- Button that hides Goto next button in non-practice screens: -->
    <div
      v-show="showGotoNext === false && screens[ii].isPractice===false"
      class="button-show-goto-next"
      @click="buttonShowGotoNext()"
    />

    <div v-show="showGotoNext===true" class="goto-next-button">
      <div @click="gotoNextButton">
        <ButtonGotoNext />
      </div>
    </div>

    <!-- Edit mode stuff: -->
    <div v-if="editMode===true" class="answer-key">
      <EditModeScreenOptionLabelCorrect :label-text="screens[ii].answerKey" font-size="2.5" />
    </div>

    <div v-if="editMode===true && screens[ii].isPractice===true" class="ispractise-indicator">
      <EditModeScreenIsPracticeIndicator label-text="ØVELSES-SKJERM" font-size="5" />
    </div>

    <div v-if="editMode===true" class="score-indicator">
      <div v-if="screens[ii].userAnswer===null">
        <EditModeScreenResultIndicator result="unanswered" font-size="2.5" />
      </div>
      <div v-else-if="screens[ii].userAnswer==='correct'">
        <EditModeScreenResultIndicator result="correct" font-size="2.5" />
      </div>
      <div v-else>
        <EditModeScreenResultIndicator result="wrong" font-size="2.5" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";
import ButtonFeedbackCorrectGentle from "@/components/ButtonFeedbackCorrectGentle.vue";
import ButtonFeedbackWrongGentle from "@/components/ButtonFeedbackWrongGentle.vue";
import ButtonAudioPlay from "@/components/ButtonAudioPlay.vue";
import ButtonGotoNext from "@/components/ButtonGotoNext.vue";
import Narrator1Static from "@/components/Narrator1Static.vue";
import Narrator1Animated from "@/components/Narrator1Animated.vue";
import EditModeScreenOptionLabelCorrect from "@/components/EditModeScreenOptionLabelCorrect.vue";
import EditModeScreenResultIndicator from "@/components/EditModeScreenResultIndicator.vue";
import EditModeScreenIsPracticeIndicator from "@/components/EditModeScreenIsPracticeIndicator.vue";

const { mapMutations, mapState } = createNamespacedHelpers("morfologi"); //Set module namespace here

export default Vue.extend({
  name: "MetaInflectional",
  components: {
    ButtonFeedbackCorrectGentle,
    ButtonFeedbackWrongGentle,
    ButtonAudioPlay,
    ButtonGotoNext,
    Narrator1Static,
    Narrator1Animated,
    EditModeScreenIsPracticeIndicator,
    EditModeScreenOptionLabelCorrect,
    EditModeScreenResultIndicator,
  },
  data() {
    return {
      currentTestState: this.$store.state.morfologi, //When repurposing test: Set module namespace here
      deactivateAllButtons: false,
      animateRight: false,
      animateLeft: false,
      animateNarrator: false,
      showGotoNext: false,
      showFeedbackButtons: false,
      narratorPosition: "narratorPosMiddle",
      leftWasPlayed: false,
      showRightAudioButton: false,
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
      return {};
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
    gotoNextButton: function () {
      if (this.deactivateAllButtons) {
        return;
      }
      this.currentTestState.ii++; //Not sure why this.ii++ from mapState doesnt work
      this.narratorPosition = "narratorPosMiddle";
      this.leftWasPlayed = false;
      this.showRightAudioButton = false;
      this.showGotoNext = false;
      this.showFeedbackButtons = false;
    },
    /*
     *METHOD START: buttonShowFeedback:
     */
    buttonShowFeedback: function () {
      if (
        this.deactivateAllButtons === true ||
        this.screens[this.ii].nPlaybackTimes < 1
      ) {
        return;
      }
      this.showFeedbackButtons = true;
    },
    /*
     *METHOD START: buttonShowGotoNext:
     */
    buttonShowGotoNext: function () {
      if (
        this.deactivateAllButtons === true ||
        this.screens[this.ii].nPlaybackTimes < 1
      ) {
        return;
      }
      this.showGotoNext = true;
    },

    /*
     *METHOD START: feedbackAudio:
     */
    feedbackAudio: function (input: string) {
      if (this.deactivateAllButtons) {
        return;
      }
      this.deactivateAllButtons = true;
      if (input === "wrong") {
        this.screens[this.ii].userAnswer = "wrong";
        //Return if in editMode. Dont play audio (there is none)
        if (this.editMode === true) {
          this.deactivateAllButtons = false;
          return;
        }

        const audio = new Audio(this.screens[this.ii].feedbackWrong);
        //Setup animation start/stop during playback
        audio.addEventListener("ended", () => {
          this.animateNarrator = false;
          this.showGotoNext = true;
          this.deactivateAllButtons = false;
        });
        audio.addEventListener("play", () => {
          this.animateNarrator = true;
        });
        audio.play();
      }
      if (input === "correct") {
        this.screens[this.ii].userAnswer = "correct";
        //Return if in editMode. Dont play audio (there is none)
        if (this.editMode === true) {
          this.deactivateAllButtons = false;
          return;
        }
        const audio = new Audio(this.screens[this.ii].feedbackCorrect);
        audio.play();
        //Setup animation start/stop during playback
        audio.addEventListener("ended", () => {
          this.animateNarrator = false;
          this.showGotoNext = true;
          this.deactivateAllButtons = false;
        });
        audio.addEventListener("play", () => {
          this.animateNarrator = true;
        });
      }
    },

    /*
     *METHOD START: playAudioLeft
     */
    playAudioLeft: function () {
      //Abort if something else is playing/animating
      if (this.deactivateAllButtons) {
        return;
      }

      //Max 1 playback, except during edit mode.
      if (this.editMode === false) {
        if (this.leftWasPlayed === true) {
          return;
        } else {
          this.leftWasPlayed = true;
        }
      }

      /*
      If "isNarratorInstruction === true" for this screen, start by playing 
      narrator audio w/animation.
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
      Move narrator to left during playback, and animate
      */
      const audioLeft = new Audio(this.screens[this.ii].audioLeft);
      //Setup animation start/stop during playback
      audioLeft.addEventListener("ended", () => {
        this.animateNarrator = false;
        this.showRightAudioButton = true;
      });
      audioLeft.addEventListener("play", () => {
        this.animateNarrator = true;
        this.narratorPosition = "narratorPosLeft";
      });
      //Setup playback order
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
    },

    /*
     *METHOD START: playAudioRight
     */
    playAudioRight: function () {
      //Max 2 replays, except during edit mode.
      if (this.editMode === false) {
        if (this.screens[this.ii].nPlaybackTimes >= 2) {
          return;
        }
      }
      //Abort if something else is playing/animating
      if (this.deactivateAllButtons) {
        return;
      }
      //Temporarily deactivate buttons during playback
      this.deactivateAllButtons = true;

      //First time, play only right audio.
      //If the child wants to replay again, we playback left + right audio
      //The logic for this is controlled in the "Excecute playback" below
      const audioRight = new Audio(this.screens[this.ii].audioRight);
      const audioLeft = new Audio(this.screens[this.ii].audioLeft);

      //Setup animation start/stop during playback
      audioLeft.addEventListener("ended", () => {
        this.animateNarrator = false;
        audioRight.play();
      });
      audioLeft.addEventListener("play", () => {
        this.animateNarrator = true;
        this.narratorPosition = "narratorPosLeft";
      });
      audioRight.addEventListener("ended", () => {
        this.animateNarrator = false;
        this.deactivateAllButtons = false;
      });
      audioRight.addEventListener("play", () => {
        this.animateNarrator = true;
        this.narratorPosition = "narratorPosRight";
      });

      //Excecute playback
      if (this.screens[this.ii].nPlaybackTimes === 0) {
        //First time, play only right audio.
        audioRight.play();
      } else {
        //Else, play both
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

  grid-template-columns:
    calc(var(--vw) * 25)
    calc(var(--vw) * 25)
    calc(var(--vw) * 25)
    calc(var(--vw) * 25);

  grid-template-rows: calc(var(--vh) * 20) calc(var(--vh) * 60) calc(
      var(--vh) * 20
    );

  margin: 0;
  padding: 0;
}

.answer-key {
  grid-row: 1/2;
  grid-column: 1/2;
}

.narratorPosLeft {
  animation: moveNarratorLeft 0.75s;
  animation-fill-mode: forwards;
}
.narratorPosRight {
  animation: moveNarratorRight 1.2s;
  animation-fill-mode: forwards;
}

@keyframes moveNarratorLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(var(--vw) * -25));
  }
}

@keyframes moveNarratorRight {
  0% {
    transform: translateX(calc(var(--vw) * -25));
  }
  100% {
    transform: translateX(calc(var(--vw) * 25));
  }
}

.narrator {
  grid-row: 1;
  grid-column: 1/-1;
  height: 100%;
  justify-self: center;
}

.narrator > div {
  height: 100%;
}

.narrator > div > img {
  height: 100%;
}

.left-img {
  grid-row: 2;
  grid-column: 1/3;
  margin: 2%;
}
.left-img > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  border: calc(var(--vw) * 0.3) solid black;
}

.right-img {
  grid-row: 2;
  grid-column: 3/5;
  margin: 2%;
}
.right-img > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
  border: calc(var(--vw) * 0.3) solid black;
}

.audio-button {
  justify-self: center;
  align-self: start;
  grid-row: 3;
  margin: calc(var(--vw) * 0.3);
}

.audio-button.left {
  grid-column: 1/3;
}

.audio-button.right {
  grid-column: 3/5;
}
.button-show-goto-next {
  grid-row: 3;
  grid-column: 4/5;
  background: white;
  border: calc(var(--vw) * 0.3) solid white;
  border-radius: calc(var(--vw) * 2);
  width: calc(var(--vw) * 10);
  height: calc(var(--vw) * 10);
  cursor: pointer;
  justify-self: end;
  align-self: end;
}

.goto-next-button {
  grid-row: 3;
  grid-column: 4/5;
  justify-self: end;
  align-self: end;
  margin: calc(var(--vw) * 0.3);
}

.button-show-feedback {
  grid-row: 3;
  grid-column: 1/2;
  background: white;
  border: calc(var(--vw) * 0.3) solid white;
  border-radius: calc(var(--vw) * 2);
  width: calc(var(--vw) * 10);
  height: calc(var(--vw) * 10);
  cursor: pointer;
  justify-self: start;
  align-self: end;
}

.feedback-button {
  grid-row: 3;
  align-self: end;
  margin: calc(var(--vw) * 1.3);
  margin-bottom: calc(var(--vw) * 3);
  opacity: 0.3;
  width: calc(var(--vw) * 6);
  height: calc(var(--vw) * 6);
}

.feedback-button > div {
  width: 100%;
  height: 100%;
}

.feedback-button.correct {
  grid-column: 1/2;
  transform: translate(calc(var(--vw) * 11));
}

.feedback-button.wrong {
  grid-column: 1/2;
}

.ispractise-indicator {
  grid-row: 1/1;
  grid-column: 2/4;
  margin: 2%;
  align-self: start;
  justify-self: center;
}

.answer-key {
  grid-row: 1/1;
  grid-column: 1/2;
  margin: 2%;
  align-self: start;
  justify-self: start;
}

.score-indicator {
  grid-row: 1;
  grid-column: 4/5;
  margin: 2%;
  align-self: start;
}
</style>
