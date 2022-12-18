<template>
  <v-app>
    <div v-if="checkSession()">
      <v-app-bar app>
        Health tracker
        <v-btn text fixed right @click="logout">LOGOUT</v-btn>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <!-- <router-view></router-view> -->
        </v-container>
      </v-main>
    </div>
    <WelcomeUser @login="onLogin" v-else></WelcomeUser>
  </v-app>
</template>

<script>
import WelcomeUser from './components/WelcomeUser';

export default {
  name: 'App',
  components: {
    WelcomeUser,
  },
  data: () => ({}),
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
    onLogin(token, auth) {
      this.$session.start()
      this.$session.set('jwt', token)
      this.$session.set('auth', 'Basic ' + auth)
      window.location.reload()
    }
  }
};
</script>
