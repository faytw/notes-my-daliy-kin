import {
  MUTATION_EXAMPLE_ONE,
  MUTATION_EXAMPLE_TWO,
} from './consistent';
  
export default {
  [MUTATION_EXAMPLE_ONE]: (state, payload) => {
    const { message } = payload
    state.exampleOne = message
  },
  [MUTATION_EXAMPLE_TWO]: (state, payload) => {
    state.exampleTwo = payload
  }
}