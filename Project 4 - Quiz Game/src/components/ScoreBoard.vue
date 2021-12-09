<template>
   <section class="score">
      Player<span>{{ this.numberOfCorrectAnswers }}</span
      >x<span>{{ this.numberOfIncorrectAnswers }}</span
      >Computer
   </section>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
   props: {
      numberOfCorrectAnswers: Number,
      numberOfIncorrectAnswers: Number,
   },
   data() {
      return {};
   },
});
</script>

<style scoped lang="scss">
section.score {
   border-bottom: 1px solid black;
   padding: 24px;
   font-size: 18px;

   span {
      padding: 8px;
      margin: 0 10px;
      font-weight: bold;
      border: 1px solid black;
   }
}
</style>