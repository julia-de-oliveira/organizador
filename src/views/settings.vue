<template>
  <h1 class="text-center mt-2">Configurações</h1>

  <form class="text-center mt-4 mx-auto col-mg-12 col-lg-8">
    <div class="w-50 mx-auto mt-1 mb-1">
      <label for="workRange" class="form-label">Trabalho(min):</label><br>
      <span v-text="configArray.workRangeValue"></span>
      <input type="range" class="form-range" min="0" max="60" v-model="configArray.workRangeValue" id="workRange">
    </div>

    <div class="w-50 mx-auto mt-1 mb-1">
      <label for="pauseRange" class="form-label">Pausa(min):</label><br>
      <span v-text="configArray.pauseRangeValue"></span>
      <input type="range" class="form-range" min="0" max="60" v-model="configArray.pauseRangeValue" id="pauseRange">
    </div>

    <div class="w-50 mx-auto mt-1 mb-1">
      <label for="restRange" class="form-label">Descanso(min):</label><br>
      <span v-text="configArray.restRangeValue"></span>
      <input type="range" class="form-range" min="0" max="60" v-model="configArray.restRangeValue" id="restRange">
    </div>

    <div class="w-50 mx-auto mt-1 mb-1">
      <label for="sprintRange" class="form-label">Repetições até o descanso:</label><br>
      <span v-text="configArray.sprintRangeValue"></span>
      <input type="range" class="form-range" min="0" max="10" v-model="configArray.sprintRangeValue" id="sprintRange">
    </div>

    <div class="d-grid  d-md-block">
      <button class="btn btn-primary me-md-3" type="button" v-on:click="reset()">Reset</button>
      <button class="btn btn-success" type="button" v-on:click="send()"><router-link to="/" class="text-white text-decoration-none">Salvar</router-link></button>
    </div>
  </form>

  <footer>
    <br>
    <br>
    <br>
    <br>
    <br>
    <p>Made by <a href="https://julyandphantons.netlify.app/" target="_blank">Me</a> click and see more</p>
  </footer>
</template>

<script>
export default {

  name: 'settings',

  data () {
    return {
      configArray: {
      workRangeValue: 25,
      pauseRangeValue: 5,
      restRangeValue: 15,
      sprintRangeValue: 4}
    }
  },

  methods: {
    reset() {
      this.configArray.workRangeValue = 25;
      this.configArray.pauseRangeValue = 5;
      this.configArray.restRangeValue = 15;
      this.configArray.sprintRangeValue = 4;
    },

    send() {
      this.emitter.emit("configArray", this.configArray);
    }
  }
}
</script>

<style lang="css" scoped>
</style>