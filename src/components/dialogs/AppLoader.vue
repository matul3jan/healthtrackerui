<template>
  <v-dialog :value="onlyIf" hide-overlay persistent width="300">
    <v-card dark>
      <v-card-text class="text-center pt-2">Preparing
        <v-progress-linear indeterminate color="white" class="mt-5"/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AppLoader",
  props: {
    onlyIf: Boolean
  }
}
</script>

<style scoped>

</style>