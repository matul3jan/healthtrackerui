<template>
  <v-data-table :headers="headers" :items="goals" sort-desc sort-by="started" class="elevation-1"
                disable-pagination :loading="loadingGoals" loading-text="Loading goals" hide-default-footer
                height="80vh" fixed-header>
    <template v-slot:top>
      <v-toolbar flat>
        <v-spacer/>
        <v-dialog v-model="dialog" max-width="30vw" on>
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
                    <v-select :items="activities" label="Select Activity" item-text="description" item-value="id"
                              v-model="editedItem.activityId" :disabled="editedIndex >= 0"/>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="editedItem.target" label="Target in minutes" type="number"/>
                    <v-subheader class="pl-0">Achieved</v-subheader>
                  </v-col>
                  <v-col cols="12">

                    <v-slider min="0" height="50" :max="editedItem.target || 0" v-model="editedItem.current"
                              thumb-label="always"/>
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
            <v-card-title class="text-subtitle-1 justify-center">
              Are you sure you want to delete this goal?
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
    <template v-slot:[`item.activityId`]="{ item }">
      {{ activityName(item.activityId) }}
    </template>
    <template v-slot:[`item.target`]="{ item }">
      {{ item.target + " " + item.unit }}
    </template>
    <template v-slot:[`item.current`]="{ item }">
      <v-progress-linear :background-opacity="0.2" :buffer-value="100" :height="25" :width="150"
                         :value="item.percent" color="green"
      ><strong>{{ item.percent }}%</strong></v-progress-linear>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>No goals</template>
  </v-data-table>
</template>

<script>
export default {
  name: "UserGoals",
  data: () => ({
    loadingGoals: false,
    dialog: false,
    dialogDelete: false,
    headers: [
      {text: 'Activity', value: 'activityId'},
      {text: 'Target', value: 'target'},
      {text: 'Progress', value: 'current'},
      {text: 'Actions', value: 'actions', sortable: false},
    ],
    editedIndex: -1,
    editedItem: {
      target: null,
      current: 0,
      unit: "minutes",
      activityId: 0
    },
    defaultItem: {
      target: null,
      current: 0,
      unit: "minutes",
      activityId: 0
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Goal' : 'Edit Goal'
    },
    goals() {
      return this.$actions.goalActions.getGoals()
    },
    activities() {
      return this.$actions.activityActions.getActivities()
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
    loadingGoals(val) {
      this.$emit('onLoading', val)
    }
  },

  methods: {

    activityName(id) {
      const activity = this.$actions.activityActions.getActivities().find(a => a.id === id)
      return activity ? activity.description : ""
    },

    editItem(item) {
      this.editedIndex = this.goals.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.goals.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      this.loadingGoals = true
      this.closeDelete()
      await this.$actions.goalActions.deleteGoal(this.goals[this.editedIndex])
      this.loadingGoals = false
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
      this.loadingGoals = true
      this.close()
      const body = {
        target: this.editedItem.target,
        current: this.editedItem.current,
        unit: this.editedItem.unit,
        activityId: this.editedItem.activityId
      }
      if (this.editedIndex > -1) {
        await this.$actions.goalActions.updateGoal(this.goals[this.editedIndex], body)
      } else {
        await this.$actions.goalActions.addGoal(body)
      }
      this.loadingGoals = false
    }
  }
}
</script>

<style scoped>

</style>