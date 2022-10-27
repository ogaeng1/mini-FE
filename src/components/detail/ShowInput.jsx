import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __updateComment } from "../../redux/modules/postSlice";


const ShowInput = ({comment, setShowInput, postId, commentId}) => {
  const [newComment, setNewComment] = useState({
    "content":"" 
  })
  const dispatch = useDispatch();

  const onClick = () => {
    setShowInput(false)
  }
  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setNewComment({
        ...newComment, [name]:value,
    });
  };
  console.log(newComment, postId, commentId)

const onUpdateCommentHandler = (e) => {
    e.preventDefault()
    if(newComment.content.trim()=== ""){
        return alert("수정할 댓글 내용을 입력해주세요.");
    }        
    dispatch(__updateComment({newComment, postId, commentId}))

    setShowInput(false)
};
  return(
    <StComment>
      <StCommentName>{comment.writer}</StCommentName>
      <StCommentComment 
      onChange={onChangeHandler}
      value={newComment.content}
      name="content"
      />
      <StButtons>
          <ModifyButton2 size="small" bgColor="#a6dbba" onClick={onClick}>취소</ModifyButton2>
          <DeleteButton2 
          size="small" 
          bgColor="#e4d60f" 
          onClick={onUpdateCommentHandler}
          >
          완료
          </DeleteButton2>
      </StButtons>
    </StComment>
    )
  }

export default ShowInput;

const StComment = styled.div`
    padding: 0px;
    border: 1px solid black;
    background-color: gray;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    z-index: 5;
    position: absolute;
    width: 100%;
`

const StCommentName = styled.div`
    border: 1px solid black;
    margin: 5px;
    width: 100px;
`
const StCommentComment = styled.textarea`
  border: 1px solid black;
  margin: 5px;
  height: 20px;
`
const StButtons = styled.div`
  margin: 5px;
`
const ModifyButton2 = styled.button`
margin-right: 5px;
  font-size: 10px;
  width: 40px;
  height: 20px;
  background-color: green;
  border: none;
  border-radius: 15px;
  &:hover {
    filter: drop-shadow(5px 5px 5px #000);
  }
  cursor: pointer;
`;
const DeleteButton2 = styled.button`
  font-size: 10px;
  width: 40px;
  height: 20px;
  background-color: yellow;
  border: none;
  border-radius: 15px;
  &:hover {
    filter: drop-shadow(5px 5px 5px #000);
  }
  cursor: pointer;
`;