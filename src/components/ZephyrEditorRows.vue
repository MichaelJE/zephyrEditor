
<template>
  <div>
    <table>
      <tbody>
        <tr v-for="(key, value) in rows" :key="key">
          <td>{{ value }}</td>
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
