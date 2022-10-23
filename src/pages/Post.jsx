import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Header from "../components/global/Header"
import Layout from "../components/global/Layout"

const Post = () => {
    const {isLogin} = useSelector(state => state.user);
    const navigate = useNavigate();
    if(!isLogin){
        alert("로그아웃상태에서는 새글을 작성하실수 없습니다.");
        navigate("/login");
    }
    
    return(
        <Layout>
            <Header/>
            <FormSection>post</FormSection>
        </Layout>
    )
}

export default Post

const FormSection = styled.form`
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  max-width: 450px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 15px 0;
  `