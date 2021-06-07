<template class="bg-dark bg-light">
  <h1 class="text-center mt-2">{{defineSprint.title}}</h1>
  <Timer :time-left="timeLeft" :TIME_LIMIT="defineSprint.timeLimit"/>

  <footer>
    <br>
    <br>
    <p>Made by <a href="https://julyandphantons.netlify.app/" target="_blank">Me</a> click and see more</p>
  </footer>
</template>

<script>
  import Timer from "@/components/Timer.vue";

  export default {

    name: 'main',

    data() {
      return {
        timeLimit: 25*60,
        timerInterval: null,
        timePassed: 0,

        workRangeValue: 3,
        pauseRangeValue: 5*60,
        restRangeValue: 15*60,
        sprintRangeValue: 4,

        finished: false,
        nowSprint: 1,
      }
    },

    components: {
      Timer
    },

    computed: {
      timeLeft() {
        return this.timeLimit - this.timePassed
      },

      defineSprint() {
        let obj;

        if(this.finished) {
          this.changeStage();
        }

        if(this.nowSprint%2 === 1) {
          obj = {
              title: "Trabalhar",
              timeLimit: this.workRangeValue
            }
        } else if(this.nowSprint%4 === 0) {
          obj = {
              title: "Descansar",
              timeLimit: this.restRangeValue
            }
        } else if(this.nowSprint%2 === 0) {
          obj = {
              title: "Pausa",
              timeLimit: this.pauseRangeValue
            }
        }

        return obj;
      },
    },

    methods: {
      startTimer() {
        this.timerInterval = setInterval(() => (this.timePassed += 1), 1000);
      },

      changeStage() {
        this.nowSprint += 1;
      }
    },

    mounted() {
      this.emitter.on("configArray", config => {
        this.timeLimit = config.workRangeValue*60;
        this.workRangeValue = config.workRangeValue*60;
        this.pauseRangeValue = config.pauseRangeValue*60;
        this.restRangeValue = config.restRangeValue*60;
        this.sprintRangeValue = config.sprintRangeValue;
      });

      this.emitter.on("finished", fn => {
        this.finished = fn;
      });

      this.startTimer();
    },
  }
</script>

<style lang="scss" scoped>
</style>