import React from "react";
import styled from "styled-components";

const PostComment = () => {
    return (
        <>
            <PostCommentWrap>
                <CommentListWrap>
                    
                </CommentListWrap>
                <CommentInputForm>
                    <input type="text" />
                    <button>등록</button>
                </CommentInputForm>
            </PostCommentWrap>
        </>
    );
}

export default PostComment;

const PostCommentWrap = styled.div`
    width: 100%;
    height: 32%;
    margin-top: 10px;
`;

const CommentListWrap = styled.div`
    width: 100%;
    height: 80%;
`;

const PostCommentList = styled.div`
    width: 100%;
    height: 36px;
    margin-bottom: 5px;
    border: 1px solid black;
`;

const CommentInputForm = styled.form`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
        width: 520px;
        height: 30px;
        border: 1px solid black;
        border-radius: 15px;
        outline: none;
        font-size: 20px;
        padding: 0px 10px;

    }
    button {
        width: 50px;
        height: 35px;
        border: none;
        border-radius: 10px;

    }
`;