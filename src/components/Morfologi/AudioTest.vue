<template>
  <div class="grid-container-test">
    <!-- End of narrator video/img container: -->

    <div class="middle-area">
      <div class="recorded-audio-panel">
        <button @click="startRecord()" id="btn-start-recording">
          Start Recording
        </button>
        <button @click="isPaused = !isPaused" id="btn-stop-recording">
          Stop Recording
        </button>
        <br />
        <button id="btn-play-recording" disabled>Play Recording</button>
        <button id="btn-play-file">Play File</button>
        <button id="btn-play-both" disabled>Play Both</button>
        <br />
        <audio ref="audioPlayer" controls></audio>
        <a ref="audioDownload">Download</a>
        <button ref="audioStop">Stop</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { createNamespacedHelpers } from "vuex";

const { mapMutations, mapState } = createNamespacedHelpers("morfologi"); //Set module namespace here

export default Vue.extend({
  name: "AudioTest",
  components: {},
  data() {
    return {
      isPaused: false,
      tStore: this.$store.state.morfologi, //When repurposing test: Set module namespace here
    };
  },
  computed: {
    ...mapState(["ii", "screens", "editMode"]),
  },
  props: {},

  methods: {
    /*
     *METHOD START: playAudio
     */
    startRecord: function () {
      function flattenArray(channelBuffer, recordingLength) {
        const result = new Float32Array(recordingLength);
        let offset = 0;
        for (let i = 0; i < channelBuffer.length; i++) {
          const buffer = channelBuffer[i];
          result.set(buffer, offset);
          offset += buffer.length;
        }
        return result;
      }

      function interleave(leftChannel, rightChannel) {
        const length = leftChannel.length + rightChannel.length;
        const result = new Float32Array(length);

        let inputIndex = 0;

        for (let index = 0; index < length; ) {
          result[index++] = leftChannel[inputIndex];
          result[index++] = rightChannel[inputIndex];
          inputIndex++;
        }
        return result;
      }

      function writeUTFBytes(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      }
      /*
       *END OF HELPER FUNCITONS
       */
      const player = this.$refs.audioPlayer as HTMLAudioElement;
      const stop = this.$refs.audioStop as HTMLButtonElement;
      const download = this.$refs.audioDownload as HTMLAnchorElement;

      const vm = this; // eslint-disable-line

      const constraints = { audio: true, video: false };

      const handleSuccess = function (stream) {
        const context = new AudioContext();
        const mediaStream = context.createMediaStreamSource(stream);
        const bufferSize = 2048;
        const sampleRate = 48000;
        let blob: Blob;
        const numberOfInputChannels = 2;
        const numberOfOutputChannels = 2;
        const recorder = context.createScriptProcessor(
          bufferSize,
          numberOfInputChannels,
          numberOfOutputChannels
        );

        const leftchannel: Float32Array[] = [];
        const rightchannel: Float32Array[] = [];
        let recordingLength = 0;

        recorder.onaudioprocess = (e) => {
          /*START RECORDING */
          if (vm.isPaused) {
            /*RECORDING COMPLETED - CODE START */
            // stop recording
            recorder.disconnect(context.destination);
            mediaStream.disconnect(recorder);

            // we flat the left and right channels down
            // Float32Array[] => Float32Array
            const leftBuffer = flattenArray(leftchannel, recordingLength);
            const rightBuffer = flattenArray(rightchannel, recordingLength);
            // we interleave both channels together
            // [left[0],right[0],left[1],right[1],...]
            const interleaved = interleave(leftBuffer, rightBuffer);

            // we create our wav file
            const buffer = new ArrayBuffer(44 + interleaved.length * 2);
            const view = new DataView(buffer);

            // RIFF chunk descriptor
            writeUTFBytes(view, 0, "RIFF");
            view.setUint32(4, 44 + interleaved.length * 2, true);
            writeUTFBytes(view, 8, "WAVE");
            // FMT sub-chunk
            writeUTFBytes(view, 12, "fmt ");
            view.setUint32(16, 16, true); // chunkSize
            view.setUint16(20, 1, true); // wFormatTag
            view.setUint16(22, 2, true); // wChannels: stereo (2 channels)
            view.setUint32(24, sampleRate, true); // dwSamplesPerSec
            view.setUint32(28, sampleRate * 4, true); // dwAvgBytesPerSec
            view.setUint16(32, 4, true); // wBlockAlign
            view.setUint16(34, 16, true); // wBitsPerSample
            // data sub-chunk
            writeUTFBytes(view, 36, "data");
            view.setUint32(40, interleaved.length * 2, true);

            // write the PCM samples
            let index = 44;
            const volume = 1;
            for (let i = 0; i < interleaved.length; i++) {
              view.setInt16(index, interleaved[i] * (0x7fff * volume), true);
              index += 2;
            }

            // our final blob
            blob = new Blob([view], { type: "audio/wav" });
            const url = window.URL.createObjectURL(blob);
            const audio = new Audio(url);
            audio.play();
            /*RECORDING COMPLETED - CODE END */
          }
          leftchannel.push(new Float32Array(e.inputBuffer.getChannelData(0)));
          rightchannel.push(new Float32Array(e.inputBuffer.getChannelData(1)));
          recordingLength += bufferSize;

          /*END RECORDING */
        };
        mediaStream.connect(recorder);
        recorder.connect(context.destination);
      };

      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then(handleSuccess);
      //If you want to choose a particular microphone, you can first enumerate the available microphones.
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices = devices.filter((d) => d.kind === "audioinput");
      });
    },

    /*
     *METHOD START: Map mutations:
     */
    ...mapMutations([""]),
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

      for (const entry of this.tStore.screens) {
        console.log(entry); // 1, "string", false
      }
    },
  },
  mounted() {
    /*
    var audioTrack = new WebAudioTrack();
    var audioTrackFile = new WebAudioTrack() as any;

    var startButton = document.getElementById("btn-start-recording");
    var stopButton = document.getElementById("btn-stop-recording");
    var playRecButton = document.getElementById("btn-play-recording");
    var playFileButton = document.getElementById("btn-play-file");
    var playBothButton = document.getElementById("btn-play-both");

    startButton.addEventListener("click", function () {
      audioTrack.startRecording(function () {
        stopButton.disabled = false;
        startButton.disabled = true;
      });
    });

    stopButton.addEventListener("click", function () {
      audioTrack.stopRecording(function () {
        startButton.disabled = false;
        stopButton.disabled = true;
        playRecButton.disabled = false;
        playBothButton.disabled = false;
      });
    });

    playRecButton.addEventListener("click", function () {
      audioTrack.play();
    });

    playFileButton.addEventListener("click", function () {
      audioTrackFile.play();
    });

    playBothButton.addEventListener("click", function () {
      var newTrack = new WebAudioTrack();
      newTrack.loadUrl("audio-2.m4a").then(function () {
        newTrack.appendAudioFromTrack(audioTrack);
        newTrack.play();
      });
    });
*/
  },
});
</script>

<style scoped>
.grid-container-test {
  display: grid;
  grid-template-columns:
    calc(var(--vw) * 17)
    calc(var(--vw) * 66)
    calc(var(--vw) * 17);

  grid-template-rows: calc(var(--vh) * 45) calc(var(--vh) * 45) calc(
      var(--vh) * 10
    );

  margin: 0;
  padding: 0;
}

button {
  height: 200px;
  margin: 40px;
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
  margin-top: calc(var(--vw) * 18);
  margin-bottom: calc(var(--vw) * 3);
  margin-right: calc(var(--vw) * 3);
  margin-left: calc(var(--vw) * 3);
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
  grid-column: 1/-1;
  width: calc(var(--vw) * 25);
  justify-self: center;
}

.narrator-container > * {
  /* videos and image tages inside narrator */
  width: 100%;
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
