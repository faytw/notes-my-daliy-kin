<template>
  <v-row justify="center">
    <v-col>
       
    </v-col>
  </v-row>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'notebook',
  computed: {
    ...mapState('notes', [
      'infos'
    ]),
  },
  mounted() {
    this.getNotes()
  },
  methods: {
    ...mapActions('notes', {
      getNotes: 'GET_NOTES',
      createNotes: 'CREATE_NOTES',
    }),
  },
}
</script>