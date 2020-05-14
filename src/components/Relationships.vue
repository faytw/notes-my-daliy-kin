<template>
  <v-row class="text-center">
    <v-col>
      <div>關係合盤</div>
    </v-col>
  </v-row>

</template>

<script>
import { 
  getWave 
} from '../helpers/moonCalender'
export default {
  name: 'relationships',
  data: () => ({
    wave: '',
    waveQuestionBoard: []// 波符 13 問
  }),
}
</script>