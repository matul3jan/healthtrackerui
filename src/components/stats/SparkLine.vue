<template>
  <v-sparkline
      :value="[0, 2, 5, 9, 5, 10, 3, 5, 1, 7, 1, 8, 2, 9]"
      :gradient="getGradient"
      smooth="10"
      padding="20"
      line-width="4"
      stroke-linecap="round"
      gradient-direction="top"
      :fill="false"
      type="trend"
      :auto-line-width="false"
      auto-draw
  ></v-sparkline>
</template>

<script>

const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {
  name: "SparkLine",
  props: {
    gradientIndex: Number
  },
  computed: {
    getGradient() {
      return gradients[this.gradientIndex]
    }
  }
}
</script>