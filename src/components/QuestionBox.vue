<template>
  <div style="margin-top:30">
    <b-jumbotron>
      <template slot="lead">
        <h1 class="display-4 text-center">{{ wordArray[answer].word.french }}</h1>
      </template>

      <hr class="my-4" />
      <b-container>
        <b-row>
          <b-col v-for="(item, index) in wordArray" :key="index">
            <b-button @click="checkAnswer(index)" block pill>{{ item.word.english }}</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  props: ["wordArray"],
  watch: {
    wordArray: function() {
      this.answer = this.getRandomNum(0, 3);
    }
  },
  data: function() {
    return {
      answer: 0
    };
  },
  methods: {
    getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    checkAnswer(index) {
      if (index == this.answer) {
        this.$emit("result", true);
      } else {
        this.$emit("result", false);
      }
    }
  }
};
</script>