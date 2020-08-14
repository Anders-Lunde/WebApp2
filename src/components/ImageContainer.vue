<template>
  <!--  USAGE: <ImageContainer :imageSrc="items[ii].img" />  -->
  <div>
    <div id="asd" ref="asd">
      <button @click="calculateHeight()">Calculate Height</button>
      <p>height: {{height}}</p>
      <p>width: {{width}}</p>
    </div>
  -->
  <img id="ImageContainerImage" :src="imageSrc" />
  <!-- <div>{{this.$refs.asd.clientHeight}}</div> -->
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ImageContainer",
  /*mounted() {},*/

  computed: {
    /*
    getfullname(): number {
      return Math.min(
        this.$parent.clientHeight / this.imageSrc.height,
        this.$parent.clientHeight / this.imageSrc.height
      );
    }
    */
    /*
    scale() {
        return { Math.min( 
    availableWidth / contentWidth, 
    availableHeight / contentHeight 
  )};
    }
  },
 */
  },
  props: ["imageSrc"],
  data() {
    return { height: 0, width: 0 };
  },
  mounted: function() {
    this.$nextTick(function() {
      //this.calculateHeight();
      const elem = document.getElementById("ImageContainerImage");
      if (elem) {
        this.height = elem.clientHeight;
        this.width = elem.clientWidth;

        //elem.innerHTML = "Type here is HTMLElement, not null";
        const img = new Image();
        img.src = this.imageSrc;

        const scale = Math.min(
          this.width / img.width,
          this.height / img.height
        );

        //elem.style.transform = "scale(" + scale + ")";
        elem.style.height = img.height * scale + "px";
        elem.style.width = img.width * scale + "px";

        elem.style.border = "0.25rem solid black";
        elem.style.padding = "10%";
        /*
        elem.style.margin = "10%";
        elem.style.padding = "10%";

        elem.style.height = img.height * scale * 0.9 * 0.9 + "px";
        elem.style.width = img.width * scale * 0.9 * 0.9 + "px";
*/
        /*  align-self: center;
  justify-self: center;
  margin: 0%;
  justify-content: center;
  text-align: center;*/

        console.log(scale);
      }
    });
  },

  methods: {
    calculateHeight: function() {
      const elem = document.getElementById("ImageContainerImage");
      if (elem) {
        //elem.innerHTML = "Type here is HTMLElement, not null";
        this.height = elem.clientHeight;
        this.width = elem.clientWidth;
        //console.log(this.height, this.width);
      }

      //this.bla = floorElements[0].title;
      //      this.height = this.$refs.asd.clientHeight;
    }
  }
});
</script>

<style scoped>
button {
  color: red;
  font-size: 300;
}

img {
  height: 100%;
  width: 100%;
}
</style>
