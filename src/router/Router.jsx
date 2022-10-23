import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Post from "../pages/Post";
import PostDetail from "../pages/PostDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<PostDetail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/post" element={<Post/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;