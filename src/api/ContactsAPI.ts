import axios from "axios";
const API_URL = "https://picsum.photos/";

export default {
  async getPhotoList(page: any, limit: any): Promise<object> {
    const url = API_URL + "v2/list?page=" + page + "&limit=" + limit;
    const res = await axios.get(url, {});
    return res.data;
  },
  async getPhotoDetail(id: any): Promise<any> {
    const url = API_URL + "id/" + id + "/info";
    const res = await axios.get(url, {});
    return res.data;
  },
};
