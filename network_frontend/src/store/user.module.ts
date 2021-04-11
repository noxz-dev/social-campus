import { User } from '../graphql/generated/types';
import { Commit } from 'vuex';

interface State {
  user: Partial<User>;
}

const state: State = {
  user: {},
};

const getters = {
  user: (state: State) => state.user,
};

const actions = {
  setUser({ commit }: { commit: Commit }, user: User) {
    commit('SET_USER', user);
  },
};

const mutations = {
  SET_USER(state: State, user: User) {
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
