<template>
  <v-card :height="isProfile ? '90vh' : null">
    <v-snackbar :value="loading" color="success" top app>Successful!</v-snackbar>
    <v-card-text>
      <v-form ref="registerForm" v-model="valid" lazy-validation>
        <v-row justify="space-around">
          <v-col cols="6">
            <v-text-field v-model="name" :rules="[rules.required]" label="Name" maxlength="20"
                          required/>
          </v-col>
          <v-col cols="4">
            <v-select v-model="gender" :rules="[rules.required]" :items="genders" label="Gender"
                      required/>
          </v-col>
          <v-col cols="2">
            <v-text-field v-model="age" :rules="[rules.required]" label="Age" type="number" required/>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="height" :rules="[rules.required]" label="Height (cm)" type="number" required/>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="weight" :rules="[rules.required]" label="Weight (kg)" type="number" required/>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required/>
          </v-col>
          <v-col cols="12" v-if="!isProfile">
            <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, rules.min]" :type="show ? 'text' : 'password'"
                          name="input-10-1" label="Password" hint="At least 8 characters" counter
                          @click:append="show = !show" autocomplete="new-password"/>
          </v-col>
          <v-col cols="12" v-if="!isProfile">
            <v-text-field block v-model="verify" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                          :rules="[rules.required, passwordMatch]" :type="show ? 'text' : 'password'"
                          name="input-10-1" label="Confirm Password" counter
                          @click:append="show = !show"/>
          </v-col>
          <v-col :cols="isProfile ? 3 : 12" class="d-flex justify-center">
            <v-btn :loading="loading" x-large block :disabled="!valid || loading || (isProfile && anyChanges())"
                   color="success"
                   @click="validateRegisterForm">
              {{ isProfile ? "Save" : "Register" }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios"

export default {
  name: "UserRegister",
  props: {
    isProfile: Boolean
  },
  mounted() {
    if (this.isProfile) {
      this.name = this.user.name
      this.gender = this.user.gender === "M" ? "Male" : "Female"
      this.age = this.user.age
      this.height = this.user.height
      this.weight = this.user.weight
      this.email = this.user.email
      this.password = this.user.password
    }
  },
  data: () => ({
    valid: true,
    show: false,
    loading: false,
    name: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
    email: "",
    password: "",
    verify: "",
    emailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    },
    genders: ['Male', 'Female']
  }),
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match"
    },
    user() {
      return this.$actions.userActions.getUser()
    }
  },
  methods: {
    anyChanges() {
      const user = this.$actions.userActions.getUser()
      return this.name === user.name &&
          this.email === user.email &&
          +this.age === +user.age &&
          this.gender.charAt(0) === user.gender &&
          +this.height === +user.height &&
          +this.weight === +user.weight
    },
    async validateRegisterForm() {
      if (this.$refs.registerForm.validate()) {
        this.loading = true
        const body = {
          name: this.name, email: this.email, age: this.age, gender: this.gender.charAt(0),
          height: this.height, weight: this.weight, password: this.password
        }
        if (this.isProfile) {
          body.id = this.user.id
          await this.$actions.userActions.updateUser(body)
        } else {
          await axios.post('api/users', body)
          this.$refs.registerForm.reset()
          this.$emit('registered')
        }
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>