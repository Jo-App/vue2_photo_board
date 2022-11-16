<template>
  <div
    :class="{ show: modalShow }"
    class="modal-mask"
    @click="modalOpenClose($event)"
  >
    <div class="modal-container">
      <div v-show="modalShow">
        <div class="modal-header">
          <h4>photo</h4>
          <div class="close-btn" @click="modalOpenClose($event)">X</div>
        </div>
        <Item
          :id="modalItem.id"
          :download_url="modalItem.download_url"
          :wSize="800"
          :useModal="true"
        ></Item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Loading from "./Layout/Loading.vue";
import Item from "./Item.vue";

@Component({
  name: "Modal",
  components: {
    Loading,
    Item,
  },
})
export default class ModalVue extends Vue {
  get modalItem(): any {
    return this.$store.state.modal.item;
  }
  get modalShow(): boolean {
    return this.$store.state.modal.show;
  }

  modalOpenClose(e: any) {
    if (
      e.target.classList.contains("modal-mask") ||
      e.target.classList.contains("close-btn")
    ) {
      e.stopPropagation();
      this.$store.commit("modalOpenClose", { response: null });
    }
  }
}
</script>

<style scoped>
.show {
  visibility: visible !important;
  opacity: 1 !important;
}
.modal-mask {
  visibility: visible;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9998;
  visibility: hidden;
  opacity: 0;
  transition: all 0.5s;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.modal-container {
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  max-width: 90vh;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  color: white;
  background: teal;
  padding: 0 1%;
}
.close-btn {
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
}
.stop-scroll {
  height: 100%;
  overflow: hidden;
}
</style>
