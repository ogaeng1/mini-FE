import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getPost } from "../../redux/modules/postSlice";

const Feed = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    return (
        <FeedContainer>
            <FeedWrap>
                <span>작성자</span>
                <p>제목</p>
                <ImageBox>
                    <PostImage />
                </ImageBox>
                <p>내용</p>
                <PostState>
                    <span>💖</span>
                    <span>댓글</span>
                </PostState>
            </FeedWrap>
        </FeedContainer>
    );
}

export default Feed;

const FeedContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: aquamarine;
    margin-top: 100px;
`;

const FeedWrap = styled.div`
    width: 20%;
    height: 500px;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 10px;
    p {
        margin-top: 10px;
    }
`;

const ImageBox = styled.div`
    width: 100%;
    height: 70%;
`;

const PostImage = styled.img`
    width: 100%;
    height: 100%;
`;

const PostState = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    span:last-child {
        margin-left: 25px;
    }
`;