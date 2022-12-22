<template>
  <v-app-bar app min-height="9vh">
    <v-icon large>mdi-heart-pulse</v-icon>
    <h2 class="ml-4 mt-2" style="font-family: fantasy">Health tracker</h2>
    <v-btn text fixed right @click="$emit('logout')">
      Logout
      <v-icon class="ml-1" small>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>