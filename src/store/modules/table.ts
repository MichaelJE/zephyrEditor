/* eslint-disable max-classes-per-file */

import {
  Getters,
  Mutations,
  Actions,
  Module
} from 'vuex-smart-module';

import { ICSVRecord, ITableGeometry } from '@/shared/types';

class TableState {
  tableData: ICSVRecord[] = [];
  tableGeometry: ITableGeometry | null = null;
}

class TableGetters extends Getters<TableState> {
  get getData() {
    return this.state.tableData;
  }

  get getTableGeometry() {
    return this.state.tableGeometry;
  }
}

class TableMutations extends Mutations<TableState> {
  UPDATE_DATA(data: ICSVRecord[]) {
    this.state.tableData = data;
  }

  UPDATE_TABLE_GEOMETRY(tableGeometry: ITableGeometry) {
    this.state.tableGeometry = tableGeometry;
  }
}

class TableActions extends Actions<
TableState,
TableGetters,
TableMutations,
TableActions
> {
  setData(data: ICSVRecord[]) {
    this.commit('UPDATE_DATA', data);
  }

  updateTableGeometry(tableGeometry: ITableGeometry) {
    this.commit('UPDATE_TABLE_GEOMETRY', tableGeometry);
  }
}

const TableModule = new Module({
  state: TableState,
  getters: TableGetters,
  mutations: TableMutations,
  actions: TableActions
});

export default TableModule;
