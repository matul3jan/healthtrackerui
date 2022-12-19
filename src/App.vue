<template>
  <v-app>
    <div v-if="checkSession()">
      <v-app-bar app clipped-left dark>
        <v-icon large>mdi-heart-pulse</v-icon>
        <h2 class="ma-4">Health tracker</h2>
        <v-btn text fixed right @click="logout">LOGOUT</v-btn>
      </v-app-bar>

      <v-main>
        <v-container fluid class="pa-0" style="height: 90vh">
          <v-tabs vertical dark class="fill-height" v-model="activeTab">
            <v-tab v-for="item in menus" :key="item.title" class="justify-start" >
              <v-icon left>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-tab>
            <v-tab-item>This is dashboard</v-tab-item>
            <v-tab-item>
              <UserActivities></UserActivities>
            </v-tab-item>
            <v-tab-item>This is goals</v-tab-item>
          </v-tabs>
        </v-container>
      </v-main>
    </div>
    <WelcomeUser @login="onLogin" v-else></WelcomeUser>
  </v-app>
</template>

<script>
import WelcomeUser from './components/WelcomeUser';
import UserActivities from "@/components/UserActivities";

export default {
  name: 'App',
  components: {
    WelcomeUser,
    UserActivities
  },
  data: () => ({
    activeTab: 1,
    menus: [
      {title: 'Dashboard', icon: 'mdi-view-dashboard'},
      {title: 'Activities', icon: 'mdi-run'},
      {title: 'Goals', icon: 'mdi-bullseye-arrow'},
    ],
  }),
  mounted() {
    this.$axios.defaults.headers.common['Authorization'] = this.$session.get('auth')
  },
  methods: {
    checkSession() {
      return this.$session.exists()
    },
    logout() {
      this.$session.destroy()
      window.location.reload()
    },
    onLogin(data, auth) {
      this.$session.start()
      this.$session.set('user-id', data.id)
      this.$session.set('jwt', data.token)
      this.$session.set('auth', 'Basic ' + auth)
      window.location.reload()
    }
  }
};
</script>
