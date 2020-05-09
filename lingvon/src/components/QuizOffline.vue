<template>
  <b-container>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <b-row style="margin-top:15px">
          <b-col class="text-left">
            <p class="lead">
              🔥
              <strong>Streaks: {{ streaks }}</strong>
            </p>
          </b-col>
          <b-col class="text-right">
            <p class="lead">
              🔝
              <strong class="mr-2">Level</strong>
              <b-form-spinbutton v-model="level" min="1" :max="maxLevel" inline></b-form-spinbutton>
            </p>
          </b-col>
        </b-row>
        <QuestionBox :wordArray="wordArray" @result="commitResult" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import QuestionBox from "@/components/QuestionBox.vue";
// import Setting from "@/components/Setting.vue";

import wordData from "@/assets/data/fr/5000.json";
import corpusData from "@/assets/data/fr/5000s.json";

export default {
  name: "home",
  components: {
    QuestionBox
  },
  created() {
    if (
      localStorage.getItem("level") == null ||
      localStorage.getItem("streaks") == null
    ) {
      localStorage.setItem("level", "1");
      localStorage.setItem("streaks", "0");
    }

    this.level = parseInt(localStorage.getItem("level"));
    this.streaks = parseInt(localStorage.getItem("streaks"));

    this.getQuestionRange();
    this.getQuestionSet(this.questionLength);
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
      questionLength: 4,
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

      localStorage.setItem("level", value);
      this.getQuestionRange();
    },
    streaks: function(value) {
      localStorage.setItem("streaks", value);
    }
  },
  methods: {
    commitResult(value) {
      if (value) {
        this.streaks++;

        this.wordArray = [];
        this.getQuestionSet(this.questionLength);
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
      let wordUsage;

      for (let i = 0; i < num; i++) {
        wordNum = this.getRandomNum(this.min, this.max);

        while (this.wordArray.map(o => o.id).includes(wordNum)) {
          wordNum = this.getRandomNum(this.min, this.max);
        }

        wordUsage = {
          french: "Sorry, No Data Available",
          english: "Sorry, No Data Available"
        };

        for (let usage in this.corpusData) {
          if (
            this.corpusData[usage].french
              .split(" ")
              .find(e => e == wordData[wordNum].french)
          ) {
            wordUsage = this.corpusData[usage];
          }
        }

        this.wordArray.push({
          word: wordData[wordNum],
          wordUsage: wordUsage,
          id: wordNum
        });
      }
    }
  }
};
</script>
