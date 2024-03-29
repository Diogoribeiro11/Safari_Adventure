import React from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Safari from "./pages/Safari.jsx";
import Camp from "./pages/Camp.jsx";
import Experience from "./pages/Experience.jsx";
import TravelPlan from "./pages/TravelPlan.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";

import Maasai from "./pages/Experience/Maasai.jsx";
import Sundowners from "./pages/Experience/Sundowners.jsx";
import BalloonSafari from "./pages/Experience/BalloonSafari.jsx";
import PhotoSafari from "./pages/Experience/PhotoSafari.jsx";

import Eat from "./pages/Camp/Eat.jsx";
import Sleep from "./pages/Camp/Sleep.jsx";
import Relax from "./pages/Camp/Relax.jsx";
import OtherServices from "./pages/Camp/OtherServices.jsx";

import CommunityProjects from "./pages/AboutUs/CommunityProjects.jsx";
import PhotoGallery from "./pages/AboutUs/PhotoGallery.jsx";

import Packages from "./pages/TravelPlaning/Packages.jsx";
import PackagesDetails from "./pages/TravelPlaning/PackagesDetails.jsx";

import PublicRoute from "./layout/PublicRoute";
import PrivateRoute from "./layout/PrivateRoute";

import Register from "./pages/LoginPages/register";
import Private from "./pages/LoginPages/private";
import Public from "./pages/LoginPages/public";
import Login from "./pages/LoginPages/login";
import Profile from "./pages/Profile.jsx";
import ProfileSettings from "./pages/ProfileSettings.jsx";

import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>           
            <Route element={<Home />} path="/" />
            <Route element={<Safari />} path="/Safari" />
            
            <Route element={<Camp />} path="/Camp" />
            <Route element={<Eat />} path="/Eat" />
            <Route element={<Sleep />} path="/Sleep" />
            <Route element={<Relax />} path="/Relax" />
            <Route element={<OtherServices />} path="/OtherServices" />

            <Route element={<Experience />} path="/Experience" />
            <Route element={<Maasai />} path="/Maasai" />
            <Route element={<Sundowners />} path="/Sundowners" />
            <Route element={<BalloonSafari />} path="/BalloonSafari" />
            <Route element={<PhotoSafari />} path="/PhotoSafari" />

            <Route element={<AboutUs />} path="/AboutUs" />
            <Route element={<CommunityProjects />} path="/CommunityProjects" />
            <Route element={<PhotoGallery />} path="/PhotoGallery" />

            <Route element={<TravelPlan />} path="/TravelPlan" />
            <Route element={<Packages />} path="/Packages" />
            <Route element={<PackagesDetails />} path="/PackagesDetails/:id" />

            <Route element={<Contact />} path="/Contact" />

            <Route element={<Login />} path="/login" />
			      <Route element={<Register />} path="/register" />
			      <Route element={<Public />} path="/public" />
            <Route element={<Profile />} path="/Profile" />
            <Route element={<ProfileSettings />} path="/ProfileSttings" />
            
            <Route exact path="/demo" element={<Demo />} />
            <Route exact path="/single/:id" element={<Single />} />


            <Route
              exact
              path="/private/:id"
              element={
                <PrivateRoute>
                  <Private />
                </PrivateRoute>
              }
            />
            {/* <Route>
							<h1>Not found!</h1>
						</Route> */}
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
