<template>
  <div class="grid-container-test" :style="cssVarsForTest">
    <!-- Test stuff: -->
    <div class="test-name">Dots to digits</div>
    <div class="narrator" v-if="editMode === false">
      <div v-show="animateNarrator === false">
        <Narrator1Static />
      </div>
      <div v-show="animateNarrator === true">
        <Narrator1Animated />
      </div>
    </div>

    <div class="middle-area">
      <img :src="screens[ii].img" />
    </div>
    <div class="button audio-button" @click="playAudio()">
      <ButtonAudioPlay />
    </div>

    <!-- Button that hides feedback buttons: -->
    <div
      v-show="showFeedbackButtons === false && screens[ii].isPractice === true"
      class="button-show-feedback"
      @click="buttonShowFeedback()"
    />

    <!-- Feedback button wrong: -->
    <div
      v-show="
        (showFeedbackButtons === true && screens[ii].isPractice === true) ||
          editMode === true
      "
      class="feedback-button wrong"
      @click="feedbackAudio('wrong')"
    >
      <ButtonFeedbackWrongGentle />
    </div>
    <!-- Feedback button correct: -->
    <div
      v-show="
        (showFeedbackButtons === true && screens[ii].isPractice === true) ||
          editMode === true
      "
      class="feedback-button correct"
      @click="feedbackAudio('correct')"
    >
      <ButtonFeedbackCorrectGentle />
    </div>

    <!-- Button that hides Goto next button in non-practice screens: -->
    <div
      v-show="showGotoNext === false && screens[ii].isPractice === false"
      class="button-show-goto-next"
      @click="buttonShowGotoNext()"
    />

    <div v-show="showGotoNext === true" class="goto-next-button">
      <div @click="gotoNextButton">
        <ButtonGotoNext />
      </div>
    </div>

    <!-- Edit mode stuff: -->
    <div v-if="editMode === true" class="answer-key">
      <EditModeLabelCorrectAnswer
        :label-text="screens[ii].answerKey"
        font-size="2.5"
      />
    </div>

    <div v-if="editMode === true" class="label-sentences-stimulus">
      {{ screens[ii].sentence1 }} {{ screens[ii].sentence2 }}
    </div>

    <div
      v-if="editMode === true && screens[ii].isPractice === true"
      class="ispractise-indicator"
    >
      <EditModeLabelIsPractice label-text="ØVELSESSKJERM" font-size="5" />
    </div>

    <div v-if="editMode === true" class="score-indicator">
      <div v-if="screens[ii].userAnswer === null">
        <EditModeLabelBinaryScore result="unanswered" font-size="2.5" />
      </div>
      <div v-else-if="screens[ii].userAnswer === 'correct'">
        <EditModeLabelBinaryScore result="correct" font-size="2.5" />
      </div>
      <div v-else>
        <EditModeLabelBinaryScore result="wrong" font-size="2.5" />
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
import EditModeLabelCorrectAnswer from "@/components/EditModeLabelCorrectAnswer.vue";
import EditModeLabelBinaryScore from "@/components/EditModeLabelBinaryScore.vue";
import EditModeLabelIsPractice from "@/components/EditModeLabelIsPractice.vue";

const { mapMutations, mapState } = createNamespacedHelpers("tallforstaaelse"); //Set module namespace here

export default Vue.extend({
  name: "DotsToDigits",
  components: {
    ButtonFeedbackCorrectGentle,
    ButtonFeedbackWrongGentle,
    ButtonAudioPlay,
    ButtonGotoNext,
    Narrator1Static,
    Narrator1Animated,
    EditModeLabelIsPractice,
    EditModeLabelCorrectAnswer,
    EditModeLabelBinaryScore,
  },
  data() {
    return {
      tStore: this.$store.state.tallforstaaelse, //When repurposing test: Set module namespace here
      deactivateAllButtons: false,
      animateNarrator: false,
      showGotoNext: true,
      showFeedbackButtons: false,
    };
  },
  computed: {
    ...mapState(["ii", "screens", "editMode"]),
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
    gotoNextButton: function() {
      this.tStore.ii++; //Not sure why this.ii++ from mapState doesnt work
      this.showGotoNext = false;
      this.showFeedbackButtons = false;
    },
    /*
     *METHOD START: buttonShowFeedback:
     */
    buttonShowFeedback: function() {
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
    buttonShowGotoNext: function() {
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
    feedbackAudio: function(input: string) {
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
     *METHOD START: playAudio
     */
    playAudio: function() {
      //Max 1 replays, except during edit mode.
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

      /*
      If "isNarratorInstruction === true" for this screen, start by playing 
      narrator instruction audio w/animation.
      Regardless, always task audio, and animate narrator during this also.
      */
      const instructionAudio = new Audio(
        this.screens[this.ii].instructionAudio
      );
      //Setup animation start/stop during playback
      instructionAudio.addEventListener("ended", () => {
        this.animateNarrator = false;
        this.deactivateAllButtons = false;
      });
      instructionAudio.addEventListener("play", () => {
        this.animateNarrator = true;
      });

      //Excecute playback
      if (
        this.screens[this.ii].isNarratorInstruction === true &&
        this.screens[this.ii].nPlaybackTimes === 0 //Only play the narrator 1 time.
      ) {
        instructionAudio.play();
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

.test-name {
  grid-row: 1;
  grid-column: 1;
  font-size: calc(var(--vw) * 5);
}

.middle-area {
  grid-row: 2;
  grid-column: 1/-1;
  margin-top: 1%;
  margin-bottom: 0%;
  margin-right: 5%;
  margin-left: 5%;
  border-radius: calc(var(--vw) * 2);
  border: calc(var(--vw) * 0.3) solid black;
  font-size: calc(var(--vw) * 11);
}

.middle-area > img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.number-stimulus {
  text-align: center;
  align-self: center;
}

.audio-button {
  justify-self: center;
  align-self: start;
  grid-row: 3;
  grid-column: 1/-1;
  margin: calc(var(--vw) * 0.3);
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

.label-sentences-stimulus {
  color: black;
  border: calc(var(--vw) * 0.15) solid black;
  font-size: calc(var(--vw) * 2.5);
  grid-row: 1;
  grid-column: 1/-1;
  margin: 2%;
  align-self: end;
  justify-self: left;
}
</style>
