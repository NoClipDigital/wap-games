import Vue from 'vue'

export const state = () => ({
  a: {
    character: undefined
  },
  b: {
    character: 'Richie'
  }
});

export const mutations = {
  setPlayerCharacter(state, {
    player,
    character
  }) {
    Vue.set(state[player], 'character', character);
  }
};
