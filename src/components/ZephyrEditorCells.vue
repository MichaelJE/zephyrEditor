
<template>
  <div style="position: absolute; height: 487px; overflow: hidden; left: 0; top: 0; width: 778px;">
    <div style="position: relative; height: 487px; width: 778px; top: 0px; left: 0px;">
      <table class="tableHolder" style="height: 487px; width: 778px; z-index: 1;">
        <thead>
          <tr>
            <th style="height: 25px; width: 50px;">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowKeys) in getData" :key="rowKeys" :ref="`row-${rowKeys}`">
            <!-- Might be a separate component -->
            <th style="width: 50px;">&nbsp;</th>
            <td
              v-for="(col, colKey) in row.data"
              :key="colKey"
              :ref="`col-${colKey}`"
              @mousedown.prevent="onSelect($event, row.row, colKey)"
              @mousemove.prevent="onDrag($event, row.row, colKey)"
              @mouseup.prevent="onMouseUp"
              style="min-width: 50px;"
            >
              <ZephyrEditorCell :col="col" :colId="colKey" :rowId="row.row" />
              <!-- {{ col }} -->
            </td>
          </tr>
        </tbody>
      </table>
      <div ref="selection-top" style="z-index: 999; opacity:1; position:absolute; background-color: rgb(75, 137, 255); padding: 0;"></div>
      <div ref="selection-bottom" style="z-index: 999; opacity:1; position:absolute; background-color: rgb(75, 137, 255); padding: 0;"></div>
      <div ref="selection-left" style="z-index: 999; opacity:1; position:absolute; background-color: rgb(75, 137, 255); padding: 0;"></div>
      <div ref="selection-right" style="z-index: 999; opacity:1; position:absolute; background-color: rgb(75, 137, 255); padding: 0;"></div>
      <div ref="selection-controller" class="controller"></div>
      <textarea
        v-model="selectedContent"
        @keydown="onCellInterract"
        ref="form-input"
        style="display: grid;position: absolute; z-index: 998; padding: 0px 0px 0px 1px; margin: 0; font-size: 13px; font-family: Roboto, Helvetica, Arial, sans-serif; border: none; min-width: 50px; max-width: 500px; resize: none; outline: 0; overflow-y: visible;"
      ></textarea>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ICell, ICSVRecord, ITableGeometry } from '../shared/types';

import ZephyrEditorCell from './ZephyrEditorCell.vue';

const tableModule = namespace('TableModule');

@Component({
  components: {
    ZephyrEditorCell
  }
})
export default class ZephyrEditorCells extends Vue {
  @Prop() private cols!: number;

  @Prop() private rows!: number;

  clickTimeout: number;
  clicks = 0;

  selectedContent = '';
  mouseDownActive = false;

  currentlyActiveNode: HTMLElement;

  // App State
  @tableModule.Getter('getData') public getData!: () => ICSVRecord
  @tableModule.Getter('getActiveCell') public getActiveCell!: ICell

  @tableModule.Action('updateTableGeometry') public updateTableGeometry!: (tableGeom: ITableGeometry) => void
  @tableModule.Action('activateCell') public activateCell!: (cell: ICell) => void
  @tableModule.Action('setCellData') public setCellData!: (payload: { row: number; column: number; content: string; }) => void

  tableGeometry: ITableGeometry = {
    rowDictionary: {},
    colDictionary: {}
  };

  @Watch('$store.state.TableModule.tableData', { deep: true, immediate: true })
  dataUpdated(newVal: ICSVRecord[]) {
    if (newVal && newVal.length) {
      this.$nextTick(() => {
        // can be improved in the future
        newVal.forEach((dataRow: ICSVRecord) => {
          const newRowHeight = (this.$refs[`row-${dataRow.row}`] as Vue & HTMLElement[])[0].getBoundingClientRect().height;
          this.tableGeometry.rowDictionary[dataRow.row] = newRowHeight;
        });

        newVal[0].data.forEach((_, key: number) => {
          const newColHeight = (this.$refs[`col-${key}`] as Vue & HTMLElement[])[0].getBoundingClientRect().width;
          this.tableGeometry.colDictionary[key] = newColHeight;
        });
        this.updateTableGeometry(this.tableGeometry);
      });
    }
  }

  deactivateTextArea() {
    (this.$refs['form-input'] as Vue & HTMLElement).blur();
    (this.$refs['form-input'] as Vue & HTMLElement).style.display = 'none';
  }

  activateTextArea(e: MouseEvent, row: number, column: number) {
    this.selectedContent = this.getData[this.getActiveCell.row].data[this.getActiveCell.column];
    const geometry = (e.target as Vue & HTMLElement).getBoundingClientRect();

    (this.$refs['form-input'] as Vue & HTMLElement).style.width = `${geometry.width - 3}px`;
    (this.$refs['form-input'] as Vue & HTMLElement).style.height = `${geometry.height}px`;
    (this.$refs['form-input'] as Vue & HTMLElement).style.lineHeight = `${geometry.height - 4}px`;

    (this.$refs['form-input'] as Vue & HTMLElement).style.left = `${geometry.x}px`;
    (this.$refs['form-input'] as Vue & HTMLElement).style.top = `${geometry.y}px`;
    (this.$refs['form-input'] as Vue & HTMLElement).style.display = '';
    (this.$refs['form-input'] as Vue & HTMLElement).focus();
  }

  onCellInterract(e: KeyboardEvent) {
    switch (e.keyCode) {
      case 13:
        // Enter - Submit the new value straight to the selected active cell
        this.submitTableData();
        this.placeMarker(this.currentlyActiveNode.getBoundingClientRect());
    }
  }

  submitTableData() {
    this.setCellData({ row: this.getActiveCell.row, column: this.getActiveCell.column, content: this.selectedContent });
    this.deactivateTextArea();
  }

  placeMarker(geometry: DOMRect) {
    // size
    (this.$refs['selection-top'] as Vue & HTMLElement).style.width = `${geometry.width - 3}px`;
    (this.$refs['selection-top'] as Vue & HTMLElement).style.height = '2px';

    // position
    (this.$refs['selection-top'] as Vue & HTMLElement).style.left = `${geometry.x}px`;
    (this.$refs['selection-top'] as Vue & HTMLElement).style.top = `${geometry.y}px`;

    // size
    (this.$refs['selection-right'] as Vue & HTMLElement).style.width = '2px';
    (this.$refs['selection-right'] as Vue & HTMLElement).style.height = `${geometry.height - 3}px`;

    // position
    (this.$refs['selection-right'] as Vue & HTMLElement).style.left = `${geometry.x + geometry.width - 3}px`;
    (this.$refs['selection-right'] as Vue & HTMLElement).style.top = `${geometry.y}px`;

    // size
    (this.$refs['selection-bottom'] as Vue & HTMLElement).style.width = `${geometry.width - 3}px`;
    (this.$refs['selection-bottom'] as Vue & HTMLElement).style.height = '2px';

    // position
    (this.$refs['selection-bottom'] as Vue & HTMLElement).style.left = `${geometry.x}px`;
    (this.$refs['selection-bottom'] as Vue & HTMLElement).style.top = `${geometry.y + geometry.height - 3}px`;

    // size
    (this.$refs['selection-left'] as Vue & HTMLElement).style.width = '2px';
    (this.$refs['selection-left'] as Vue & HTMLElement).style.height = `${geometry.height - 3}px`;

    // position
    (this.$refs['selection-left'] as Vue & HTMLElement).style.left = `${geometry.x}px`;
    (this.$refs['selection-left'] as Vue & HTMLElement).style.top = `${geometry.y}px`;

    (this.$refs['selection-controller'] as Vue & HTMLElement).style.left = `${geometry.x + geometry.width - 6}px`;
    (this.$refs['selection-controller'] as Vue & HTMLElement).style.top = `${geometry.y + geometry.height - 6}px`;
  }

  /* eslint-disable */
  onSelect(e: MouseEvent, rowId: number, colId: number) {
    this.mouseDownActive = true;
    const geometry = (e.target as Vue & HTMLElement).getBoundingClientRect();
    this.currentlyActiveNode = (e.target as Vue & HTMLElement);
    this.placeMarker(geometry);
    this.registerDoubleClick(e, rowId, colId);
  }

  onDrag(e: MouseEvent, rowId: number, colId: number) {
    if (!this.mouseDownActive) return;
  }

  onMouseUp() {
    this.mouseDownActive = false;
  }

  registerDoubleClick(e: MouseEvent, row: number, column: number) {
    let timeout: number;
    ++this.clicks;
    if (this.clicks === 1) {
      this.deactivateTextArea();
      this.clickTimeout = setTimeout(() => {
        this.clicks = 0;
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
      }, 700);
    } else {
      this.activateCell({ row, column });
      this.activateTextArea(e, row, column);
      this.clicks = 0;
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    }
  }
  /* eslint-enable */
}
</script>
<style lang="scss" scoped>
.controller {
  width: 6px;
  height: 6px;
  border: 1px solid #fff;
  background-color: rgb(75, 137, 255);
  position: absolute;
  z-index: 999;
}
</style>
