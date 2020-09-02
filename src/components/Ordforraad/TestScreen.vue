<template>
  <div class="question-area">
    <h1 class="vis-øverst">ORDFORRAAD!!!</h1>
    <div class="left-area" :class="{run_animation: animateLeft===true}">
      <div class="character-area" :class="{ selectedCharacter: screens[ii].userAnswer==='left' }">
        <div class="char-img left" @click="characterSelected('left')">
          <img :src="imgLeft" />
        </div>
      </div>
    </div>

    <div class="middle-area">
      <div class="middle-img">
        <img :src="screens[ii].img" />
      </div>
    </div>

    <div class="right-area" :class="{run_animation: animateRight===true}">
      <div class="character-area" :class="{ selectedCharacter: screens[ii].userAnswer==='right' }">
        <div class="char-img right" @click="characterSelected('right')">
          <img :src="imgRight" />
        </div>
      </div>
    </div>

    <div class="answer-key left" v-if="editMode===true">
      <div v-if="screens[ii].answerKey==='left'" style="color:#00FF00">RIKTIG SVAR:</div>
      <div v-else style="color:#FF0000">FEIL SVAR:</div>
      <div>{{screens[ii].sentenceLeft}}</div>
    </div>

    <div class="answer-key right" v-if="editMode===true">
      <div v-if="screens[ii].answerKey==='right'" style="color:#00FF00">RIKTIG SVAR:</div>
      <div v-else style="color:#FF0000">FEIL SVAR:</div>
      <div>{{screens[ii].sentenceRight}}</div>
    </div>

    <div class="score-indicator" v-if="editMode===true">
      <div class="unanswered" v-if="screens[ii].userAnswer===null">UBESVART!</div>
      <div class="correct" v-else-if="screens[ii].answerKey===screens[ii].userAnswer">RIKTIG!</div>
      <div class="wrong" v-else>FEIL!</div>
    </div>

    <div class="narrator-container" v-if="editMode===false && screens[ii].isPractice===true">
      <div class="narrator-img still" v-if="animateNarrator===false">
        <img :src="narratorImageStill" />
      </div>
      <div class="narrator-img animated" v-if="animateNarrator===true">
        <img :src="narratorImageAnimated" />
      </div>
    </div>

    <div class="button audio-button" @click="playAudio()"></div>

    <div
      v-if="screens[ii].userAnswer!==null"
      class="button goto-next-button"
      @click="gotoNextButton"
    ></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";

const { mapGetters } = createNamespacedHelpers("ordforraad");

export default Vue.extend({
  name: "TestScreen",
  computed: mapGetters(["ii", "screens", "editMode"]),
  props: {},
  data() {
    return {
      deactivateAllButtons: false,
      animateRight: false,
      animateLeft: false,
      animateNarrator: false,
      imgRight: require("@/assets/morfologi/epi_inflectional/rev.png"),
      imgLeft: require("@/assets/morfologi/epi_inflectional/elg.png"),
      narratorImageStill: require("@/assets/narratorImageStill.png"),
      narratorImageAnimated: require("@/assets/narratorImageAnimated.gif"),
    };
  },

  methods: {
    gotoNextButton: function () {
      if (this.deactivateAllButtons) {
        return;
      }
      this.$store.commit("incrementII");
    },

    characterSelected: function (userAnswer: object) {
      //Abort if something else is playing/animating
      if (this.deactivateAllButtons) {
        return;
      }
      //Abort if instruction audio has not yet played
      if (this.screens[this.ii].nPlaybackTimes === 0) {
        return;
      }
      //Temporarily deactivate buttons during playback
      this.deactivateAllButtons = true;

      //Save answer to store ("left" or "right")
      this.$store.commit("recordAnswer", { userAnswer: userAnswer });
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
    playAudio: function () {
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
      narrator audio w/animation.
      Regardless, always play left/right characters audio.
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
.char-img > * {
  height: 100%;
  width: 100%;
  cursor: pointer;
}

.question-area {
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-auto-rows: 5fr 5fr 1fr;
  column-gap: 5rem;
  margin: 0rem;
  padding: 0;
}

.vis-øverst {
  grid-row: 1/2;
  grid-column: 2/3;
  border: 0.1rem solid purple;
}

.left-area {
  grid-row: 2/2;
  grid-column: 1/2;
  margin: 5%;
}

.right-area {
  grid-row: 2/2;
  grid-column: 3/4;
  margin: 5%;
}

.middle-area {
  grid-row: 1/3;
  grid-column: 2/3;
  margin: 5%;
  border-radius: 0.3rem;
  border: 0.25rem solid black;
}

.middle-img > img {
  height: 100%;
  width: 100%;
}

.narrator-img > * {
  height: 100%;
  width: 100%;
}

.narrator-container {
  margin: 1%;
  align-self: start;
  grid-row: 1/1;
  grid-column: 3/4;
}

.character-area.selectedCharacter {
  border: 0.35rem dotted lightgreen;
}

.score-indicator {
  grid-row: 1/1;
  grid-column: 3/4;
  margin: 5%;
  font-size: 1.5rem;
  border: 1px solid black;
  align-self: start;
}

.score-indicator > .unanswered {
  background-color: rgb(218, 218, 218);
}
.score-indicator > .wrong {
  background-color: rgb(233, 29, 63);
}
.score-indicator > .correct {
  background-color: lawngreen;
}

.answer-key {
  font-size: 1.5rem;
  border: 0.1rem solid black;
  align-self: end;
}

.answer-key.left {
  grid-row: 1/1;
  grid-column: 1/2;
  margin: 5%;
}

.answer-key.right {
  grid-row: 1/1;
  grid-column: 3/4;
  margin: 5%;
}

.button {
  height: 2.5rem;
  width: 2.5rem;
  cursor: pointer;
  padding: 0.6rem 0.6rem;
  grid-row: 3;
  grid-column: 2/3;
}

.button.audio-button {
  background: url("~@/assets/speaker.png") no-repeat center;
  background-size: cover;
  justify-self: center;
  border-radius: 1rem;
  border: 0.1rem solid black;
}

.button.goto-next-button {
  background: url("~@/assets/arrow-right.png") no-repeat center;
  background-size: cover;
  justify-self: end;
}

.run_animation {
  animation: character-animation 0.1s infinite alternate;
}

@keyframes character-animation {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-0.8rem);
  }
}
</style>
