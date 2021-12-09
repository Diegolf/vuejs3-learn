<template>
   <div>
      <ScoreBoard
         :numberOfCorrectAnswers="this.numberOfCorrectAnswers"
         :numberOfIncorrectAnswers="this.numberOfIncorrectAnswers"
      />
      <template v-if="this.answers.length > 0">
         <h1 v-html="this.question"></h1>

         <template v-for="(answer, index) in this.answers" :key="index">
            <input
               type="radio"
               name="options"
               :id="index"
               :value="answer"
               :disabled="this.answerSubmitted"
               v-model="this.chosenAnswer"
            />
            <label v-html="answer" :for="index"></label><br />
         </template>

         <button
            class="send"
            @click="this.submitAnswer()"
            type="button"
            v-if="!this.answerSubmitted"
         >
            Send
         </button>

         <section class="result" v-if="this.answerSubmitted">
            <h4
               v-if="this.chosenAnswer == this.correctAnswer"
               v-html="
                  '&#9989; Congratilations, the answer ' +
                  this.correctAnswer +
                  ' is correct.'
               "
            ></h4>

            <h4
               v-else
               v-html="
                  '&#10060; I´m sorry, you picked the wrong answer. The correct is ' +
                  this.correctAnswer +
                  '.'
               "
            ></h4>

            <button @click="this.getNewQuestion()" class="send" type="button">
               Next question
            </button>
         </section>
      </template>
   </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ScoreBoard from "./ScoreBoard.vue";

export default defineComponent({
   components: {
      ScoreBoard,
   },

   data() {
      return {
         question: "",
         correctAnswer: "",
         incorrectAnswers: [],
         chosenAnswer: undefined,
         answerSubmitted: false,
         numberOfCorrectAnswers: 0,
         numberOfIncorrectAnswers: 0,
      };
   },

   created(): void {
      this.getNewQuestion();
   },

   computed: {
      answers(): string[] {
         return [...this.incorrectAnswers, this.correctAnswer].sort(
            () => Math.random() - 0.5
         );
      },
   },

   methods: {
      getNewQuestion(): void {
         this.answerSubmitted = false;
         this.chosenAnswer = undefined;

         this.axios
            .get("https://opentdb.com/api.php?amount=1&category=18")
            .then((response) => {
               const result = response.data.results[0];
               this.question = result.question;
               this.correctAnswer = result.correct_answer;
               this.incorrectAnswers = result.incorrect_answers;
            });
      },
      submitAnswer(): void {
         if (!this.chosenAnswer) {
            alert("Pick one of the options.");
            return;
         }
         this.chosenAnswer === this.correctAnswer
            ? this.numberOfCorrectAnswers++
            : this.numberOfIncorrectAnswers++;
         this.answerSubmitted = true;
      },
   },
});
</script>

<style scoped lang="scss">
h1 {
   margin-top: 40px;
}

input[type="radio"] {
   margin: 12px 4px;
}

button.send {
   margin-top: 12px;
   height: 40px;
   min-width: 120px;
   padding: 0 16px;
   color: #fff;
   background-color: #1867c0;
   border: 1px solid #1867c0;
   cursor: pointer;
}
</style>
