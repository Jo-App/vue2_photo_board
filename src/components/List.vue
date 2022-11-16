<template>
  <div>
    <div class="title">
      <h3>photos</h3>
      <div>
        <select :value="limit" @change="setSelect($event)">
          <option
            v-for="(item, index) in selectList"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
    </div>
    <div class="wrapper">
      <div class="container">
        <Item
          v-for="item in resultList"
          :key="item.id"
          :id="item.id"
          :download_url="item.download_url"
          :wSize="200"
        ></Item>
      </div>
    </div>
    <Paginations
      class="paginations"
      :totalCount="1000"
      @getPhotoList="getPhotoList"
      ref="childPaginations"
    ></Paginations>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Item from "./Item.vue";
import Paginations from "./Paginations.vue";
import Modal from "./Modal.vue";

@Component({
  name: "List",
  components: {
    Item,
    Paginations,
    Modal,
  },
})
export default class ListVue extends Vue {
  get selectList(): number {
    return this.$store.state.options.selectList;
  }
  get limit(): number {
    return this.$store.state.options.limit;
  }
  set limit(value: number) {
    this.$store.state.options.limit = value;
  }
  get modalShow(): number {
    return this.$store.state.modal.show;
  }
  get currentPage(): number {
    return this.$store.state.options.currentPage;
  }
  set currentPage(value: number) {
    this.$store.state.options.currentPage = value;
  }

  resultList: object[] = [];

  $refs: any;

  created(): void {
    if (window.localStorage.getItem("limit")) {
      this.$store.commit("setLimit");
    }
  }

  async getPhotoList(page: number) {
    this.resultList = await this.$store.dispatch("getPhotoList", {
      page,
    });
  }

  setSelect(item: any) {
    this.limit = item.target.value;
    window.localStorage.setItem("limit", String(item.target.value));
    this.$refs.childPaginations.movePage(this.currentPage);
  }
}
</script>

<style scoped>
.title {
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: space-between;
  padding: 0 5%;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  color: white;
  background: teal;
  z-index: 1;
}
.wrapper {
  position: relative;
  left: 50%;
  transform: translate(-50%);
  width: 90%;
  padding: 5px;
}
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 15px;
}
.paginations {
  position: sticky;
  bottom: 0;
  left: 0;
  background: white;
  height: 45px;
}
</style>
