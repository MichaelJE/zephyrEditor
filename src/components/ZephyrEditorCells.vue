
<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ZephyrEditorCells extends Vue {
  @Prop() private colId!: number;
}
</script>
