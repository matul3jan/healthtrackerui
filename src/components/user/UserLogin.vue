<template>
  <v-card>
    <v-snackbar :timeout="2000" :value="wrong" color="error" top>Wrong credentials!</v-snackbar>
    <v-card-text>
      <v-form ref="loginForm" v-model="validLogin" lazy-validation>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required/>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="loginPassword" :append-icon="show1?'mdi-eye':'mdi-eye-off'"
                          :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                          name="input-10-1" label="Password" hint="At least 8 characters" counter
                          @click:append="show1 = !show1"/>
          </v-col>
          <v-col class="d-flex" cols="12" sm="12" xsm="12">
            <v-btn :loading="loading" x-large block :disabled="!validLogin || loading" color="success"
                   @click="validateLoginForm">Login
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "UserLogin",
  data: () => ({
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    },
    loading: false,
    validLogin: true,
    show1: false,
    wrong: false,
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
    validateLoginForm() {
      if (this.$refs.loginForm.validate()) {
        this.$axios.post('api/users/check', {
          email: this.loginEmail, password: this.loginPassword, name: "", gender: "", age: "",
          height: 0, weight: 0
        }).then(response => {
          this.$emit('login', response.data)
        }).catch(() => {
          this.wrong = true
          this.$refs.loginForm.reset()
          setTimeout(() => this.wrong = false, 2000)
        })
      }
    }
  }
}
</script>

<style scoped>

</style>