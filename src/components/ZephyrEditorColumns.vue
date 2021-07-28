
<template>
  <div style="position: absolute; top: 0px; left: 0px; overflow: visible; width: 778px; height: 26px;">
    <table class="tableHolder" style="position: relative; width: 778px; height: 29px;">
      <thead>
        <tr>
          <th style="height: 25px; width: 50px;">
            <span>&nbsp;</span>
          </th>
          <th
            v-for="(key, value) in cols"
            :key="key"
            :style="`height: 25px; min-width: 50px; width: ${ cellWidth(value) }px;`"
            :ref="`current-col-${value}`"
          >
            <span>{{ value | alphaSignature }}</span>
          </th>
        </tr>
      </thead>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ITableGeometry } from '../shared/types';

const tableModule = namespace('TableModule');

@Component
export default class ZephyrEditorColumns extends Vue {
  @Prop({ default: 0 }) cols!: number;

  @tableModule.Getter('getTableGeometry') public getTableGeometry!: ITableGeometry

  columnWidth: number;

  @Watch('getTableGeometry', { deep: true })
  tableGeometry(newVal: ITableGeometry) {
    if (newVal) {
      for (let i = 0; i < this.cols; ++i) {
        const style = (this.$refs[`current-col-${i}`] as Vue & HTMLElement).style;
        if (this.$refs[`current-col-${i}`] && style) {
          (this.$refs[`current-col-${i}`] as Vue & HTMLElement).style.width = `${newVal.colDictionary[i] - 3}px`;
        }
      }
    }
  }

  cellWidth(id: number) {
    return (this.getTableGeometry) ? this.getTableGeometry.colDictionary[id] - 3 : null;
  }
}
</script>
