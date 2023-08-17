import React, { useEffect, useState, Suspense } from "react";
import Navbar from "./Components/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";

import NotFound from "./Components/Pages/NotFound";
import SignUp from "./Components/Pages/SignUp";
import Login from "./Components/Pages/Login";
import { HashLoader } from "react-spinners";
import Home from "./Components/Pages/Home/Home";
import ProtectedRoute from "./Components/Pages/ProtectedRoute";
import Profile from "./Components/Pages/Profile/Profile";
import Friends from "./Components/Pages/Friends/Friends";
const WithNav = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default function App() {
  return (
    <div className="Container">
      <Routes>
        <Route
          path="/signup"
          element={
            <Suspense fallback={<HashLoader color="#3693d6" />}>
              <SignUp />
            </Suspense>
          }
        />
        <Route path="/login" element={<Login />} />

        {/*  Routes with nav and Private*/}
        <Route element={<ProtectedRoute />}>
          <Route element={<WithNav />}>
            <Route
              path="*"
              element={
                <Suspense fallback={<HashLoader color="#3693d6" />}>
                  <NotFound />
                </Suspense>
              }
            />

            <Route
              path="/"
              element={
                <Suspense fallback={<HashLoader color="#3693d6" />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<HashLoader color="#3693d6" />}>
                  <Profile />
                </Suspense>
              }
            />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/friends" element={<Friends />} />
            <Route path="/msg" element={<Friends />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
