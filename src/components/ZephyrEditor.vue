<template>
  <div>
    <ZephyrEditorTable />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ZephyrEditorTable from './ZephyrEditorTable.vue';

@Component({
  components: {
    ZephyrEditorTable
  }
})
export default class ZephyrEditor extends Vue {
  @Prop() private msg!: string;
}
</script>
