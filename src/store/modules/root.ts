/* eslint-disable max-classes-per-file */
import {
  Getters,
  Mutations,
  Actions,
  Module
} from 'vuex-smart-module';

import TableModule from './table';

class RootState {
}

class RootGetters extends Getters<RootState> {
}

class RootMutations extends Mutations<RootState> {
}

class RootActions extends Actions<
RootState,
RootGetters,
RootMutations,
RootActions
> {

}

const RootModule = new Module({
  state: RootState,
  getters: RootGetters,
  mutations: RootMutations,
  actions: RootActions,
  modules: {
    TableModule
  }
});

export default RootModule;
