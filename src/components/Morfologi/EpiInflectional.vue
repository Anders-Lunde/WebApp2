<template>
  <div class="grid-container-test" :style="cssVarsForTest">
    <!-- Narrator video/img container: -->
    <div
      class="narrator-container"
      v-show="editMode === false && screens[ii].isPractice === true"
    >
      <img v-show="showNarratorStillImg" :src="tStore.narratorStillImg" />
      <!-- Conditionally rendered videos. 
      Src loaded in script when ii changes (watcher) for smooth playback: -->
      <video
        v-show="showInstructionVideo"
        ref="instructionVideo"
        preload="auto"
        :poster="tStore.narratorStillImg"
      >
        <source :src="screens[ii].instructionVideo" />
      </video>

      <video
        v-show="showFeedbackVideoCorrect"
        ref="feedbackVideoCorrect"
        preload="auto"
        :poster="tStore.narratorStillImg"
      >
        <source :src="screens[ii].feedbackVideoCorrect" />
      </video>

      <video
        v-show="showFeedbackVideoWrong"
        ref="feedbackVideoWrong"
        preload="auto"
        :poster="tStore.narratorStillImg"
      >
        <source :src="screens[ii].feedbackVideoWrong" />
      </video>
    </div>
    <!-- End of narrator video/img container: -->

    <div class="left-area" :class="{ run_animation: animateLeft === true }">
      <div
        class="character-area"
        :class="{ selectedCharacter: screens[ii].userAnswer === 'left' }"
      >
        <div class="char-img left" @click="characterSelected('left')">
          <img :src="tStore.epiInflectionalCharImgLeft" />
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
          <img :src="tStore.epiInflectionalCharImgRight" />
        </div>
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
      showNarratorStillImg: true,
      showInstructionVideo: false,
      showFeedbackVideoCorrect: false,
      showFeedbackVideoWrong: false,
    };
  },
  computed: {
    ...mapState(["ii", "screens", "editMode"]),
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
    gotoNextButton: function () {
      if (this.deactivateAllButtons) {
        return;
      }
      this.tStore.ii++;
    },

    /*
     *METHOD START: characterSelected:
     Record answer, and playback feedback if in practice.
     */
    characterSelected: function (userAnswer: object) {
      //Abort if something else is playing/animating, except in editMode
      if (this.deactivateAllButtons && this.editMode === false) {
        return;
      }
      //Abort if characters audio has not yet played, except in editMode
      if (
        this.screens[this.ii].nPlaybackTimes === 0 &&
        this.editMode === false
      ) {
        return;
      }
      //Save answer to store ("left" or "right")
      this.screens[this.ii].userAnswer = userAnswer;

      //Set booleans
      this.deactivateAllButtons = true;
      this.showNarratorStillImg = false;

      const feedbackVideoCorrect = this.$refs
        .feedbackVideoCorrect as HTMLVideoElement;
      const feedbackVideoWrong = this.$refs
        .feedbackVideoWrong as HTMLVideoElement;
      let feedbackVideo: HTMLVideoElement;

      //Scored screens, no feedback:
      if (this.screens[this.ii].isPractice === false) {
        this.deactivateAllButtons = false; //Do this before exiting funciton
        return;
      }
      //Practice screen: Feedback:
      else {
        //Correct answer:
        if (this.screens[this.ii].answerKey === userAnswer) {
          feedbackVideo = feedbackVideoCorrect;
          this.showFeedbackVideoCorrect = true;
        }
        //Wrong answer:
        else {
          feedbackVideo = feedbackVideoWrong;
          this.showFeedbackVideoWrong = true;
        }
      }
      //Setup playback logic, and excecute playing video
      feedbackVideo.addEventListener(
        "ended",
        () => {
          this.showFeedbackVideoWrong = false;
          this.showFeedbackVideoCorrect = false;
          this.showNarratorStillImg = true;
          this.deactivateAllButtons = false;
        },
        { once: true }
      );
      feedbackVideo.play();
    },

    /*
     *METHOD START: playAudio
     */
    playAudio: function () {
      /*
      If "isNarratorInstruction === true" for this screen, playback
      narrator video (max once).
      Regardless, always play left/right characters audio in succession (max 3 times).
      Characters are animated during playback.
      */

      //Max 3 replays, except during edit mode.
      if (this.editMode === false) {
        if (this.screens[this.ii].nPlaybackTimes >= 3) {
          return;
        }
      }
      //Abort if something else is playing/animating
      if (this.deactivateAllButtons) {
        return;
      }
      //Deactivate other buttons during playback.
      this.deactivateAllButtons = true;

      //SET PLAYBACK ORDER LOGIC (Instruction -> left char -> right char):
      const instructionVideo = this.$refs.instructionVideo as HTMLVideoElement;
      const audioLeft = new Audio(this.screens[this.ii].audioLeft);
      const audioRight = new Audio(this.screens[this.ii].audioRight);

      //Instruction video - possible entry point 1
      instructionVideo.addEventListener(
        "play",
        () => {
          this.showNarratorStillImg = false;
          this.showInstructionVideo = true;
        },
        { once: true }
      );
      instructionVideo.addEventListener(
        "ended",
        () => {
          this.showInstructionVideo = false;
          this.showNarratorStillImg = true;
          audioLeft.play();
        },
        { once: true }
      );

      //Audio+animation left - possible entry point 2
      audioLeft.addEventListener(
        "play",
        () => {
          this.animateLeft = true;
        },
        { once: true }
      );
      audioLeft.addEventListener(
        "ended",
        () => {
          this.animateLeft = false;
          audioRight.play();
        },
        { once: true }
      );

      //Audio+animation
      audioRight.addEventListener(
        "play",
        () => {
          this.animateRight = true;
        },
        { once: true }
      );
      audioRight.addEventListener(
        "ended",
        () => {
          this.animateRight = false;
          this.deactivateAllButtons = false; //Cleanup
        },
        { once: true }
      );

      //EXCECUTE PLAYBACK
      //Narrator playback only on intro-screen:
      if (
        this.screens[this.ii].isNarratorInstruction &&
        this.screens[this.ii].nPlaybackTimes === 0 //Only play the narrator 1 time.
      ) {
        instructionVideo.play();
      }
      //Otherwise: playback+animate characters directly
      else {
        audioLeft.play();
      }
      this.screens[this.ii].nPlaybackTimes++;
    },
  },
  watch: {
    //Important! Neccesary to update source of videos on screen change (ii change).
    //Loading videos also ensures smooth experience on button clicks.
    ii: function () {
      const instructionVideo = this.$refs.instructionVideo as HTMLVideoElement;
      const feedbackVideoCorrect = this.$refs
        .feedbackVideoCorrect as HTMLVideoElement;
      const feedbackVideoWrong = this.$refs
        .feedbackVideoWrong as HTMLVideoElement;
      instructionVideo.load();
      feedbackVideoCorrect.load();
      feedbackVideoWrong.load();
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

.narrator-container {
  grid-row: 1/1;
  grid-column: 3/4;
  width: 100%;
  height: 100%;
}

.narrator-container > * {
  /* videos and image tages inside narrator */
  width: 100%;
  transform: scale(1.2);
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
