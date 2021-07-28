
<template>
  <div style="display: flex; pointer-events: none;">
    <span>{{ col }}</span>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ICell } from '../shared/types';

const tableModule = namespace('TableModule');

@Component
export default class ZephyrCell extends Vue {
  @Prop() private col: string;
  @Prop() private colId!: number;
  @Prop() private rowId!: number;

  @tableModule.Getter('getActiveCell') public activeCell!: ICell

  get isCellActive() {
    this.selected = this.activeCell &&
           this.activeCell.row === this.rowId &&
           this.activeCell.column === this.colId;

    return this.selected;
  }

  selected = false;
  current = false;
}
</script>
<style lang="scss" scoped>
.selected {
  border: 2px solid rgb(75, 137, 255);
  padding: 0;
  margin: 0;
}
</style>
