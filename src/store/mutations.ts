import { MutationTree } from "vuex";
import { State } from "./state";

const mutation: MutationTree<State> = {
  modalOpenClose: (state: State, payload: any): void => {
    state.modal.show = !state.modal.show;
    if (state.modal.show === true) {
      state.modal.item = payload.response;
      document.body.classList.add("stop-scroll");
    } else {
      state.modal.item = {};
      document.body.classList.remove("stop-scroll");
    }
  },
  setLimit: (state: State, payload: any): void => {
    state.options.limit = Number(window.localStorage.getItem("limit"));
  },
};

export default mutation;
