<template>
  <div>
    <v-row justify="space-around">
      <v-col cols="4" class="d-flex justify-center">
        <StatsCard :value="stats.bmi" text="BMI" icon="mdi-scale" :gradient-index="5" unit="kg/m2"/>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <StatsCard :value="stats.height" text="Height" icon="mdi-human-male-height" unit="ft' in''"
                   :gradient-index="1"/>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <StatsCard :value="stats.weight" text="Weight" icon="mdi-scale-bathroom" unit="kg" :gradient-index="4"
                   :ideal="stats.idealWeight"/>
      </v-col>
    </v-row>
    <v-row>
      <GoalSlider class="ma-5"/>
    </v-row>
    <v-row>
      <v-col cols="6">
        <CalorieChart class="ml-12"/>
      </v-col>
      <v-col cols="6">
        <FluidIntake :value="stats.fluidIntake" class="mx-auto"/>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StatsCard from "@/components/stats/StatsCard"
import CalorieChart from "@/components/activities/CalorieChart"
import FluidIntake from "@/components/stats/FluidIntake"
import GoalSlider from "@/components/goals/GoalSlider"

export default {
  name: "UserStatistics",
  components: {GoalSlider, FluidIntake, StatsCard, CalorieChart},
  data: () => ({
    bmi: "",
    height: "",
    weight: "",
    idealWeight: "",
    fluidIntake: 0
  }),
  computed: {
    stats() {
      const stats = this.$actions.userActions.getStats()
      return {
        bmi: stats.bmi,
        idealWeight: stats.idealWeight,
        fluidIntake: parseInt(stats.fluidIntake),
        height: this.toFeet(stats.height),
        weight: stats.weight.toString()
      }
    }
  },
  methods: {
    toFeet(n) {
      const realFeet = ((n * 0.393700) / 12)
      const feet = Math.floor(realFeet)
      const inches = Math.round((realFeet - feet) * 12)
      return feet + "′" + inches + "′′"
    }
  }
}
</script>

<style scoped>

</style>