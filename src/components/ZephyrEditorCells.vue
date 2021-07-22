
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
              v-for="(col, colKeys) in row.data"
              :key="colKeys"
              :ref="`col-${colKeys}`"
              @mousedown="onSelect"
              style="width: 50px;"
            >
              <ZephyrEditorCell :col="col" />
              <!-- {{ col }} -->
            </td>
          </tr>
        </tbody>
      </table>
      <div ref="selection" style="z-index: 999; opacity:1; position:absolute; border: 2px solid rgb(75, 137, 255); padding: 0;">
        <div class="controller"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ICSVRecord, ITableGeometry } from '../shared/types';

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

  clicks = 0;

  @tableModule.Getter('getData') public getData!: () => ICSVRecord
  @tableModule.Action('updateTableGeometry') public updateTableGeometry!: (tableGeom: ITableGeometry) => void

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
  /* eslint-disable */
  onSelect(e: MouseEvent) {
    const geometry = (e.target as Vue & HTMLElement).getBoundingClientRect();
    // size
    (this.$refs.selection as Vue & HTMLElement).style.width = `${ geometry.width - 4 }px`;
    (this.$refs.selection as Vue & HTMLElement).style.height = `${ geometry.height - 4 }px`;

    // position
    (this.$refs.selection as Vue & HTMLElement).style.left = `${ geometry.x }px`;
    (this.$refs.selection as Vue & HTMLElement).style.top = `${ geometry.y }px`;

    this.registerDoubleClick(e);
  }

  registerDoubleClick(e: MouseEvent) {

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
  bottom: -5px;
  right: -5px;
}
</style>
