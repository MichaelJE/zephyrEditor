
<template>
  <div>
    <table>
      <tbody>
        <tr class="border: 1px solid #000;">
          <td>&nbsp;</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ZephyrEditorRows extends Vue {
  @Prop({ default: 0 }) private rows!: number;
  @Prop() private colId!: number;
}
</script>
