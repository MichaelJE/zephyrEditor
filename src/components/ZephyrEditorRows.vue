
<template>
  <div style="position: absolute; top: 0px; left: 0px; overflow: visible; height: 487px; min-width: 50px; z-index: 3;">
    <table class="tableHolder" style="position: relative; height: 487px; width: 53px;">
      <thead>
        <tr>
          <th style="height: 25px;"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(key, value) in rows" :key="key">
          <th :style="`width: 50px; height: ${cellHeight(value)}px;`">{{ (value + 1) }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ITableGeometry } from '../shared/types';

const tableModule = namespace('TableModule');

@Component
export default class ZephyrEditorRows extends Vue {
  @Prop({ default: 0 }) private rows!: number;
  @Prop() private colId!: number;

  rowWidth: number;

  @tableModule.Getter('getTableGeometry') public getTableGeometry: ITableGeometry

  @Watch('getTableGeometry')
  tableGeometry(newVal: ITableGeometry) {
    console.log(newVal);
  }

  cellHeight(id: number) {
    return (this.getTableGeometry) ? this.getTableGeometry.rowDictionary[id] - 3 : 25;
  }
}
</script>
