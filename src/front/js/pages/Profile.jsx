import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/profile.css";

const Profile = () => {
  const { store, actions } = useContext(Context);
  console.log(store.body?.token);
  console.log(store.user);
  const { id } = useParams();

  useEffect(() => {
    actions.privateData(id);
  }, []);

  return (
    <div>
      <h1 className="text-center">Profile</h1>
      <h1 className="text-center">Name: {store.user.name}</h1>
      <h1 className="text-center">Last Name: {store.user.last_name}</h1>
      <h1 className="text-center">Country: {store.user.country}</h1>

      <div>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
          rel="stylesheet"
        />
        <div className="main-content">
          {/* -----------------------------------Header---------------------------------------------------------------- */}

          <div
            className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
            style={{
              minHeight: "600px",
              backgroundImage:
                "url(https://upload.wikimedia.org/wikipedia/commons/5/57/Maasai_Mara_National_Reserve_Kenya.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          >
            {/* Mask */}
            <span className="mask bg-gradient-default opacity-8" />
            {/* Header container */}
            <div className="container-fluid d-flex align-items-center">
              <div className="row">
                <div className="col-lg-7 col-md-10">
                  <h1 className="display-2 text-white">
                    Hello {store.user.name}
                  </h1>
                  <p className="text-white mt-0 mb-5">
                    This is your profile page. You can see the progress you've
                    made with your work and manage your projects or assigned
                    tasks
                  </p>
                  <a href="#!" className="btn btn-info">
                    Edit profile
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/*---------------------------------------------------- Profile content--------------------------------------------------- */}

          <div className="container-fluid mt--7">
            <div className="row">
              <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div className="card card-profile shadow">
                  <div className="row justify-content-center">
                    <div className="col-lg-3 order-lg-2">
                      <div className="card-profile-image">
                        <a href="#">
                          <img
                            src="https://thumbs.dreamstime.com/z/male-tourist-glasses-hat-icon-simple-flat-design-illustration-74079657.jpg"
                            className="rounded-circle"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                      <a href="#" className="btn btn-sm btn-info mr-4">
                        Connect
                      </a>
                      <a
                        href="#"
                        className="btn btn-sm btn-default float-right"
                      >
                        Message
                      </a>
                    </div>
                  </div>
                  <div className="card-body pt-0 pt-md-4">
                    <div className="row">
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span className="heading">22</span>
                            <span className="description">Favorites</span>
                          </div>
                          <div>
                            <span className="heading">10</span>
                            <span className="description">Photos</span>
                          </div>
                          <div>
                            <span className="heading">89</span>
                            <span className="description">Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3>
                        {store.user.name}
                        {store.user.last_name}
                        <span className="font-weight-light">, 27</span>
                      </h3>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        {store.user.country}
                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        Solution Manager - Creative Tim Officer
                      </div>
                      <div>
                        <i className="ni education_hat mr-2" />
                        University of Computer Science
                      </div>
                      {/* <hr className="my-4" />
                      <p>Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music.</p>
                      <a href="#">Show more</a> */}
                    </div>
                  </div>
                </div>
              </div>

              {/*---------------------------------------------------- Favorites content--------------------------------------------------- */}

              <div className="col-xl-8 order-xl-1">
                <div className="card bg-secondary shadow">
                  <div className="card-header bg-white border-0">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h3 className="mb-0">My favorites</h3>
                      </div>
                      <div className="col-4 text-right">
                        <a href="#!" className="btn btn-sm btn-primary">
                          Settings
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="card-body"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="row align-items-center justify-content-xl-between">
            <div className="col-xl-6 m-auto text-center"></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Profile;
