<template>
  <div class="hrrcn__zephyr">
    <zephyr-editor />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ZephyrEditor from './components/ZephyrEditor.vue';

@Component({
  components: {
    ZephyrEditor
  }
})
export default class App extends Vue {}
</script>
