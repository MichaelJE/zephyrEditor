import Vue from 'vue';
import * as Vuex from 'vuex';

import { createStore } from 'vuex-smart-module';

import RootModule from './modules/root';

Vue.use(Vuex);

const store = createStore(
  RootModule,
  {
    strict: process.env.NODE_ENV !== 'production'
  }
);

export default store;
