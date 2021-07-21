<template>
  <div>
    <div style="height: 481px;">
      <zephyr-editor-table />
    </div>
    <hr />
    <div>
      <input type="file" @change="onUpload" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

import ZephyrEditorTable from './ZephyrEditorTable.vue';

import { ICSVRecord } from '.././shared/types';

const tableModule = namespace('TableModule');

@Component({
  components: {
    ZephyrEditorTable
  }
})
export default class ZephyrEditor extends Vue {
  @tableModule.Action('setData') public setData!: (csvData: ICSVRecord[]) => void

  data: ICSVRecord[] = [];
  headers = [
    { text: 'Description', type: 'string' },
    { text: 'hs6Code', type: 'string' },
    { text: 'Source Country', type: 'string' },
    { text: 'Destination Country', type: 'string' }
  ];

  // eslint-disable-next-line
  onUpload(e: any) {
    this.loadFile(e.target.files[0]);
  }

  // Load file in memory
  loadFile(file: Blob) {
    const fileStream = new FileReader();
    fileStream.readAsText(file);
    fileStream.onload = () => {
      const text = (fileStream.result) ? fileStream.result.toString() : '';
      this.parseCSVToJSON(text);
      this.setData(this.data);
    };
  }

  parseCSVToJSON(content: string) {
    const rows = content.split('\n');
    this.data = rows.reduce((a: ICSVRecord[], c: string, rowIndex: number) => {
      const colVals = c.split(',').map((item: string) => {
        return item;
      });
      const item = {
        row: rowIndex,
        data: colVals
      };
      a.push(item);
      return a;
    }, []);
  }
}
</script>
