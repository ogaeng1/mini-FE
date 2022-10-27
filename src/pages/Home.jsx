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
    console.log(posts)
  }, [dispatch]);

  const { posts } = useSelector((state) => state.post);
  const onClickLikeHandler = (Id) => {
    dispatch(__likePost(Id));
  };

  return (
    <Layout>
      {posts.map((post) => (
        <Container key={post.postId}>
          <Box>
            <StBox>
              <UserName>{post.name}</UserName>
              <Title>{post.title}</Title>
            </StBox>
            <PhotoBox>
              <PhotoImg src={`${post.img}`}></PhotoImg>
            </PhotoBox>
            <LikeBox>
              좋아요
              {post.likeUsers.findIndex(
                (name) => name === sessionStorage.getItem("name")
              ) === -1 ? (
                <FcLikePlaceholder
                  onClick={() => onClickLikeHandler(post.postId)}
                />
              ) : (
                <FcLike onClick={() => onClickLikeHandler(post.postId)} />
              )}
              <span>{post.likeUsers.length}</span>
            </LikeBox>
            <Content>{post.content}</Content>
            <CommentNum>댓글 {post.commentNum} 개</CommentNum>
          </Box>
        </Container>
      ))}
    </Layout>
  );
};

export default Home;

const Container = styled.div`
  flex-direction: column;
  width: 450px;
  height: 600px;
  margin: 50px auto;
  border: 2px solid black;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px grey;
  box-sizing: border-box;
  cursor: pointer;
  background-color: white;
  align-items: center;
`;

const StBox = styled.div`
  height: 120px;
  box-sizing: border-box;
  /* border: 1px solid black; */
`;

const UserName = styled.div`
  width: 100%;
  font-size: 18px;
  /* border: 1px solid black; */
  box-sizing: border-box;
  margin-bottom: 10px;
`;

const Title = styled.div`
  /* width: 100%; */
  /* justify-content: center; */
  font-size: 18px;
  /* border: 1px solid black; */
  background-color: #dddbdb80;
  text-align: center;
  /* opacity: 0.5; */
`;

const Box = styled.div`
  height: 580px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  /* border: 1px solid black; */
  box-sizing: border-box;
`;

const PhotoBox = styled.div`
  box-shadow: 0px 0px 5px grey;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
`;

const PhotoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LikeBox = styled.div`
  width: 20%;
  height: 10px;
  /* border: 2px solid white; */
`;

const Content = styled.div`
  height: 150px;
  border: 1px solid black;
  padding: 3px;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 0 5px grey;
`;

const CommentNum = styled.div`
  height: 40px;
  width: 30%;
  margin-left: 5px;
  /* border: 0.5px solid black; */
`;
