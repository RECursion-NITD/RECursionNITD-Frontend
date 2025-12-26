import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import React, { useState, useEffect } from "react";
import useLoading from "../../hooks/useLoading";
import Loader from "../Loader";

const ResetPasswordSent = () => {
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const { token, resetUserPassword, loginUser, setStatus, status, registerUser } = useAuth();

  const { loading, setLoading } = useLoading();


  useEffect(() => {
    if (token) {
      setLoading(false);
      setStatus("typing");
    }
  }, [token, setLoading, setStatus]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {token && <Navigate to={from} />}
      <div className="flex flex-col items-center justify-center p-6 rounded-lg max-w-md mx-auto">
          <div className="flex flex-col items-center mb-4 justify-center">

            <h1 className="text-white text-[2em] font-bold mb-8">Weve emailed you instructions for setting your password, if an account exists with the email you entered.
    You should receive them shortly.</h1>

          </div>
      </div>
    </>
  );
};

export default ResetPasswordSent;
