<template>
  <div class="question-area">
    <div class="left-area" :class="{run_animation: animateLeft===true}">
      <div class="character-area" :class="{ selectedCharacter: items[ii].userAnswer==='left' }">
        <div class="char-img left" @click="characterSelected('left')">
          <img :src="imgLeft" />
        </div>
      </div>
    </div>

    <div class="middle-area">
      <div class="middle-img">
        <img :src="items[ii].img" />
      </div>
    </div>

    <div class="right-area" :class="{run_animation: animateRight===true}">
      <div class="character-area" :class="{ selectedCharacter: items[ii].userAnswer==='right' }">
        <div class="char-img right" @click="characterSelected('right')">
          <img :src="imgRight" />
        </div>
      </div>
    </div>

    <div class="option-label-left" v-if="editMode===true">
      <div v-if="items[ii].answerKey==='left'">
        <EditModeOptionLabelCorrect :label-text="items[ii].sentenceLeft" />
      </div>
      <div v-else>
        <EditModeOptionLabelWrong :label-text="items[ii].sentenceLeft" />
      </div>
    </div>

    <div class="option-label-right" v-if="editMode===true">
      <div v-if="items[ii].answerKey==='right'">
        <EditModeOptionLabelCorrect :label-text="items[ii].sentenceRight" />
      </div>
      <div v-else>
        <EditModeOptionLabelWrong :label-text="items[ii].sentenceRight" />
      </div>
    </div>

    <div class="score-indicator" v-if="editMode===true">
      <div class="unanswered" v-if="items[ii].userAnswer===null">UBESVART!</div>
      <div class="correct" v-else-if="items[ii].answerKey===items[ii].userAnswer">RIKTIG!</div>
      <div class="wrong" v-else>FEIL!</div>
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

    <div v-show="items[ii].userAnswer!==null" class="button goto-next-button">
      <div @click="gotoNextButton">
        <ButtonGotoNext />
      </div>
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
import EditModeOptionLabelCorrect from "@/components/EditModeOptionLabelCorrect.vue";
import EditModeOptionLabelWrong from "@/components/EditModeOptionLabelWrong.vue";

const { mapGetters, mapMutations } = createNamespacedHelpers("morfologi"); //Set module namespace here

export default Vue.extend({
  name: "EpiInflectional",
  components: {
    ButtonAudioPlay,
    ButtonGotoNext,
    Narrator1Static,
    Narrator1Animated,
    EditModeOptionLabelCorrect,
    EditModeOptionLabelWrong
  },
  computed: mapGetters(["ii", "items", "editMode"]),
  props: {},
  data() {
    return {
      deactivateAllButtons: false,
      animateRight: false,
      animateLeft: false,
      animateNarrator: false,
      imgRight: require("@/assets/morfologi/epi_inflectional/rev.png"),
      imgLeft: require("@/assets/morfologi/epi_inflectional/elg.png")
    };
  },

  methods: {
    /*
     *METHOD START: Map mutations:
     */
    ...mapMutations(["recordAnswer", "incrementII"]),

    /*
     *METHOD START: gotoNextButton:
     */
    gotoNextButton: function() {
      if (this.deactivateAllButtons) {
        return;
      }
      this.incrementII();
    },

    /*
     *METHOD START: characterSelected:
     */
    characterSelected: function(userAnswer: object) {
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

    /*
     *METHOD START: playAudio
     */
    playAudio: function() {
      //Max 2 replays, except during edit mode.
      if (this.editMode === false) {
        if (this.items[this.ii].nPlaybackTimes >= 3) {
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
      If "isInstruction === true" for this item, start by playing 
      narrator audio w/animation.
      Regardless, always play left/right characters audio min succession.
      Characters are animated during playback.
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
      Characters audio and animation. 
      Animate character during playback.
      Narrator first (if isInstruction === true).
      Then left.
      Then right.
      */
      const audioLeft = new Audio(this.items[this.ii].audioLeft);
      const audioRight = new Audio(this.items[this.ii].audioRight);
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
        this.items[this.ii].isInstruction === true &&
        this.items[this.ii].nPlaybackTimes === 0 //Only play the narrator 1 time.
      ) {
        instructionAudio.play();
      } else {
        audioLeft.play();
      }
      this.items[this.ii].nPlaybackTimes++;
    }
  }
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

.narrator {
  margin: 1%;
  align-self: start;
  grid-row: 1/1;
  grid-column: 3/4;
}

.character-area.selectedCharacter {
  border: 0.35rem dotted blue;
  border-radius: 1.5rem;
  padding: 0.15rem;
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

.option-label-left {
  align-self: end;
  grid-row: 1/1;
  grid-column: 1/2;
  margin: 5%;
}

.option-label-right {
  align-self: end;
  grid-row: 1/1;
  grid-column: 3/4;
  margin: 5%;
}

.button {
  grid-row: 3;
  grid-column: 2/3;
}

.button.audio-button {
  justify-self: center;
}

.button.goto-next-button {
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
