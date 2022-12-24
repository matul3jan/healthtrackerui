<template>
  <v-card color="grey lighten-4" hover width="500" height="90%">
    <v-skeleton-loader max-width="500" height="100%" type="image" v-if="loading"/>
    <v-card-title v-if="!loading">
      <v-row class="mt-3">
        <v-col cols="6">
          <v-icon v-for="i in value" :key="i" color="blue" class="ml-4" size="40">mdi-cup</v-icon>
        </v-col>
        <v-col cols="6">
          <span class="float-right">Ideal daily fluid intake</span>
          <span class="text-subtitle-1 float-right ma-2">cups</span>
          <span class="text-h4 font-weight-black float-right" v-text="value"></span>
        </v-col>
      </v-row>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "FluidIntake",
  props:{
    value: Number,
    loading: String
  },
  methods: {}
}
</script>

<style scoped>

</style>