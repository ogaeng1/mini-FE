import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __postFeed } from "../redux/modules/postSlice";
new Blob([JSON.stringify()], { type: "application/json" });

const Write = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = {
        title: "",
        content: "",
    };

    const [post, setPost] = useState(initialState);

    const onUpLoadHandler = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    const [imgSave, setImgSave] = useState("");

    const saveFileImage = (e) => {
        setImgSave(URL.createObjectURL(e.target.files[0]));
    };
    console.log("______File______", imgSave)


    const onPostingHandler = (e) => {    
      e.preventDefault();
      let formData = new FormData();
      let postimage = document.getElementById("img_file");
      formData.append(
        "postCreateRequestDto",
        new Blob([JSON.stringify(post)], { type: "application/json" })
      );
      
      formData.append("file", postimage.files[0]);
       
      dispatch(__postFeed(formData))

    };

    return (
        <WriteWrap>
            <WriteBox enctype="multipart/form-data" onSubmit={onPostingHandler}>
                <WriteTitle>
                    <span>제목</span>
                    <WriteInput required type="text" name="title" value={post.title} onChange={onUpLoadHandler} />
                </WriteTitle>

                <div className="imgBox">
                    <PrevImg src={imgSave ? imgSave : "image/notice_no_img.png"} />
                    <ImageBox>
                        <FileLabel htmlFor="img_file">사진올리고싶으면 눌러</FileLabel>
                        <FileInput type="file" id="img_file" accept="image/*" onChange={saveFileImage}/>
                    </ImageBox>
                </div>

                <TextArea required placeholder="내용입력ㄱㄱ" type="text" name="content" value={post.content} onChange={onUpLoadHandler}/>

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

export default Write;

const WriteWrap = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WriteBox = styled.form`
  background-color: #fff;
  width: 100%;
  height: 100%;
  margin-top: 3rem;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 20px 15px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

const WriteTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-bottom: 15px;
    span {
        font-size: 20px;
        margin-top: 4px;
    }
`;

const WriteInput = styled.input`
  width: 90%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border: none;
  border-radius: 5px;
  height: 35px;
  font-size: 18px;
`;

const PrevImg = styled.img`
  width: 100%;
  max-widht: 600px;
  height: 300px;
  margin-bottom: 15px;
`;

const ImageBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
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
  display: inline-block;
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
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  font-size: 16px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border: none;
  border-radius: 5px;
  margin-bottom: 15px;
  padding: 5px;
  box-sizing: border-box;
`;

const BtnGroup = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BtnBack = styled.button`
  padding: 0 20px;
  color: #666;
  vertical-align: middle;
  background-color: #f6f5f5;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  margin-right: 10px;
  border:0;
  font-size:16px;
  font-weight:600;
`;
const BtnUpload = styled.button`
  padding: 0 20px;
  color: #fff;
  vertical-align: middle;
  background-color: skyblue;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  border:0;
  font-size:16px;
  font-weight:600;
`;