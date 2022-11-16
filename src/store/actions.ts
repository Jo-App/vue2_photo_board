import { ActionTree } from "vuex";
import { State } from "./state";
import ContactAPI from "@/api/ContactsAPI";

const action: ActionTree<State, any> = {
  async getPhotoList(store: any, payload: any): Promise<any> {
    const page = payload.page;
    const limit = store.state.options.limit;
    const response = await ContactAPI.getPhotoList(page, limit);
    return response;
  },
  async getPhotoDetail(store: any, payload: any): Promise<void> {
    const id = payload.id;
    const response = await ContactAPI.getPhotoDetail(id);
    await store.commit("modalOpenClose", { response });
  },
};

export default action;
