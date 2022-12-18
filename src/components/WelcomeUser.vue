<template>
  <div style="width: 30vw; margin: 2vh auto">
    <v-snackbar v-if="activeTab === 0" :timeout="1000" :value="loading" color="success" top>Successful login!
    </v-snackbar>
    <v-snackbar v-if="activeTab === 0" :timeout="2000" :value="wrong" color="error" top>Wrong credentials!</v-snackbar>
    <v-snackbar v-if="activeTab === 1" :timeout="1000" :value="loading" color="success" top>Successful registration!
    </v-snackbar>
    <v-tabs v-model="activeTab" icons-and-text grow>
      <v-tab v-for="i in tabs" :key="i.name">
        <v-icon large>{{ i.icon }}</v-icon>
        <div class="caption py-1">{{ i.name }}</div>
      </v-tab>
      <v-tab-item>
        <v-card>
          <v-card-text>
            <v-form ref="loginForm" v-model="validLogin" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field v-model="loginEmail" :rules="loginEmailRules" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="loginPassword" :append-icon="show1?'mdi-eye':'mdi-eye-off'"
                                :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'"
                                name="input-10-1" label="Password" hint="At least 8 characters" counter
                                @click:append="show1 = !show1"></v-text-field>
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
      </v-tab-item>
      <v-tab-item>
        <v-card>
          <v-card-text>
            <v-form ref="registerForm" v-model="validRegister" lazy-validation>
              <v-row>
                <v-col cols="6">
                  <v-text-field v-model="name" :rules="[rules.required]" label="Name" maxlength="20"
                                required></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-select v-model="gender" :rules="[rules.required]" :items="genders" label="Gender"
                            required></v-select>
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
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]" :type="show2 ? 'text' : 'password'"
                                name="input-10-1" label="Password" hint="At least 8 characters" counter
                                @click:append="show2 = !show2"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field block v-model="verify" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, passwordMatch]" :type="show2 ? 'text' : 'password'"
                                name="input-10-1" label="Confirm Password" counter
                                @click:append="show2 = !show2"></v-text-field>
                </v-col>
                <v-col class="d-flex ml-auto" cols="12" sm="12" xsm="12">
                  <v-btn :loading="loading" x-large block :disabled="!validRegister || loading" color="success"
                         @click="validateRegisterForm" type="submit">
                    Register
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>

export default {
  name: 'WelcomeUser',

  data: () => ({
    // Shared
    activeTab: 0,
    tabs: [
      {name: "Login", icon: "mdi-account"},
      {name: "Register", icon: "mdi-account-outline"}
    ],
    rules: {
      required: value => !!value || "Required.",
      min: v => (v && v.length >= 8) || "Min 8 characters"
    },

    // Login
    validLogin: true,
    show1: false,
    wrong: false,
    loginPassword: "",
    loginEmail: "",
    loginEmailRules: [
      v => !!v || "Required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],

    // Register
    validRegister: true,
    show2: false,
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
    genders: ['Male', 'Female']
  }),

  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },

  methods: {
    validateLoginForm() {
      if (this.$refs.loginForm.validate()) {
        this.$axios.post('api/users/check',
            {
              email: this.loginEmail, password: this.loginPassword, name: "", gender: "", age: "",
              height: 0, weight: 0
            })
            .then((response) => {
              this.$emit('login', response.data, btoa(this.loginEmail + ":" + this.loginPassword))
            })
            .catch(() => {
              this.wrong = true
              this.$refs.loginForm.reset()
              setTimeout(() => this.wrong = false, 2000)
            })
      }
    },
    validateRegisterForm() {
      if (this.$refs.registerForm.validate()) {
        this.loading = true
        this.$axios.post('api/users',
            {
              name: this.name, email: this.email, age: this.age, gender: this.gender.charAt(0),
              height: this.height, weight: this.weight, password: this.password
            })
            .then(() => this.activeTab = 0)
            .catch((e) => console.error(e))
            .finally(() => {
              this.loading = false
              this.$refs.registerForm.reset()
            })
      }
    }
  }
}
</script>
