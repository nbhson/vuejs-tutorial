<template>
  <v-row class="d-flex justify-center mt-3">
    <v-col cols="10" sm="8" md="6" lg="4">
      <v-card>
        <v-card-title>Sign in</v-card-title>
        <v-app>
          <v-form @submit.prevent="submit" ref="entryForm" lazy-validation>
            <v-card-text>
              <v-text-field
                v-model.trim="data.userName"
                :rules="[rules.required]"
                label="User Name"
                counter
                variant="outlined"
                clearable
                clear-icon="mdi-delete"
                color="secondary"
                required
              ></v-text-field>

              <v-text-field
                v-model.trim="data.name"
                :rules="[rules.required]"
                label="Your name"
                counter
                variant="outlined"
                clearable
                clear-icon="mdi-delete"
                color="secondary"
                required
              ></v-text-field>

              <v-text-field
                v-model.trim="data.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="show1 ? 'text' : 'password'"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
                variant="outlined"
                clearable
                clear-icon="mdi-delete"
                color="secondary"
                required
              ></v-text-field>

              <v-card-actions>
                <v-btn
                  variant="contained-text"
                  color="warning"
                  type="submit"
                  >Resgister</v-btn
                >
              </v-card-actions>
            </v-card-text>
          </v-form>
        </v-app>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'RegisterComponent',
  data() {
    return {
      router: this.$router,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v.length >= 8 || 'Min 8 characters',
      },
    };
  },
  setup() {
    const data = reactive({
      userName: '',
      password: '',
      name: '',
    });
    const router = useRouter();
    const submit = () => {
      axios
        .post('http://localhost:3000/auth/register', data)
        .then(function (response) {
          if (response.statusText === 'OK' && response.data) {
            router.push('/login');
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return {
      data,
      submit,
    };
  },
});
</script>
