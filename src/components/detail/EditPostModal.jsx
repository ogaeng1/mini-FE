import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { __editPost } from "../../redux/modules/postSlice";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
new Blob([JSON.stringify()], { type: "application/json" });

const EditPostModal = ({ show, onHide, setShow }) => {
  const {id} = useParams();
  const postId = Number(id)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialState = {
    title: "",
    content: "",
  };

  const [editDetail, setEditDetail] = useState(initialState);

  const post = useSelector((state) => state.detail.posts)
  
  const inputBody = (e) => {
    const { name, value } = e.target;
    setEditDetail({ ...editDetail, [name]: value});
  };

  const onSubmitHandler = (event) => {
    if (editDetail.content === "" && editDetail.title === "") {
      event.preventDefault();
      alert("제목이나 내용 둘다 비어있을 수 없습니다.");
    } else {
      event.preventDefault();

      let formData = new FormData();
      formData.append("postUpdateRequestDto", new Blob([JSON.stringify(editDetail)], { type: "application/json" }));

      dispatch(__editPost({formData, postId}));
      setEditDetail(initialState);

      alert("수정 완료 !");
      setShow(false);
      navigate(`/`)
    }
};


  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalContainer>
        <ModalBox enctype="multipart/form-data" onSubmit={onSubmitHandler}>
          <input name="title" value={editDetail?.title}  type="text" placeholder="제목 뭘로 바꿀거임?" onChange={inputBody}></input>
          <div className="imgBox">
            <PrevImg src={post.img} />
          </div>
          <textarea
            name="content"
            value={editDetail.content}
            type="text"
            placeholder="내용 뭘로 바꿀거임?"
            onChange={inputBody}
          />
          <FooterButtonWrap>
            <ModifyDone>수정하기</ModifyDone>
          </FooterButtonWrap>
        </ModalBox>
      </ModalContainer>
    </Modal>
  );
};

export default EditPostModal;

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ModalBox = styled.form`
  display: flex;
  flex-direction: column;
  margin:auto;
  width: 600px;
  height: 550px;
  border: 2px #000 solid;
  border-radius: 5px;
  background: white;
  padding: 20px;
  
  input[type="text"] {
    box-sizing:border-box;
    border-radius: 5px;
    width: 100%;
    font-size: 20px;
    padding-left: 10px;
    padding-top: 10px;
    margin-bottom:15px;
    margin-top:10px;
  }
  textarea[type="text"] {
    box-sizing:border-box;
    border-radius: 5px;
    width: 100%;
    height: 150px;
    font-size: 20px;
    padding-left: 10px;
    padding-top: 10px;
  }
  button {
    background-color: #ff5f2e;
    border: none;
    border-radius: 5px;
    color: #e1eef6;
    font-size: 16px;
    width: 88px;
    height: 40px;
    cursor: pointer;
    display:block;
    margin-top:10px;
    margin-left:auto;
    text-align: center;
  }
`;

const PrevImg = styled.img`
  width: 100%;
  max-widht: 600px;
  height: 200px;
  margin-bottom: 15px;
  margint-top: 15px;
`;

const ImageBox = styled.div`

`;

const FooterButtonWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

const ModifyDone = styled.button`
  margin: 10px 0px;
  height: 30px;
  width: 80px;
  background-color: #ff5f2e;
  cursor: pointer;
  align-items: center;
  border-radius: 10px;
`;


const FileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;

const FileLabel = styled.label`
  display: block;
  padding: 0 20px;
  color: #fff;
  background-color: #1363df;
  cursor: pointer;
  width:50px;
  height: 20%;
  line-height: 40px;
  margin: auto;
  border-radius: 5px;
  margin-bottom: 15px;
  text-align: center;
`;