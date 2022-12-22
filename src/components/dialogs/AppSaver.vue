<template>
  <v-dialog :value="onlyIf" persistent width="300">
    <v-card dark>
      <v-card-text class="text-center pt-2">Saving
        <v-progress-linear indeterminate color="white" class="mt-5"/>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AppSaver",
  props: {
    onlyIf: Boolean
  }
}
</script>

<style scoped>

</style>