import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { adminActions } from "../../store";
import AuthForm from "./AuthForm";
import toast from "react-hot-toast";
import Loader from "../Loader";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[loader , setloader] = useState(false);

  const onResReceived = (data) => {
    console.log('main data', data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    toast.success('logged  in successfully');
    setloader(false);
    navigate("/");
  };
  const getData = (data) => {
    setloader(true);
    console.log("Admin", data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={true} />
      {loader && 
    <Loader/>
    }
    </div>
  );
};

export default Admin;
