<template>
  <v-tabs v-model="activeTab" icons-and-text grow class="mx-auto mt-10" style="width: 30vw">
    <v-tab v-for="i in tabs" :key="i.name">
      <v-icon large>{{ i.icon }}</v-icon>
      <div class="caption py-1">{{ i.name }}</div>
    </v-tab>
    <v-tab-item>
      <UserLogin v-on="$listeners"/> <!-- pass events to parent (i.e grandparent of UserLogin)-->
    </v-tab-item>
    <v-tab-item>
      <UserRegister @registered="activeTab = 0"/>
    </v-tab-item>
  </v-tabs>
</template>

<script>

import UserRegister from "@/components/user/UserRegister"
import UserLogin from "@/components/user/UserLogin"

export default {
  name: 'WelcomeScreen',
  components: {UserLogin, UserRegister},
  data: () => ({
    activeTab: 0,
    tabs: [
      {name: "Login", icon: "mdi-account"},
      {name: "Register", icon: "mdi-account-outline"}
    ]
  })
}
</script>
