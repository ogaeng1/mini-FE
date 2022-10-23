import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Post from "../pages/Post";
import PostDetail from "../pages/PostDetail";
import WritePost from "../pages/WritePost";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<PostDetail />} />
        <Route path="/login" element={<LoginPage />} />
<<<<<<< HEAD
        <Route path="/post" element={<Post/>}/>
=======
        <Route path="/write" element={<WritePost />} />
>>>>>>> help
      </Routes>
    </BrowserRouter>
  );
};

export default Router;