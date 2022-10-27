import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/global/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getDetailPost, __infiniteScroll, __likePost } from "../redux/modules/postSlice";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { useInView } from "react-intersection-observer"


const HomeScroll = () => {
  const [page, setPage] = useState(0)
  const [ref, inView] = useInView()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {posts, isLoading} = useSelector((state) => state.post);

  const getItems = useCallback(()=>{
    dispatch(__infiniteScroll(page))
    }, [page])

  useEffect(() => {
    getItems(page)
  }, [getItems])

  useEffect(() => {
    if (inView && !isLoading) {
      setPage(prevState => prevState + 1)
    }
  }, [inView, isLoading])
  
  const onClickLikeHandler = (id) =>{
    dispatch(__likePost(id))
  }
  const onClickDetailHandler = (id) =>{
    dispatch(__getDetailPost(id));
    navigate(`/detail/${id}`);
  }

  return (
    <Layout>
      {posts.map((post, idx) => (
        <Container key={post.postId}>
            {posts.length -1 === idx ?
            <Box ref={ref} >
            <StBox>
              <UserName>{post.name}</UserName>
              <Title>{post.title}</Title>
            </StBox>
            <PhotoBox onClick={()=> onClickDetailHandler(post.postId)}>
              <PhotoImg src={`${post.img}`} ></PhotoImg>
            </PhotoBox>
            <LikeBox>
              {post.likeUsers.findIndex(name => name===sessionStorage.getItem("name")) === -1 ?
              <FcLikePlaceholder onClick={()=>onClickLikeHandler(post.postId)}/>
              : <FcLike onClick={()=>onClickLikeHandler(post.postId)}/>}
              <span>{post.likeUsers.length}</span>
            </LikeBox>
            <Content>{post.content}</Content>
            <CommentNum>댓글${post.commentNum}개</CommentNum>
          </Box>
          :
          <Box>
            <StBox>
              <UserName>{post.name}</UserName>
              <Title>{post.title}</Title>
            </StBox>
            <PhotoBox onClick={()=> onClickDetailHandler(post.postId)}>
              <PhotoImg src={`${post.img}`}></PhotoImg>
            </PhotoBox>
            <LikeBox>
              {post.likeUsers.findIndex(name => name===sessionStorage.getItem("name")) === -1 ?
              <FcLikePlaceholder  onClick={()=>onClickLikeHandler(post.postId)}/>
              : <FcLike onClick={()=>onClickLikeHandler(post.postId)}/>}
              <span>{post.likeUsers.length}</span>
            </LikeBox>
            <Content>{post.content}</Content>
            <CommentNum>{post.commentNum}</CommentNum>
          </Box>
          }
        </Container>
      ))}
    </Layout>
  );
};

export default HomeScroll;

const Container = styled.div`
  flex-direction: column;
  width: 450px;
  height: 600px;
  margin: 20px auto;
  border: 2px  solid black;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 15px darkolivegreen;
  box-sizing: border-box;
  background-color: white;
  align-items: center;
`;
const StBox = styled.div`
  height: 120px;
  box-sizing: border-box;
`;
const UserName = styled.div`
  width: 30%;
  width: 100%;
  font-size: 18px;
  box-sizing: border-box;
  margin-bottom: 10px;
`;
const Title = styled.div`
  font-size: 18px;
  background-color: #dddbdb80;
  text-align: center;
`;
const Box = styled.div`
  height: 580px;
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  box-sizing: border-box;;
`;

const PhotoBox = styled.div`
cursor: pointer;
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
  cursor: pointer
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
`;


