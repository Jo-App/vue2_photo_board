export interface State {
  options: Options;
  modal: Modal;
}
export interface Modal {
  show: boolean;
  item: object;
}
export interface Options {
  currentPage: number;
  pageGroupCount: number;
  selectList: object;
  limit: number;
}

const state: State = {
  options: {
    currentPage: 1,
    pageGroupCount: 10,
    selectList: [10, 30, 50, 80, 100],
    limit: 10,
  },
  modal: {
    show: false,
    item: {},
  },
};

export default state;
