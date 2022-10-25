
import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/global/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getPost, __likePost } from "../redux/modules/postSlice";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  const {posts} = useSelector((state) => state.post);
  
  const onClickLikeHandler = (Id) =>{
    dispatch(__likePost(Id))
  }

  return (
    <Layout>
      {posts.map((post) => (
        <Container
          key={post.postId}
          >
          <Box>
            <UserName>{post.name}</UserName>
            <PhotoBox>
              <PhotoImg src={`${post.img}`}></PhotoImg>
            </PhotoBox>
            <LikeBox>
              {post.likeUsers.findIndex(name => name===sessionStorage.getItem("name")) === -1 ?
              <FcLikePlaceholder onClick={()=>onClickLikeHandler(post.postId)}/>
              : <FcLike onClick={()=>onClickLikeHandler(post.postId)}/>}
              <span>{post.likeUsers.length}</span>
            </LikeBox>
            <Content>{post.content}</Content>
            <CommentNum>{post.commentNum}</CommentNum>
          </Box>
        </Container>
      ))}
    </Layout>
  );
};

export default Home;

const Container = styled.div`
  flex-direction: column;
  width: 500px;
  height: 700px;
  margin: 50px auto;
  border: 3px solid black;
  padding: 10px;
`;

const UserName = styled.div`
  width: 30%;
`;

const Box = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  border: 1px solid black;
`;

const PhotoBox = styled.div`
  border: 1px solid black;
  height: 600px;
  width: 100%;
  overflow: hidden;
`;

const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LikeBox = styled.div`
  width: 15%;
  height: 15px;

  border: 2px solid white;
`;

const Content = styled.div`
  height: 130px;
  border: 1px solid black;
  text-align: center;
  width: 100%;
`;

const CommentNum = styled.div`
  height: 40px;
  width: 30%;
  border: 2px solid black;
`;
