import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import { userActions } from "../../store";
import AuthForm from "./AuthForm";
import Loader from "../Loader";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[loader , setloader] = useState(false);

  const onResReceived = (data) => {
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId", data.id);
    setloader(false);
    navigate("/");
  };
  const getData = (data) => {
    setloader(true);
    console.log(data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <AuthForm onSubmit={getData} isAdmin={false} />
      {loader && 
    <Loader/>
    }
    </div>
  );
};

export default Auth;
