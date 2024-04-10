import { HttpUtil } from "../../utils/http-utils";
import { GET_ALL_DATABASE, GET_ALL_USERS, GET_SINGLE_USER_BY_ID, QUERY_EXECUTION_DATA, TOTAL_COUNT } from "../../utils/type";



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
export const GetAllDatabase = () => (dispatch) => {
    const url = `http://127.0.0.1:5000/query/GetAllDatabase`;
    return HttpUtil.makeGET(url, {}, {}).then(
      (res) => {
        console.log("res",res?.data?.payload)
        getDispatch(GET_ALL_DATABASE, res?.data?.result, dispatch);
        
      }
    );
};
export const GetQueryExecutionData = (e) => (dispatch) => {
    const url = `http://127.0.0.1:5000/query/ExecuteQuery`;
    return HttpUtil.makePOST(url,e, {}).then(
      (res) => {
        console.log("ExecuteQuery",res?.data)
        getDispatch(QUERY_EXECUTION_DATA, res?.data, dispatch);
        
      }
    );
};
export const CreateNewDatabase = (e) => () => {
    const url = `http://127.0.0.1:5000/query/createDatabase`;
    return HttpUtil.makePOST(url,e, {}).then(
      (res) => {
        console.log("createDatabase",res?.data)  
        return res?.data;
      }
    );
};


