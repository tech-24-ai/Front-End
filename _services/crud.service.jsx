import { apiConfig } from "./config";
import { authHeader, apiUrl, store } from "../_helpers";
import { alertActions, userActions, loaderActions } from "../_actions";


export const crudService = {
  _get,
  _getAll,
  _create,
  _update,
  _delete,
  _download,
  _downloadWithPost,
  _upload
};
const { dispatch } = store;

function _get(type, id) {
  return apiConfig.get(`/${type}/${id}`);
}
function _getAll(type, filterData) {
  dispatch(loaderActions.show());
  return apiConfig.get(`/${type}`, { params: filterData });
}
function _create(type, data) {
  return apiConfig.post(`/${type}`, data);
}
function _update(type, id, data) {
  return apiConfig.put(`/${type}/${id}`, data);
}
function _delete(type, id) {
  return apiConfig.delete(`/${type}/${id}`);
}
function _upload(type, file) {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  return apiConfig.post(type, formData, config);
}

function _download(type) {
  return apiConfig.get(`/${type}`,
  {
    responseType: "blob",
  });
}
function _downloadWithPost(type, body) {
  return apiConfig.post(`/${type}`, body, {
    responseType: "blob",
  });
}
