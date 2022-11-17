<template>
  <ul>
    <li v-if="prev > 0" @click="prePage()">
      <span>〈</span>
    </li>
    <li
      v-for="(page, index) in pageList"
      :key="index"
      :class="{ active: page === currentPage }"
      @click="movePage(page)"
    >
      <span>{{ page }}</span>
    </li>
    <li v-if="last < totalPage" @click="nextPage()"><span>〉</span></li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "Paginations",
  components: {},
})
export default class PaginationsVue extends Vue {
  @Prop() totalCount!: number;

  get limit(): number {
    return this.$store.state.options.limit;
  }
  set limit(value: number) {
    this.$store.state.options.limit = value;
  }
  get pageGroupCount(): number {
    return this.$store.state.options.pageGroupCount;
  }
  set pageGroupCount(value: number) {
    this.$store.state.options.pageGroupCount = value;
  }
  get currentPage(): number {
    return this.$store.state.options.currentPage;
  }
  set currentPage(value: number) {
    this.$store.state.options.currentPage = value;
  }

  //currentPage = 1;
  totalPage = 0;
  first = 0;
  last = 0;
  prev = 0;
  next = 0;
  start = 0;
  pageList: number[] = [];

  created(): void {
    this.movePage(1);
    this.pageResize();
  }
  mounted(): void {
    window.addEventListener("resize", this.pageResize);
  }
  beforeDestroy(): void {
    window.removeEventListener("resize", this.pageResize);
  }
  pageResize(): void {
    if (matchMedia("screen and (max-width: 638px)").matches) {
      this.pageGroupCount = 5;
      this.renderPagination(this.totalCount, this.currentPage);
    } else {
      this.pageGroupCount = 10;
      this.renderPagination(this.totalCount, this.currentPage);
    }
  }
  renderPagination(totalCount: number, currentPage: number): void {
    if (totalCount <= this.pageGroupCount) return;
    this.totalPage = Math.ceil(totalCount / this.limit);
    let pageGroup = Math.ceil(currentPage / this.pageGroupCount);
    this.currentPage = currentPage;
    this.last = pageGroup * this.pageGroupCount;
    if (this.last > this.totalPage) this.last = this.totalPage;
    this.first =
      this.last - (this.pageGroupCount - 1) <= 0
        ? 1
        : this.last - (this.pageGroupCount - 1);
    this.next = this.last + 1;
    this.prev = this.first - 1;
    this.pageList = [];
    for (let index = this.first; index <= this.last; index++) {
      this.pageList.push(index);
    }
  }

  movePage(page: number): void {
    this.renderPagination(this.totalCount, page);
    this.$emit("getPhotoList", page);
  }

  nextPage(): void {
    const last = this.last + 1;
    this.renderPagination(this.totalCount, last);
    this.$emit("getPhotoList", last);
  }

  prePage(): void {
    let first = this.first - this.pageGroupCount;
    if (first < 0) first = 1;
    this.renderPagination(this.totalCount, first);
    this.$emit("getPhotoList", first);
  }
}
</script>

<style scoped>
ul {
  align-items: center;
  display: inline-flex;
  list-style-type: none;
  justify-content: center;
  margin: 0;
  padding: 0;
  max-width: 100%;
  width: 100%;
}
li {
  align-items: center;
  display: flex;
  cursor: pointer;
}
span {
  border: none;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  background-color: #fff;
  border-color: #dee2e6;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  height: 32px;
  width: 32px;
  margin: 0.3rem 5px;
}
span:hover {
  background-color: #e9ecef;
  opacity: 0.7;
}
.active >>> span {
  background-color: teal;
  border-color: #dee2e6;
  color: white;
}
</style>
