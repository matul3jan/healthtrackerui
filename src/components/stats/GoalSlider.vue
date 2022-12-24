<template>
  <v-hover v-slot="{ hover }">
    <v-sheet class="mx-auto" width="91%" color="grey lighten-5" :elevation="hover ? 8 : 2" height="100" rounded
             :style="hover ? 'cursor:pointer' : ''">
      <span class="ml-5 title">Your goals</span>
      <v-slide-group multiple show-arrows="always">
        <v-slide-item v-for="item in getGoals()" :key="item.id">
          <div class="mx-5">
            <span class="text-subtitle-1">{{ activityName(item.activityId) }}</span>
            <v-progress-linear
                :background-opacity="0.5" :buffer-value="100" :height="10" rounded
                :value="item.percent" color="light-green" style="min-width: 300px" class="mt-2"
            />
          </div>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-hover>
</template>

<script>
export default {
  name: "GoalSlider",
  methods: {
    getGoals() {
      return this.$actions.getGoals()
    },
    activityName(id) {
      let activity = this.$actions.getActivities().find(a => a.id === id)
      return activity ? activity.description : ""
    },
  }
}
</script>

<style scoped>

</style>