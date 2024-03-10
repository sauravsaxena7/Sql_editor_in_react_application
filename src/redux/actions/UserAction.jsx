import { HttpUtil } from "../../utils/http-utils";
import { GET_ALL_USERS, GET_SINGLE_USER_BY_ID, TOTAL_COUNT } from "../../utils/type";



export const getDispatch = (type, res, dispatch) => {
    dispatch({
      type: type,
      payload: res,
    });
};

export const GetAllUsers = (page,rowsPerPage) => (dispatch) => {
    const url = `http://127.0.0.1:5000/user/GetAllUser/limit/${rowsPerPage}/pageNumber/${page}`;
    return HttpUtil.makeGET(url, {}, {}).then(
      (res) => {
        console.log("res",res?.data?.payload)
        getDispatch(GET_ALL_USERS, res?.data?.payload, dispatch);
        getDispatch(TOTAL_COUNT, res?.data?.totalCount, dispatch);
      }
    );
};
export const GetSingleUserById = (id) => (dispatch) => {
    const url = `http://127.0.0.1:5000/user/getSingleUserById/${id}`;
    return HttpUtil.makeGET(url, {}, {}).then(
      (res) => {
        console.log("res",res?.data?.payload)
        getDispatch(GET_SINGLE_USER_BY_ID, res?.data?.user, dispatch);
        
      }
    );
};
export const deleteUserById = (id) => (dispatch) => {
    const url = `http://127.0.0.1:5000/user/deleteUser/${id}`;
    return HttpUtil.makeDELETE(url, {}, {}).then(
      (res) => {
        console.log("res",res?.data?.payload)
      }
    );
};


export const addUserAction = (e) => (dispatch) => {
 
  const url = `http://127.0.0.1:5000/user/newUser`;
  return HttpUtil.makePOST(url, e, {}).then(
    (res) => {
      console.log("add new user res",res)
    }
  );
};
export const UpdateUserById = (e) => (dispatch) => {
  const url = `http://127.0.0.1:5000/user/UpdateUserById`;
  return HttpUtil.makePUT(url, e, {}).then(
    (res) => {
      console.log("http://127.0.0.1:5000/user/UpdateUserById",res)
    }
  );
};