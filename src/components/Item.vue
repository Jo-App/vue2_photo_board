<template>
  <div
    :class="{ loaded: imageLoad, hoverNone: useModal }"
    class="item"
    :data-large="`${download_url}`"
    @click="openModal(id)"
  >
    <img
      v-show="imageLoad"
      :class="{ loaded: imageLoad }"
      :style="`width: ${wSize}px`"
      :src="`${download_url}`"
      @load="imageLoad = true"
    />
    <div class="loading-bar" v-show="!imageLoad">
      <Loading></Loading>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Loading from "./Layout/Loading.vue";

@Component({
  name: "Item",
  components: {
    Loading,
  },
})
export default class ItemVue extends Vue {
  @Prop() id!: number;
  @Prop() download_url!: number;
  @Prop() wSize!: number;
  @Prop() useModal!: boolean;

  imageLoad = false;

  openModal(id: number): void {
    this.$store.dispatch("getPhotoDetail", { id });
  }
}
</script>

<style scoped>
.item {
  border: 1px solid gray;
  text-align: center;
  line-height: 0;
  padding: 10px;
}
.item:hover {
  background-color: #e9ecef;
  opacity: 0.7;
}
.item img {
  opacity: 0;
  max-width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  transition: opacity 1s linear;
}
.loading-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
.item .loaded {
  opacity: 1;
}
.hoverNone {
  pointer-events: none;
}
</style>
