import { User } from 'src/graphql/generated/types';
import { Commit } from 'vuex';

const state = {
  user: {},
};

const getters = {
  user: (state) => state.user,
};

const actions = {
  setUser({ commit }: { commit: Commit }, user: User) {
    commit('SET_USER', user);
  },
};

const mutations = {
  SET_USER(state, user: User) {
    state.user = user;
  },
};

export const userData = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
