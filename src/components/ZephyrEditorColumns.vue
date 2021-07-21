
<template>
  <div>
    <table>
      <tbody>
        <tr>
          <td
            v-for="(key, value) in cols"
            :key="key"
            style="border: 1px solid #ccc; width: 5%;"
          >
            <span>{{ value | alphaSignature }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ZephyrEditorColumns extends Vue {
  @Prop({ default: 0 }) cols!: number;
}
</script>
