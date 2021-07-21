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
import { Component, Prop, Vue } from 'vue-property-decorator';

import ZephyrEditorRows from './ZephyrEditorRows.vue';
import ZephyrEditorColumns from './ZephyrEditorColumns.vue';
import ZephyrEditorCells from './ZephyrEditorCells.vue';
import ZephyrEditorSpreader from './ZephyrEditorSpreader.vue';

@Component({
  components: {
    ZephyrEditorColumns,
    ZephyrEditorRows,
    ZephyrEditorCells,
    ZephyrEditorSpreader
  }
})
export default class ZephyrEditorTable extends Vue {
  @Prop() private msg!: string;
  cols = 60;
  rows = 10;
}
</script>
