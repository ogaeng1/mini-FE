import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __deleteComment } from "../../redux/modules/postSlice";


import ShowInput from "./ShowInput.jsx";

const Comment = ({comment, postId}) => {
    const dispatch = useDispatch();
    const [showInput, setShowInput] = useState(false)
    const onDeleteButtonHandler = (id) => {
        dispatch(__deleteComment({postId,id}));
        }
       
    const onClick = () => {
        setShowInput(true)
    } 

    return(
    <StComment key={comment.commentId}>
        <StCommentName>{comment.writer}</StCommentName>
        <StCommentBody>{comment.content}
        <StButtons>
        {comment.correct ? <Stdiv>
            <ModifyButton2
            size="small"
            bgColor="#a6dbba"
            onClick={() => onClick(comment.id)}
            >
            수정
            </ModifyButton2>
            <DeleteButton2
            onClick={() =>onDeleteButtonHandler(comment.commentId)}
            size="small" 
            bgColor="#e4d60f"
            >
            삭제
            </DeleteButton2>
            </Stdiv>
                              : null}
        </StButtons>
        </StCommentBody>
        { showInput ? <ShowInput comment={comment} setShowInput={setShowInput} postId={postId} commentId={comment.commentId} /> : null }
        
    </StComment>
    )
}
export default Comment

const StComment = styled.div`
margin: 3px 0 3px 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
`
const StCommentName = styled.div`
    border: 1px solid black;
    margin: 5px;
    width: 100px;
`
const StCommentBody = styled.div`
    border: 1px solid black;    
    margin: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const StButtons = styled.div`
display: flex;
flex-direction: row;
justify-content: end;
align-items: center;
`
const ModifyButton2 = styled.button`
  font-size: 10px;
  width: 50px;
  height: 20px;
  background-color: green;
  border: none;
  border-radius: 15px;
  &:hover {
    filter: drop-shadow(5px 5px 5px #000);
  }
  cursor: pointer;
  display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const DeleteButton2 = styled.button`
  font-size: 10px;
  width: 50px;
  height: 20px;
  background-color: yellow;
  border: none;
  border-radius: 15px;
  &:hover {
    filter: drop-shadow(5px 5px 5px #000);
  }
  cursor: pointer;
  display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
const Stdiv = styled.div`
  width: 70%;
  display: flex;
  justify-content: right;
  padding: 2px;
  gap: 5px;
`