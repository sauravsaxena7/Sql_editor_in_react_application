// import React from 'react'
import Button from "@mui/material/Button";
import UserDashBoard from "../pages/UserDashBoard";
import { useEffect, useState } from "react";
import OpenForAllPopUp from "../utils/OpenForAllPopup";
import UserForm from "./UserForm";
import { GetAllUsers, UpdateUserById, addUserAction, deleteUserById } from "../redux/actions/UserAction";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const userReducerr = useSelector((state) => state?.UserReducer);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    message: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    formType: "form",
  });
  const [Compnent, setComponent] = useState(null);
  const payloadChangeHandler = (name, value) => {
    setPayload({
      ...payload,
      [name]: value,
    });
  };

  const indexChangeHandler = async(e, popUpPayload, closeRef) => {
   
      const formData = new FormData();
      formData.append("name",payload?.name);
      formData.append("email",payload?.email);
      formData.append("role","user");
      formData.append("phone",payload?.phone)
      formData.append("password",payload?.password)
      formData.append("id",payload?.id)
      if(payload?.case==="NEW_USER"){
        await dispatch(addUserAction(formData))
      }else if(payload?.case==="UPDATE_USER"){
        await dispatch(UpdateUserById(formData))
      }else if(popUpPayload?.case==="DELETE_USER"){
       await dispatch(deleteUserById(popUpPayload?.id))
      }
     
      
      closeRef?.current?.click();
    

     await dispatch(GetAllUsers(userReducerr?.getCurrentPage, 10));
     
  };
  const[users,setUsers]=useState([])
  useEffect(() => {
    dispatch(GetAllUsers(userReducerr?.getCurrentPage, 10));
  }, [userReducerr?.getCurrentPage]);

  useEffect(()=>{
    setUsers(userReducerr?.getAllUsers)
  },[userReducerr?.getAllUsers])

  useEffect(()=>{
    if(payload?.case==="UPDATE_USER"){
      setPayload({
        ...payload,
        name:userReducerr?.getSingleUserById?.name,
        email:userReducerr?.getSingleUserById?.email,
        phone:userReducerr?.getSingleUserById?.phone,
        password:userReducerr?.getSingleUserById?.password,
        id:userReducerr?.getSingleUserById?.id
      })
    }
  },[userReducerr?.getSingleUserById])
  return (
    <div>
      <div
        className="mt-4"
        style={{
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          data-bs-toggle="modal"
          data-bs-target="#openForAll"
          onClick={() => {
            setComponent(() => UserForm);
            setPayload({
              ...payload,
              message: "Please Add New User.",
              formType: "form",
              case: "NEW_USER",
              name: "", phone: "", email: "", password: ""
            });
          }}
          variant="contained"
        >
          Add User
        </Button>
      </div>
      <UserDashBoard payload={payload} setPayload={setPayload} indexChangeHandler={indexChangeHandler} payloadChangeHandler={payloadChangeHandler} Compnent={Compnent} setComponent={setComponent} users={users}/>

      <OpenForAllPopUp
        indexChangeHandler={indexChangeHandler}
        Compnent={Compnent}
        payload={payload}
        payloadChangeHandler={payloadChangeHandler}
        setCompnent={setComponent}
      />
    </div>
  );
};

export default Home;
