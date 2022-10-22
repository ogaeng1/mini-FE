import React from "react";
import styled from "styled-components";
import PostComment from "./PostComment";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";

const PostBox = () => {
    return (
        <PostContainer>
          <PostCard>
            <PostHeader />
            <PostImage />
            <PostComment />
          </PostCard>
        </PostContainer>
    );
};


export default PostBox;

const PostContainer = styled.div`
  width: 100%;
  height: 70vh;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

`;

const PostCard = styled.div`
  width: 50%;
  height: 100%;
  border: 4px solid black;
  display: block;
  justify-content: center;
  padding: 10px;
`;