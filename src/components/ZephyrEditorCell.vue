
<template>
  <div style="display: flex; pointer-events: none;" :class="{ 'selected': (selected) }">
    <div style="display: none;"><textarea style="width: 134px; height: 23px; font-size: 13px; font-family: Roboto, Helvetica, Arial, sans-serif; min-width: 134px; max-width: 491px; resize: none; overflow-y: visible;"></textarea></div>
    <span>{{ col }}</span>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ZephyrCell extends Vue {
  @Prop() private col: string;
  @Prop() private collId!: number;
  @Prop() private rowId!: number;

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
