import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/home";
import MakingResume from "./pages/making-resume/making-resume";
import "./index.css";
import Layout from "./layouts/layout";
import ScrollTo from "./scrollto";
import ResumePreview from "./pages/resume/resume-preivew";
import UserProfile from "./pages/user/user-profile";
import NotFound from "./pages/not-found/not-found";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <ScrollTo/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="resume-making" element={<MakingResume />} />
          <Route path="/resume-making/preview" element={<ResumePreview />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
