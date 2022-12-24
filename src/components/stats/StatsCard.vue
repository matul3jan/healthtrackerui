<template>
  <v-card class="mt-5" color="grey lighten-4" hover width="300" max-height="150">
    <v-skeleton-loader max-width="300" height="150" type="image" v-if="loading"/>
    <v-card-title v-if="!loading">
      <v-icon color="indigo" class="mr-2" size="50">
        {{ icon }}
      </v-icon>
      <div class="mr-10">{{ text }}
        <div v-if="ideal" class="text-subtitle-2">
          (Ideal {{ ideal }})
        </div>
      </div>
      <v-row align="start">
        <div>
          <span class="text-h4 font-weight-black" v-text="value || '—'"></span>
          <span class="ml-2 text-subtitle-1">{{ unit }}</span>
        </div>
      </v-row>
    </v-card-title>
    <SparkLine v-if="!loading" :gradient-index="gradientIndex"/>
  </v-card>
</template>

<script>
import SparkLine from "@/components/stats/SparkLine";

export default {
  name: "StatsCard",
  props: {
    value: String,
    ideal: String,
    icon: String,
    text: String,
    unit: String,
    gradientIndex: Number,
    loading: String,
  },
  components: {
    SparkLine
  }
}
</script>

<style scoped>

</style>