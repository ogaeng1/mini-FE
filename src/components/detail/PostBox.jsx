import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { __getDetailPost, __likePost, __postComment } from "../../redux/modules/postSlice";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";


const PostBox = () => {
  const postId = useParams()
  const id = Number(postId.id)
  const {post} = useSelector(res=> res.post)
  const dispatch = useDispatch()
  const [content, setContent] = useState({
      content:""
});

useEffect(() => {
  dispatch(__getDetailPost(id));
}, [dispatch]);

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setContent({
        ...content, [name]:value,
    });
};
const onAddCommentHandler = (e) => {
  e.preventDefault()
  if(content.content.trim()==="" ){
      return alert("댓글을 모두 입력해주세요.");
  }        
  dispatch(__postComment({content, id}))
  setContent({
      comment:""
  });
};
const onClickLikeHandler = (id) =>{
  dispatch(__likePost(id))
}
    return (
        <PostContainer>
          <PostCard>
            <PostHeaderBar>
              <PostWriter>{post.name}</PostWriter>
              {post.correct ?
              <PostHeaderButtons>
                  <ModifyButton>수정</ModifyButton>
                  <DeleteButton>💣</DeleteButton>
              </PostHeaderButtons>
              : null}
            </PostHeaderBar>
            <>
              <ImageContainer src={`${post.img}`}/>
                <PostContentWrap>
                {post?.likeUsers?.findIndex(name => name===sessionStorage.getItem("name")) === -1 ?
              <FcLikePlaceholder onClick={()=>onClickLikeHandler(post.postId)}/>
              : <FcLike onClick={()=>onClickLikeHandler(post.postId)}/>}
              <span>{post.likeUsers?.length}</span>
                    {/* <LikeButton>
                        <button>💖</button>
                    </LikeButton> */}
                    <PostContent>
                        <p>{post?.content}</p>
                    </PostContent>
                </PostContentWrap>
            </>
            <>
              <PostCommentWrap>
                  <CommentListWrap>
                      {post.comments?.length === 0 ? null: post?.comments?.map((comment) =>{ 
                      return (
                          <div key={comment?.id}>
                              <div>{comment?.name}</div>
                              <div>{comment?.comment}</div>
                          </div>
                      )})}
                  </CommentListWrap>
                  <CommentInputForm onSubmit={onAddCommentHandler}>
                      <input type="text" name="content" value={content.content} onChange={onChangeHandler} />
                      <button>등록</button>
                  </CommentInputForm>
              </PostCommentWrap>
            </>
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

const ImageContainer = styled.img`
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