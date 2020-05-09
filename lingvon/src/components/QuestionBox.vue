<template>
  <div style="margin-top:30">
    <b-jumbotron>
      <template slot="lead">
        <h1 class="display-4 text-center">
          <strong>{{ wordArray[answer].word.french }}</strong>
        </h1>
      </template>

      <hr class="my-4" />
      <b-container>
        <b-row cols="2">
          <b-col v-for="(item, index) in wordArray" :key="index" class="mt-3">
            <b-button @click="checkAnswer(index)" block class="py-4" :variant="btnVariant(index)">
              <h3><strong>{{ item.word.english }}</strong></h3>
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>

    <b-modal v-model="correct" centered title="👍 CORRECT 👍" ok-only v-if="correct">
      <p class="lead">Usage of <mark>{{ wordArray[answer].word.french }}</mark></p>
      <p><strong>FR) </strong>{{ wordArray[answer].wordUsage.french }} <br>
      <strong>EN) </strong>{{ wordArray[answer].wordUsage.english }}</p>
    </b-modal>

  </div>
</template>

<script>
export default {
  props: ["wordArray"],
  watch: {
    wordArray: function() {
      this.answer = this.getRandomNum(0, 3);
    },
    correct: function(value){
      if(!value){
        this.emitTrue();
      }
    }
  },
  data: function() {
    return {
      answer: 0,
      correct: false
    };
  },
  methods: {
    btnVariant(idx) {
      if(idx === 0){
        return ''
      } else {
        return 'danger'
      }

    },
    getRandomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    emitTrue(){
      this.$emit("result", true);
    },
    checkAnswer(index) {
      let content = `${this.wordArray[index].word.english} is ${this.wordArray[index].word.french}`;
      if (index == this.answer) {
        this.correct = true;
      } else {
        this.makeToast("danger", "😓 WRONG 😓", content);
        this.$emit("result", false);
      }
    },
    makeToast(variant = null, title, content) {
      this.$bvToast.toast(content, {
        title: title,
        allowHtml: true,
        toaster: "b-toaster-top-full",
        variant: variant,
        solid: true
      });
    }
  }
};
</script>