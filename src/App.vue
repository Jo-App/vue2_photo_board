<template>
  <div id="app">
    <List></List>
    <Modal></Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import List from "@/components/List.vue";
import Modal from "@/components/Modal.vue";

@Component({
  name: "App",
  components: {
    List,
    Modal,
  },
})
export default class AppVue extends Vue {
  get modalShow(): number {
    return this.$store.state.modal.show;
  }
}
</script>

<style>
body {
  margin: 0px;
}
.stop-scroll {
  height: 100%;
  overflow: hidden;
}
</style>
