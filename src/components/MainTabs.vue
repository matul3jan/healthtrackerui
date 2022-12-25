<template>
  <v-tabs vertical class="fill-height" :value="activeTab" dark style="opacity: 0.8"
          active-class="font-weight-bold">
    <v-tab v-for="item in tabs" :key="item.title" class="justify-start pl-6 mt-2" style="width: 15vw">
      <v-icon left>{{ item.icon }}</v-icon>
      {{ item.title }}
    </v-tab>
    <v-tab-item class="mt-2">
      <UserStatistics/>
    </v-tab-item>
    <v-tab-item>
      <UserActivities v-on="$listeners"/>
    </v-tab-item>
    <v-tab-item>
      <UserGoals ref="goals" v-on="$listeners"/>
    </v-tab-item>
    <v-tab-item class="mt-16">
      <UserRegister :is-profile="true"/>
    </v-tab-item>
  </v-tabs>
</template>

<script>

import UserActivities from "@/components/activities/UserActivities"
import UserGoals from "@/components/goals/UserGoals"
import UserRegister from "@/components/user/UserRegister"
import UserStatistics from "@/components/stats/UserStatistics"

export default {
  name: "MainTabs",
  components: {
    UserRegister,
    UserActivities,
    UserGoals,
    UserStatistics
  },
  props: {
    activeTab: Number
  },
  data: () => ({
    tabs: [
      {title: 'Dashboard', icon: 'mdi-view-dashboard'},
      {title: 'Activities', icon: 'mdi-run'},
      {title: 'Goals', icon: 'mdi-bullseye-arrow'},
      {title: 'Profile', icon: 'mdi-account'}
    ]
  })
}
</script>

<style scoped>

</style>