<template>
  <div>
    <zephyr-editor-spreader />
    <!-- Table headers -->
    <zephyr-editor-columns :cols="cols" />
    <!-- Table rows -->
    <zephyr-editor-rows :rows="rows" />
    <!-- Table cells -->
    <zephyr-editor-cells :rows="rows" :cols="cols" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { ICSVRecord } from '.././shared/types';

import ZephyrEditorRows from './ZephyrEditorRows.vue';
import ZephyrEditorColumns from './ZephyrEditorColumns.vue';
import ZephyrEditorCells from './ZephyrEditorCells.vue';
import ZephyrEditorSpreader from './ZephyrEditorSpreader.vue';

const tableModule = namespace('TableModule');

@Component({
  components: {
    ZephyrEditorColumns,
    ZephyrEditorRows,
    ZephyrEditorCells,
    ZephyrEditorSpreader
  }
})
export default class ZephyrEditorTable extends Vue {
  @tableModule.Getter('getData') public getData!: (csvData: ICSVRecord[]) => void

  cols = 4;
  rows = 4;
}
</script>
