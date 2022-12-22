<template>
  <v-tabs vertical class="fill-height" :value="activeTab" dark style="opacity: 0.8"
          active-class="font-weight-bold" @change="onTabChange">
    <v-tab v-for="item in menus" :key="item.title" class="justify-start pl-6" style="width: 15vw;">
      <v-icon left>{{ item.icon }}</v-icon>
      {{ item.title }}
    </v-tab>
    <v-tab-item/>
    <v-tab-item>
      <UserActivities v-on="$listeners"/>
    </v-tab-item>
    <v-tab-item>
      <UserGoals ref="goals" v-on="$listeners"/>
    </v-tab-item>
    <v-tab-item class="mt-16">
      <UserRegister :user="getUser()" :is-profile="true"/>
    </v-tab-item>
  </v-tabs>
</template>

<script>

import UserActivities from "@/components/activities/UserActivities";
import UserGoals from "@/components/goals/UserGoals";
import UserRegister from "@/components/user/UserRegister";

export default {
  name: "MainTabs",
  components: {
    UserRegister,
    UserActivities,
    UserGoals
  },
  props: {
    activeTab: Number
  },
  data: () => ({
    menus: [
      {title: 'Dashboard', icon: 'mdi-view-dashboard'},
      {title: 'Activities', icon: 'mdi-run'},
      {title: 'Goals', icon: 'mdi-bullseye-arrow'},
      {title: 'Profile', icon: 'mdi-account'}
    ],
  }),
  methods: {
    onTabChange() {
      if (this.$refs.goals) {
        this.$refs.goals.setupData()
      }
    },
    getUser() {
      return this.$session.get('user')
    }
  }
}
</script>

<style scoped>

</style>