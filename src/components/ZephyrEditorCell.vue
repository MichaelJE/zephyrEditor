
<template>
  <div></div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ZephyrCell extends Vue {
  @Prop() private collId!: number;
  @Prop() private rowId!: number;
}
</script>
