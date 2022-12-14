import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import PostDetail from "../pages/PostDetail";
import WritePost from "../pages/WritePost";
import HomeScroll from "../pages/HomeScroll";
import Home from "../pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScroll />} />
        <Route path="/detail/:id" element={<PostDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/write" element={<WritePost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
