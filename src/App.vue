<template>
  <div id="app">
    <Header
      :numCorrect="numCorrect"
      :numTotal="numTotal"
    />

    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <QuestionBox 
            v-if="questions.length"
            :currentQuestion="questions[index]"
            :next="next"
            :increment="increment"
            />
        </b-col>
      </b-row>
    </b-container>

    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome Welcomeee" /> -->
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import QuestionBox from "./components/QuestionBox.vue";

import fr1300 from "./data/fr/1300.json";
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    Header,
    QuestionBox
  },
  data(){
    return{
      questions: [],
      corpus: fr1300,
      index: 0,
      numCorrect: 0,
      numTotal: 0
    }
  },
  methods: {
    next() {
      this.index++
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrect++
      }
      this.numTotal++
    }
  },
  mounted: async function(){
    const res = await fetch('https://opentdb.com/api.php?amount=10&category=27&type=multiple')
    const jsonData = await res.json()

    this.questions = jsonData.results
    
    // const response = await fetch('http://timothyb.me/lingvon/data/fr/1300.json')
    // const corpus = await response.json()
    // console.log(corpus)
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
