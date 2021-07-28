/* eslint-disable max-classes-per-file */

import Vue from 'vue';

import {
  Getters,
  Mutations,
  Actions,
  Module
} from 'vuex-smart-module';

import {
  ICSVRecord,
  ITableGeometry,
  ICell
} from '@/shared/types';

class TableState {
  tableData: ICSVRecord[] = [];
  tableGeometry: ITableGeometry | null = null;
  selectedCells: ICSVRecord[] = [];
  activeCell: ICell | null = null;
}

class TableGetters extends Getters<TableState> {
  get getData() {
    return this.state.tableData;
  }

  get getTableGeometry() {
    return this.state.tableGeometry;
  }

  get getActiveCell() {
    return this.state.activeCell;
  }

  get getSelectedCells() {
    return this.state.selectedCells;
  }
}

class TableMutations extends Mutations<TableState> {
  UPDATE_DATA(data: ICSVRecord[]) {
    this.state.tableData = data;
  }

  UPDATE_CELL_DATA(payload: { row: number; column: number; content: string }) {
    Vue.set(this.state.tableData[payload.row].data, payload.column, payload.content);
  }

  UPDATE_TABLE_GEOMETRY(tableGeometry: ITableGeometry) {
    this.state.tableGeometry = null;
    Vue.set(this.state, 'tableGeometry', tableGeometry);
  }

  ADD_CELL_SELECTION(cell: ICSVRecord) {
    this.state.selectedCells.push(cell);
  }

  REMOVE_CELL_SELECTIONS() {
    this.state.selectedCells = [];
  }

  UPDATE_ACTIVE_CELL(cell: ICell) {
    this.state.activeCell = cell;
  }

  DEACTIVATE_ACTIVE_CELL() {
    this.state.activeCell = null;
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

  setCellData(payload: { row: number, column: number, content: string }) {
    console.log('state', payload.row, payload.column, payload.content);
    this.commit('UPDATE_CELL_DATA', payload);
  }

  updateTableGeometry(tableGeometry: ITableGeometry) {
    this.commit('UPDATE_TABLE_GEOMETRY', tableGeometry);
  }

  activateCell(cell: ICell) {
    this.commit('UPDATE_ACTIVE_CELL', cell);
  }

  deactivateCell() {
    this.commit('DEACTIVATE_ACTIVE_CELL');
  }

  addCellSelection(cell: ICSVRecord) {
    this.commit('ADD_CELL_SELECTION', cell);
  }

  removeCellSelections() {
    this.commit('REMOVE_CELL_SELECTIONS');
  }
}

const TableModule = new Module({
  state: TableState,
  getters: TableGetters,
  mutations: TableMutations,
  actions: TableActions
});

export default TableModule;
