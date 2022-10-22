import React from "react";
import styled from "styled-components";

const PostHeader = () => {

    return (
        <PostHeaderBar>
            <PostWriter>작성자</PostWriter>
            <PostHeaderButtons>
                <ModifyButton>수정</ModifyButton>
                <DeleteButton>💣</DeleteButton>
            </PostHeaderButtons>
        </PostHeaderBar>
    );
}

export default PostHeader;

const PostHeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: gray
`;

const PostWriter = styled.div`
  font-size: 20px;
  color: black;
`;

const PostHeaderButtons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 150px;
  height: 50px;
`;

const ModifyButton = styled.button`
  font-size: 20px;
  width: 60px;
  height: 40px;
  background-color: green;
  border: none;
  border-radius: 15px;
  &:hover {
    filter: drop-shadow(5px 5px 5px #000);
  }
  cursor: pointer;
`;

const DeleteButton = styled.button`
  font-size: 20px;
  width: 60px;
  height: 40px;
  background-color: yellow;
  border: none;
  border-radius: 15px;
  &:hover {
    filter: drop-shadow(5px 5px 5px #000);
  }
  cursor: pointer;
`;