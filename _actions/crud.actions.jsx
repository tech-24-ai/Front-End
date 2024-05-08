import { crudConstants } from "../_constants";
import { crudService } from "../_services";
import { alertActions } from "./alert.actions";
import { userActions } from "./user.actions";
import { loaderActions } from "./loader.actions";
import fileDownload from "js-file-download";

export const crudActions = {
  _getAll,
  _get,
  _create,
  _update,
  _delete,
  _clear,
  _download,
  _downloadWithPost,
  _playVideo,
};

function _clear(kind) {
  return { type: `${kind}.${crudConstants.CLEAR}` };
}

function _get(kind, url, id) {
  return (dispatch) => {
    dispatch(request());
    dispatch(loaderActions.show());
    crudService._get(url, id).then(
      (result) => {
        dispatch(loaderActions.hide());
        dispatch(success(result.data));
      },
      (error) => {
        dispatch(loaderActions.hide());
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.GET_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.GET_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.GET_FAILURE}`, error };
  }
}

function _getAll(kind, url, filterData) {
  return (dispatch) => {
    dispatch(request());
    dispatch(loaderActions.show());
    crudService._getAll(url, filterData).then(
      (result) => {
        dispatch(loaderActions.hide());
        if ((result.status = 200)) {
          if (result.data) {
            dispatch(success(result.data));
          }
        }
      },
      (error) => {
        dispatch(loaderActions.hide());
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.GET_ALL_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.GET_ALL_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.GET_ALL_FAILURE}`, error };
  }
}

function _create(kind, url, data, showSucess = false) {
  return (dispatch) => {
    dispatch(request());
    dispatch(loaderActions.show());
    crudService._create(url, data).then(
      (result) => {
        if (result.status == 200) {
          dispatch(loaderActions.hide());
          if (showSucess) {
            dispatch(alertActions.success(result.data.message));
          }
          dispatch(success(result.data.data));
        }
      },
      (error) => {
        dispatch(loaderActions.hide());
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.CREATE_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.CREATE_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.CREATE_FAILURE}`, error };
  }
}

function _update(kind, url, id, data, showSucess = false) {
  return (dispatch) => {
    dispatch(request());
    dispatch(loaderActions.show());
    crudService._update(url, id, data).then(
      (result) => {
        dispatch(loaderActions.hide());
        if (showSucess) {
          dispatch(alertActions.success(result.data.message));
        }
        dispatch(success(result.data));
      },
      (error) => {
        dispatch(loaderActions.hide());
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.UPDATE_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.UPDATE_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.UPDATE_FAILURE}`, error };
  }
}

function _delete(kind, url, id) {
  return (dispatch) => {
    dispatch(request());
    dispatch(loaderActions.show());
    crudService._delete(url, id).then(
      (result) => {
        dispatch(loaderActions.hide());
        dispatch(alertActions.success(result.data.message));
        dispatch(success(result.data.data));
      },
      (error) => {
        dispatch(loaderActions.hide());
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.DELETE_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.DELETE_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.DELETE_FAILURE}`, error };
  }
}

function _download(id, extension, customURL) {
  let type = "INVOICE";
  let kind = "Invoice";
  let url = `document?document_id=${id}`;
  return (dispatch) => {
    dispatch(request());
    dispatch(loaderActions.show());

    crudService._download(customURL || url).then(
      (result) => {
        dispatch(loaderActions.hide());
        if ((result.status = 200)) {
          if (result.data) {
            fileDownload(result.data, `${extension}`);
          }
        }
      },
      (error) => {
        dispatch(loaderActions.hide());
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.GET_ALL_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.GET_ALL_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.GET_ALL_FAILURE}`, error };
  }
}

function _downloadWithPost(url, id, extension, type = "EUINVOICE") {
  let kind = "Invoice";
  let body = {
    id,
    type,
  };
  return (dispatch) => {
    dispatch(request());
    dispatch(loaderActions.show());

    crudService._downloadWithPost(url, body).then(
      (result) => {
        dispatch(loaderActions.hide());
        if ((result.status = 200)) {
          if (result.data) {
            fileDownload(result.data, `${extension}`);
          }
        }
      },
      (error) => {
        dispatch(loaderActions.hide());
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.GET_ALL_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.GET_ALL_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.GET_ALL_FAILURE}`, error };
  }
}

function _playVideo(id) {
  let type = "INVOICE";
  let kind = "Video";
  let url = `document?document_id=${id}`;
  return (dispatch) => {
    dispatch(request());
    dispatch(loaderActions.show());

    crudService._getAll(url).then(
      (result) => {
        dispatch(loaderActions.hide());
        if ((result.status = 200)) {
          if (result.data) {
            dispatch(
              userActions.toggleLoginPopup(true, {
                message: "Play Video",
                BtnText: null,
                isVideo: true,
                videoLink: result.data,
              })
            );
          }
        }
      },
      (error) => {
        dispatch(loaderActions.hide());
        dispatch(failure(error.message));
        dispatch(alertActions.error(error.message));
      }
    );
  };

  function request() {
    return { type: `${kind}.${crudConstants.GET_ALL_REQUEST}` };
  }
  function success(data) {
    return { type: `${kind}.${crudConstants.GET_ALL_SUCCESS}`, data };
  }
  function failure(error) {
    return { type: `${kind}.${crudConstants.GET_ALL_FAILURE}`, error };
  }
}
