
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
            <td v-for="(col, colKeys) in row.data" :key="colKeys" :ref="`col-${colKeys}`" style="width: 50px;">
              {{ col }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ICSVRecord, ITableGeometry } from '../shared/types';

const tableModule = namespace('TableModule');

@Component
export default class ZephyrEditorCells extends Vue {
  @Prop() private cols!: number;

  @Prop() private rows!: number;

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
        console.log(newVal);
        newVal.forEach((dataRow: ICSVRecord) => {
          // console.log(this.tableGeometry);
          const newRowHeight = (this.$refs[`row-${dataRow.row}`] as Vue & HTMLElement[])[0].getBoundingClientRect().height;
          this.tableGeometry.rowDictionary[dataRow.row] = newRowHeight;
          // this.tableGeometry.rowDictionary[dataRow.row].colDictionary = {};
          // console.log(this.tableGeometry);
        });
        newVal[0].data.forEach((_, key: number) => {
          const newColHeight = (this.$refs[`col-${key}`] as Vue & HTMLElement[])[0].getBoundingClientRect().width;
          this.tableGeometry.colDictionary[key] = newColHeight;
        });
        this.updateTableGeometry(this.tableGeometry);
      });
    }
  }
}
</script>
