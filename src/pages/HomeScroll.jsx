import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/global/Layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __infiniteScroll, __likePost } from "../redux/modules/postSlice";
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
  
  const onClickLikeHandler = (Id) =>{
    dispatch(__likePost(Id))
  }

  return (
    <Layout>
      {posts.map((post, idx) => (
        <Container key={post.postId}>
            {posts.length -1 === idx ?
            <Box ref={ref}>
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
          :
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
          }
        </Container>
      ))}
    </Layout>
  );
};

export default HomeScroll;

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
