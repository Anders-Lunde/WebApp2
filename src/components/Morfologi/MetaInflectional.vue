<template>
  <div class="grid-container-test" :style="cssVarsForTest">
    <!-- Test stuff: -->

    <div
      class="narrator"
      :class="narratorPosition"
      v-if="editMode===false && items[ii].isPractice===true"
    >
      <div v-show="animateNarrator===false">
        <Narrator1Static />
      </div>
      <div v-show="animateNarrator===true">
        <Narrator1Animated />
      </div>
    </div>

    <div class="left-img">
      <img :src="items[ii].imgLeft" />
    </div>
    <div class="right-img">
      <img :src="items[ii].imgRight" />
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

    <div
      v-show="showFeedbackButtons === true && items[ii].isPractice===true"
      class="feedback-button wrong"
    >
      <div @click="feedbackAudio('wrong')">
        <ButtonFeedbackWrongGentle />
      </div>
    </div>

    <div
      v-show="showFeedbackButtons === true && items[ii].isPractice===true"
      class="feedback-button correct"
    >
      <div @click="feedbackAudio('correct')">
        <ButtonFeedbackCorrectGentle />
      </div>
    </div>

    <div v-show="showGotoNext===true" class="goto-next-button">
      <div @click="gotoNextButton">
        <ButtonGotoNext />
      </div>
    </div>

    <!-- Edit mode stuff: -->
    <div class="answer-key">
      <div v-if="editMode===true">
        Rikitig svar =
        <strong>{{items[ii].answerKey}}</strong>
      </div>
    </div>

    <!-- 
    <div class="left-area" :class="{run_animation: animateLeft===true}">
      <div class="character-area" :class="{ selectedCharacter: items[ii].userAnswer==='left' }">
        <div class="char-img left" @click="characterSelected('left')">
          <img :src="epiInflectionalCharImgLeft" />
        </div>
      </div>
    </div>

    <div class="middle-area">
      <img :src="items[ii].img" />
    </div>

    <div class="right-area" :class="{run_animation: animateRight===true}">
      <div class="character-area" :class="{ selectedCharacter: items[ii].userAnswer==='right' }">
        <div class="char-img right" @click="characterSelected('right')">
          <img :src="epiInflectionalCharImgRight" />
        </div>
      </div>
    </div>

    <div class="narrator" v-if="editMode===false && items[ii].isPractice===true">
      <div v-show="animateNarrator===false">
        <Narrator1Static />
      </div>
      <div v-show="animateNarrator===true">
        <Narrator1Animated />
      </div>
    </div>

    <div class="button audio-button" @click="playAudio()">
      <ButtonAudioPlay />
    </div>

    <div
      v-show="items[ii].userAnswer!==null && deactivateAllButtons===false"
      class="button goto-next-button"
    >
      <div @click="gotoNextButton">
        <ButtonGotoNext />
      </div>
    </div>
    -->

    <!-- Edit mode stuff: -->
    <!--
    <div v-if="editMode===true" class="option-label-left">
      <div v-if="items[ii].answerKey==='left'">
        <EditModeItemOptionLabelCorrect :label-text="items[ii].sentenceLeft" font-size="2.5" />
      </div>
      <div v-else>
        <EditModeItemOptionLabelWrong :label-text="items[ii].sentenceLeft" font-size="2.5" />
      </div>
    </div>

    <div v-if="editMode===true" class="option-label-right">
      <div v-if="items[ii].answerKey==='right'">
        <EditModeItemOptionLabelCorrect :label-text="items[ii].sentenceRight" font-size="2.5" />
      </div>
      <div v-else>
        <EditModeItemOptionLabelWrong :label-text="items[ii].sentenceRight" font-size="2.5" />
      </div>
    </div>

    <div v-if="editMode===true" class="score-indicator">
      <div v-if="items[ii].userAnswer===null">
        <EditModeItemResultIndicator result="unanswered" font-size="2.5" />
      </div>
      <div v-else-if="items[ii].userAnswer===items[ii].answerKey">
        <EditModeItemResultIndicator result="correct" font-size="2.5" />
      </div>
      <div v-else>
        <EditModeItemResultIndicator result="wrong" font-size="2.5" />
      </div>
    </div>
    -->
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
import EditModeItemOptionLabelCorrect from "@/components/EditModeItemOptionLabelCorrect.vue";
import EditModeItemOptionLabelWrong from "@/components/EditModeItemOptionLabelWrong.vue";
import EditModeItemResultIndicator from "@/components/EditModeItemResultIndicator.vue";

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
    //EditModeItemOptionLabelCorrect,
    //EditModeItemOptionLabelWrong,
    //EditModeItemResultIndicator,
  },
  data() {
    return {
      deactivateAllButtons: false,
      animateRight: false,
      animateLeft: false,
      animateNarrator: false,
      showGotoNext: true,
      showFeedbackButtons: true,
      narratorPosition: "narratorPosMiddle",
      leftWasPlayed: false,
      showRightAudioButton: false,
    };
  },
  computed: {
    ...mapState([
      "ii",
      "items",
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
    ...mapMutations(["recordAnswer", "incrementII"]),

    /*
     *METHOD START: gotoNextButton:
     */
    gotoNextButton: function () {
      if (this.deactivateAllButtons) {
        return;
      }
      this.incrementII();
      this.narratorPosition = "narratorPosMiddle";
      this.leftWasPlayed = false;
      this.showRightAudioButton = false;
    },
    /*
     *METHOD START: feedbackCorrect:
     */
    feedbackAudio: function (input: string) {
      if (input === "wrong") {
        const audio = new Audio(this.items[this.ii].feedbackWrong);
        //Setup animation start/stop during playback
        audio.addEventListener("ended", () => {
          this.animateNarrator = false;
        });
        audio.addEventListener("play", () => {
          this.animateNarrator = true;
        });
        audio.play();
      }
      if (input === "correct") {
        const audio = new Audio(this.items[this.ii].feedbackCorrect);
        audio.play();
        //Setup animation start/stop during playback
        audio.addEventListener("ended", () => {
          this.animateNarrator = false;
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
      If "isInstruction === true" for this item, start by playing 
      narrator audio w/animation.
      */
      const instructionAudio = new Audio(this.items[this.ii].instructionAudio);
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
      const audioLeft = new Audio(this.items[this.ii].audioLeft);
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
        this.items[this.ii].isInstruction === true &&
        this.items[this.ii].nPlaybackTimes === 0 //Only play the narrator 1 time.
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
        if (this.items[this.ii].nPlaybackTimes >= 2) {
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
      const audioRight = new Audio(this.items[this.ii].audioRight);
      const audioLeft = new Audio(this.items[this.ii].audioLeft);

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
      if (this.items[this.ii].nPlaybackTimes === 0) {
        //First time, play only right audio.
        audioRight.play();
      } else {
        //Else, play both
        audioLeft.play();
      }

      this.items[this.ii].nPlaybackTimes++;
    },

    /*
     *METHOD START: characterSelected:
     */
    characterSelected: function (userAnswer: object) {
      //Abort if something else is playing/animating
      if (this.deactivateAllButtons) {
        return;
      }
      //Abort if instruction audio has not yet played
      if (this.items[this.ii].nPlaybackTimes === 0) {
        return;
      }
      //Temporarily deactivate buttons during playback
      this.deactivateAllButtons = true;

      //Save answer to store ("left" or "right")
      this.recordAnswer({ userAnswer: userAnswer });

      if (this.items[this.ii].isPractice === false) {
        this.deactivateAllButtons = false;
      } else {
        //Practice screen: Audio feedback - correct answer:
        if (this.items[this.ii].answerKey === userAnswer) {
          const audio = new Audio(this.items[this.ii].feedbackCorrect);
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
          const audio = new Audio(this.items[this.ii].feedbackWrong);
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

.goto-next-button {
  grid-row: 3;
  grid-column: 4/5;
  justify-self: end;
  align-self: end;
  margin: calc(var(--vw) * 0.3);
}

.feedback-button {
  grid-row: 3;
  align-self: end;
  margin: calc(var(--vw) * 0.3);
}
.feedback-button.correct {
  grid-column: 3/4;
  justify-self: start;
}

.feedback-button.wrong {
  grid-column: 2/3;
  justify-self: end;
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
</style>
