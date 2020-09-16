<template>
  <div class="grid-container">
    <div class="heading">{{ screenDataReadOnly.heading }}</div>

    <FormulateForm v-model="formValues">
      <FormulateInput
        name="name"
        label="Hva heter test deltaker?"
        validation="required"
      />
      <FormulateInput
        name="age"
        label="Hvor gammel er test deltaker?"
        validation="required|number|max:120"
      />
      <FormulateInput
        name="age"
        label="Prosjekt ID?"
        validation="required|number|max:120"
      />
      <FormulateInput
        name="birthdate"
        label="Fødselsdato?"
        validation="required|number|max:120"
      />

      <FormulateInput
        name="gender"
        label="Kjønn?"
        type="radio"
        validation="required"
        :options="{ male: 'Gutt', female: 'Jente', other: 'Annet/ubesvart' }"
      />

      <FormulateInput
        type="submit"
        label="Sign up"
        @click="registerParticipant()"
      />
    </FormulateForm>

    <div class="goto-next-button" @click="gotoNextButton()">
      <ButtonGotoNext />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import VueFormulate from "@braid/vue-formulate";
Vue.use(VueFormulate);
import ButtonGotoNext from "@/components/ButtonGotoNext.vue";

export default Vue.extend({
  name: "ParticipantRegistration",
  components: {
    ButtonGotoNext,
  },
  data() {
    return {
      screenDataReadOnly: this.tStore.screens[this.tStore.ii],
      deactivateAllButtons: false,
      formValues: null,
    };
  },
  props: ["tStore"],

  methods: {
    /*
     *METHOD START: registerParticipant:
     */
    registerParticipant: function() {
      //console.log(this.formValues);
    },

    /*
     *METHOD START: gotoNextButton:
     */
    gotoNextButton: function() {
      if (this.deactivateAllButtons) {
        return;
      }
      this.tStore.ii++;
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

  grid-template-rows: calc(var(--vh) * 15) calc(var(--vh) * 75) calc(
      var(--vh) * 10
    );

  margin: 0;
  padding: 0;
}

.formulate-form {
  grid-row: 2;
  grid-column: 1/-1;
  justify-self: start;
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
