<template>
  <v-data-table :headers="headers" :items="activities" sort-desc sort-by="started" class="elevation-1"
                disable-pagination :loading="loadingActivities" loading-text="Loading activities" hide-default-footer
                height="80vh" fixed-header>
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer/>
        <v-dialog v-model="dialog" max-width="30vw">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" dark>
              <v-icon>mdi-plus</v-icon>
              Add
            </v-btn>
          </template>
          <v-card class="pa-0 ma-0">
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text class="pa-1">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.description" label="Description"/>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="editedItem.duration" label="Duration (minutes)" type="number"/>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="editedItem.calories" label="Calories burned" type="number"/>
                  </v-col>
                  <v-col cols="12">
                    <v-date-picker full-width show-current no-title v-model="editedItem.started"/>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="30vw">
          <v-card>
            <v-card-title class="text-subtitle-1 justify-center">Are you sure you want to delete this activity?
            </v-card-title>
            <v-card-actions>
              <v-spacer/>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer/>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>No activities</template>
  </v-data-table>
</template>

<script>

export default {
  name: "UserActivities",
  data: () => ({
    loadingActivities: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: 'Description', value: 'description'},
      {text: 'Duration (minutes)', value: 'duration'},
      {text: 'Calories burned', value: 'calories'},
      {text: 'Date', value: 'started'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    activities: [],
    editedIndex: -1,
    editedItem: {
      calories: 0,
      description: "",
      duration: 0,
      started: new Date().toISOString().split("T")[0]
    },
    defaultItem: {
      calories: 0,
      description: "",
      duration: 0,
      started: new Date().toISOString().split("T")[0]
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Activity' : 'Edit Activity'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    loadingActivities(val) {
      this.$emit('onLoading', val)
    }
  },

  created() {
    this.activities = this.$actions.getActivities()
  },

  updated() {
    this.activities = this.$actions.getActivities()
  },

  methods: {

    editItem(item) {
      this.editedIndex = this.activities.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.activities.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.loadingActivities = true
      this.closeDelete()
      await this.$axios.delete("api/activities/" + this.activities[this.editedIndex].id)
      await this.$actions.reloadActivities()
      await this.$actions.reloadGoals()
      this.loadingActivities = false
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      this.loadingActivities = true
      this.close()
      let body = {
        userId: this.$session.get('user').id, description: this.editedItem.description,
        duration: this.editedItem.duration, started: new Date(this.editedItem.started).toISOString(),
        calories: this.editedItem.calories
      }
      if (this.editedIndex > -1) {
        await this.$axios.patch("api/activities/" + this.activities[this.editedIndex].id, body)
      } else {
        await this.$axios.post("api/activities", body)
      }
      await this.$actions.reloadActivities()
      await this.$actions.reloadGoals()
      this.loadingActivities = false
    }
  }
}
</script>

<style scoped>

</style>