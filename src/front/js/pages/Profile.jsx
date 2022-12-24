import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const Profile = () => {
  const { store, actions } = useContext(Context);
  console.log(store.datos?.token);
  console.log(store.user);
  const { id } = useParams();

  useEffect(() => {
    actions.privateData(id);
  }, []);

  return (
    <div className="container">
      <h1 className="text-center">Profile</h1>
      <h1 className="text-center">Name: {store.user.name}</h1>
      <h1 className="text-center">Last Name: {store.user.last_name}</h1>
      <h1 className="text-center">Country: {store.user.country}</h1>
    </div>
  );
};

export default Profile;
