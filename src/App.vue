<template>
  <v-app>

    <v-dialog v-model="loading" hide-overlay persistent width="300">
      <v-card dark>
        <v-card-text class="text-center pt-2">Preparing the application
          <v-progress-linear indeterminate color="white" class="mt-5"/>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="saving" persistent width="300">
      <v-card dark>
        <v-card-text class="text-center pt-2">Saving
          <v-progress-linear indeterminate color="white" class="mt-5"/>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-app-bar v-if="!loading && checkSession()" app min-height="9vh">
      <v-icon large>mdi-heart-pulse</v-icon>
      <h2 class="ml-4 mt-2" style="font-family: fantasy">Health tracker</h2>
      <v-btn text fixed right @click="logout">
        Logout
        <v-icon class="ml-1" small>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main v-if="!loading && checkSession()">
      <v-container fluid class="pa-0 ma-0" style="height: 90vh">
        <v-tabs vertical class="fill-height" v-model="activeTab" dark style="opacity: 0.8"
                active-class="font-weight-bold" @change="onTabChange">
          <v-tab v-for="item in menus" :key="item.title" class="justify-start pl-6" style="width: 15vw;">
            <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-tab>
          <v-tab-item/>
          <v-tab-item>
            <UserActivities @loadingActivities="onLoading"/>
          </v-tab-item>
          <v-tab-item>
            <UserGoals ref="goals" @loadingGoals="onLoading"/>
          </v-tab-item>
        </v-tabs>
      </v-container>
    </v-main>

    <WelcomeUser @login="onLogin" v-if="!checkSession()"/>
  </v-app>
</template>

<script>
import WelcomeUser from './components/WelcomeUser';
import UserActivities from "@/components/UserActivities";
import UserGoals from "@/components/UserGoals";

export default {
  name: 'App',
  components: {
    WelcomeUser,
    UserActivities,
    UserGoals
  },
  data: () => ({
    activeTab: 0,
    loading: false,
    saving: false,
    menus: [
      {title: 'Dashboard', icon: 'mdi-view-dashboard'},
      {title: 'Activities', icon: 'mdi-run'},
      {title: 'Goals', icon: 'mdi-bullseye-arrow'}
    ],
  }),
  created() {
    this.setupStore()
  },
  methods: {
    checkSession() {
      return this.$session.exists()
    },
    async setupStore() {
      this.$axios.defaults.headers.common['Authorization'] = this.$session.get('auth')
      if (this.checkSession()) {
        this.loading = true
        await this.$actions.loadStore(this.$session.get('user-id'))
        this.loading = false
      }
    },
    logout() {
      this.$session.destroy()
      this.$forceUpdate()
    },
    async onLogin(data, auth) {
      this.loading = true
      this.$session.start()
      this.$session.set('user-id', data.id)
      this.$session.set('jwt', data.token)
      this.$session.set('auth', 'Basic ' + auth)
      await this.setupStore()
      this.loading = false
    },
    onTabChange() {
      if (this.$refs.goals) {
        this.$refs.goals.setupData()
      }
    },
    onLoading(val) {
      this.saving = val
    }
  }
};
</script>
