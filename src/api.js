/* eslint-disable no-useless-constructor */
import axios from "axios";
const API_URL = "http://localhost:8000";
export default class CallApi {
  constructor() {}
  getCourses() {
    const url = `${API_URL}/courses/list`;
    return axios
      .get(url)
      .then(res => res.data)
      .catch(err => console.log(err));
  }
  getNotes(pk) {
    const url = `${API_URL}/courses/list/${pk}`;
    return axios.get(url).then(res => res.data);
  }
  createNote(note) {
    const url = `${API_URL}/courses/new/`;
    return axios
      .post(url, note, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .catch(err => console.log(err));
  }
}
