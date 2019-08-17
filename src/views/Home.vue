<template>
  <b-container class="h-100" style="margin-top: 20vh;">
    <b-row class="h-100 justify-content-center align-items-center">
      <b-col cols="12">
        <b-container>
          <b-row>
            <b-col cols="9">
              <p class="lead">
                🔥 <strong>Streaks: {{ streaks }}</strong>
              </p>
            </b-col>

            <b-col class="text-right">
              <b-button @click="level--">-</b-button>
            </b-col>
            <b-col  class="text-center">
              <p class="lead">
                <strong>Level:{{ level }}</strong>
              </p>
            </b-col>
            <b-col>
              <b-button @click="level++">+</b-button>
            </b-col>

          </b-row>
        </b-container>

        <QuestionBox :wordArray="wordArray" @result="commitResult" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import QuestionBox from "@/components/QuestionBox.vue";

import wordData from "@/assets/data/fr/5000.json";
import corpusData from "@/assets/data/fr/5000s.json";

export default {
  name: "home",
  components: {
    QuestionBox
  },
  created() {
    if (localStorage.getItem("level") == null) {
      localStorage.setItem("level", "1");
    }
    this.level = parseInt(localStorage.getItem("level"));

    this.getQuestionRange();
    this.getQuestionSet(4);
  },
  data: function() {
    return {
      wordData: wordData,
      corpusData: corpusData,
      level: 1,
      streaks: 0,
      maxLevel: 50,
      min: 0,
      max: 0,
      wordArray: []
    };
  },
  watch: {
    level: function(value) {
      if (value < 1) {
        this.level = 1;
      } else if (value > this.maxLevel) {
        this.level = this.maxLevel;
      }
      this.getQuestionRange();
    }
  },
  methods: {
    commitResult(value) {
      if (value) {
        this.streaks++;
        this.wordArray = [];
        this.getQuestionSet(4);
      } else {
        this.streaks = 0;
      }
    },
    getQuestionRange() {
      const dataLen = Object.keys(this.wordData).length;

      this.min = Math.ceil((dataLen / this.maxLevel) * (this.level - 1));
      this.max = Math.ceil((dataLen / this.maxLevel) * this.level);
    },
    getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getQuestionSet(num) {
      let wordNum = 0;
      for (let i = 0; i < num; i++) {
        wordNum = this.getRandomNum(this.min, this.max);
        this.wordArray.push({
          word: wordData[wordNum],
          id: wordNum
        });
      }
    }
  }
};
</script>
