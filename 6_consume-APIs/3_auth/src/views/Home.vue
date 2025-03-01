<template>
  <div class="text-center">
    <div v-if="!authentication">WELCOME TO MY WEBSITE</div>
    <div v-else>
      <v-row class="d-flex justify-center mt-3">
        <v-col cols="10" sm="8" md="6" lg="4">
          <v-card>
            <v-card color="#e67e22" theme="dark">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">
                    {{ user.name }}
                  </v-card-title>

                  <v-card-subtitle> {{ user.role }}</v-card-subtitle>

                  <v-card-actions>
                    <v-btn class="ml-2" variant="outlined" size="small">
                      DETAIL
                    </v-btn>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-img :src="user.avatar"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'HomeComponent',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['user', 'authentication']),
  },
});
</script>
