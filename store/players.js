import Vue from 'vue'

export const state = () => ({
  a: {
    character: undefined
  },
  b: {
    character: undefined
  }
});

export const mutations = {
  setPlayerCharacter(state, {
    player,
    character
  }) {
    let altKey = player == 'a' ? 'b' : 'a';
    let altChar = character == 'richie' ? 'steve' : 'richie';

    Vue.set(state[player], 'character', character);
    Vue.set(state[altKey], 'character', altChar);

  }
};
