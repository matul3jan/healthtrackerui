<template>
  <v-app>

    <WelcomeScreen v-if="!checkSession()" @login="onLogin"/>

    <AppLoader :onlyIf="loading"/>

    <NavBar v-if="!loading && checkSession()" @logout="logout"/>

    <v-main v-if="!loading && checkSession()">
      <v-container fluid class="pa-0 ma-0" style="height: 90vh">
        <MainTabs :active-tab="activeTab"/>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
import WelcomeScreen from './components/user/WelcomeScreen'
import AppLoader from "@/components/dialogs/AppLoader"
import NavBar from "@/components/NavBar"
import MainTabs from "@/components/MainTabs"

export default {
  name: 'App',
  components: {
    MainTabs,
    NavBar,
    AppLoader,
    WelcomeScreen
  },
  data: () => ({
    activeTab: 0,
    loading: false
  }),
  created() {
    this.setupApplication()
  },
  methods: {
    checkSession() {
      return this.$actions.commonActions.checkSession()
    },
    async setupApplication() {
      this.$actions.commonActions.setAxiosDefaults()
      if (this.checkSession()) {
        this.loading = true
        await this.$actions.commonActions.loadStore()
        this.loading = false
      }
    },
    logout() {
      this.$actions.commonActions.destroySession()
      this.$forceUpdate()
    },
    async onLogin(user) {
      this.activeTab = 0
      this.loading = true
      this.$actions.commonActions.startSession(user)
      await this.setupApplication()
      this.loading = false
    }
  }
}
</script>
