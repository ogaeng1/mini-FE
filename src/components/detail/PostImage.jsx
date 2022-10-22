import React from "react";
import styled from "styled-components";

const PostImage = () => {
    return (
        <>
            <ImageContainer>
                사진
            </ImageContainer>
            <PostContentWrap>
                <LikeButton>
                    <button>💖</button>
                </LikeButton>
                <PostContent>
                    <p>내용이 들어갑니다</p>
                </PostContent>
            </PostContentWrap>
        </>
    );
};

export default PostImage;

const ImageContainer = styled.div`
    width: 100%;
    height: 300px;
    background-color: aliceblue;
    margin-top: 10px;
`;

const PostContentWrap = styled.div`
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border: 1px solid black;
    display: flex;
    align-items: center;
`;

const LikeButton = styled.div`
    width: 20px;
    height: 30px;
    button {
        font-size: 20px;
        border: none;
        background-color: transparent;
        cursor: pointer;
    }
`;

const PostContent = styled.div`
    font-size: 18px;
    margin-left: 25px;
`;