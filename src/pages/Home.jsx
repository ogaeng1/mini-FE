
import React, { useEffect } from "react";
import styled from "styled-components";
import Layout from "../components/global/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/postSlice";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);

  const post = useSelector((state) => state.post.post);

  return (
    <Layout>
      {post.map((post) => (
        <Container
          key={post.postId}
          onClick={() => {
            navigate(`/${post.id}`);
          }}>
          <Box>
            <UserName>{`/${post.name}`}</UserName>
            <PhotoBox>
              <PhotoImg>이미지</PhotoImg>
            </PhotoBox>
            <LikeBox>
              <Like>좋아요❤️</Like>
            </LikeBox>
            <Content>내용</Content>
            <CommentNum>댓글 갯수</CommentNum>
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
  height: 580px;
  margin: 50px auto;
  border: 3px solid black;
  padding: 10px;
`;

const UserName = styled.div`
  width: 30%;
`;

const Box = styled.div`
  height: 550px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  border: 1px solid black;
`;

const PhotoBox = styled.div`
  border: 1px solid black;
  height: 300px;
  width: 100%;
  overflow: hidden;
`;

const PhotoImg = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const LikeBox = styled.div`
  width: 15%;
  height: 15px;

  border: 2px solid white;
`;

const Like = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
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
