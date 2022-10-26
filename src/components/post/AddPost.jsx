import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isSuccessFalse, __postFeed } from "../../redux/modules/postSlice";


const AddPost = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isSuccess} = useSelector(state=>state.post)
    const initialState = {
        title: "",
        content: "",
    };

    const [post, setPost] = useState(initialState);
    const [imgSave, setImgSave] = useState("");

    const saveFileImage = (e) => {
      setImgSave(URL.createObjectURL(e.target.files[0]));
    };

    const onUpLoadHandler = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const onPostingHandler = (e) => {    
      e.preventDefault();
      let formData = new FormData();
      let postimage = document.getElementById("img_file");
      formData.append(
        "postCreateRequestDto",
        new Blob([JSON.stringify(post)], { type: "application/json" })
      );
      formData.append("file", postimage.files[0]);
      dispatch(__postFeed(formData));
    };

    useEffect(()=>{
      if(isSuccess){
        alert("새글 등록에 성공하였습니다.")
        navigate("/")
        dispatch(isSuccessFalse())
        window.location.replace("/")
      }
    },[onPostingHandler])

    return (
        <WriteWrap>
          <WriteBox enctype="multipart/form-data" onSubmit={onPostingHandler}>
            <StPostBox>
              <StImgBox>
                <PrevImg src={imgSave ? imgSave : "image/notice_no_img.png"} />
                  <ImageBox>
                      <FileLabel htmlFor="img_file">내 컴퓨터에서 사진 선택</FileLabel>
                      <FileInput type="file" id="img_file" accept="image/*" onChange={saveFileImage}/>
                  </ImageBox>
              </StImgBox>
              <StTextBox>
                <WriteTitle>
                  <WriteInput required placeholder="제목을 입력해주세요." type="text" name="title" value={post.title} onChange={onUpLoadHandler} />
                </WriteTitle>
                <TextArea required placeholder="내용을 입력해주세요." type="text" name="content" value={post.content} onChange={onUpLoadHandler}/>
              </StTextBox>
            </StPostBox>

            <BtnGroup>
              <BtnBack
                  type="button"
                  onClick={() => {
                  navigate("/");
                  }}
              >
                  뒤로가기
              </BtnBack>
              <BtnUpload type="submit">등록하기</BtnUpload>
            </BtnGroup>
          </WriteBox>
        </WriteWrap>
    );
};

export default AddPost;
const WriteWrap = styled.section`
  margin: 55px auto auto auto;
  width: 100%;
  height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const WriteBox = styled.form`
  background-color: #fff;
  max-width: 1200px;
  width: 90%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between ;
  border-radius: 5px;
  padding: 20px 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
const StPostBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap:20px
`
const StImgBox = styled.div`
  width: 40vw;
  height: 40vh;
`
const StTextBox = styled.div`
  width: 40vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
`
const WriteTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    margin-bottom: 15px;
`;
const WriteInput = styled.input`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  height: 50px;
`;
const PrevImg = styled.img`
  width: 100%;
  height: 40vh;
  margin-bottom: 15px;
`;
const ImageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FileInput = styled.input`
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
`;
const FileLabel = styled.label`
  padding: 0 20px;
  color: #fff;
  background-color: skyblue;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  margin-left: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
  font-size:16px;
  font-weight:600;
  &:hover {
    background-color: #4646f1;
    }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100%;
  font-size: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 50px;
`;

const BtnBack = styled.button`
  padding: 0 20px;
  color: black;
  vertical-align: middle;
  background-color: #DBDBDB;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  width: 150px;
  border:0;
  font-size:16px;
  font-weight:600;
  &:hover {
    background-color: gray;
    }
`;
const BtnUpload = styled.button`
  padding: 0 20px;
  color: black;
  vertical-align: middle;
  background-color: #DBDBDB;
  cursor: pointer;
  height: 40px;
  width: 150px;
  line-height: 40px;
  border-radius: 5px;
  border:0;
  font-size:16px;
  font-weight:600;
  &:hover {
    background-color: gray;
    }
`;