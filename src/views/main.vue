<template class="bg-dark bg-light template">
  <div class="container-fluid col-12 d-lg-flex">
    <div class="col-lg-9">
      <h1 class="text-center align-middle">{{defineSprint.title}}</h1>
      <h3 class="text-center">{{formattedCurrentHours}}h de {{formattedTotalHours}}h finalizadas</h3>
      <Timer :time-left="timeLeft" :TIME_LIMIT="defineSprint.timeLimit"/>
    </div>
    
    <div class="col-lg-3">
      <h1 class="text-center align-middle">Lista de tarefas</h1>
      <TodoList/>
    </div>
  </div>
  
  <div class="footer">
    <Footer/>  
  </div>
</template>

<script>
  import Timer from "@/components/Timer.vue";
  import TodoList from '@/components/Todo.vue'
  import Footer from '@/components/Footer.vue'

  export default {

    name: 'main',

    data() {
      return {
        timeLimit: 25*60,
        timerInterval: null,
        timePassed: 0,

        workRangeValue: 25*60,
        pauseRangeValue: 5*60,
        restRangeValue: 15*60,
        sprintRangeValue: 4,

        finished: false,
        nowSprint: 1,
      }
    },

    components: {
      Timer,
      TodoList,
      Footer
    },

    computed: {
      timeLeft() {
        return this.timeLimit - this.timePassed
      },

      formattedTotalHours() {
        const totalTime = (((this.workRangeValue + this.pauseRangeValue)*this.sprintRangeValue)-this.pauseRangeValue)/60 + this.restRangeValue/60;
        const hours = Math.floor(totalTime / 60);
        let minutes = totalTime % 60;

        if (minutes < 10) {
          minutes = `0${minutes}`;
        }

        return `${hours}:${minutes}`;
      },

      formattedCurrentHours() {
        let totalTime = 0;
        for (var i = 0; i < this.nowSprint-1; i++) {
          if(i%2 == 0) totalTime += this.workRangeValue/60;
          else if(this.nowSprint%(this.sprintRangeValue*2) === 0) totalTime += this.restRangeValue/60;
          else totalTime += this.pauseRangeValue/60;
        }

        const hours = Math.floor(totalTime / 60);
        let minutes = totalTime % 60;

        if (minutes < 10) {
          minutes = `0${minutes}`;
        }

        return `${hours}:${minutes}`;
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
        } else if(this.nowSprint%(this.sprintRangeValue*2) === 0) {
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
      },
    },

    mounted() {
      this.emitter.on("configArray", config => {
        this.timeLimit = config.workRangeValue*60;
        this.workRangeValue = config.workRangeValue*60;
        this.pauseRangeValue = config.pauseRangeValue*60;
        this.restRangeValue = config.restRangeValue*60;
        this.sprintRangeValue = config.sprintRangeValue;
      });

      if(localStorage.workRangeValue) this.timeLimit = localStorage.workRangeValue*60;

      if(localStorage.workRangeValue) this.workRangeValue = localStorage.workRangeValue*60;

      if(localStorage.pauseRangeValue) this.pauseRangeValue = localStorage.pauseRangeValue*60;
      
      if(localStorage.restRangeValue) this.restRangeValue = localStorage.restRangeValue*60;
      
      if(localStorage.sprintRangeValue) this.sprintRangeValue = localStorage.sprintRangeValue;

      this.emitter.on("finished", fn => {
        this.finished = fn;
      });

      this.startTimer();
    },
  }
</script>

<style lang="scss" scoped>
.footer {
  margin-top: 20px;
  margin-bottom: -15px;
}
</style>