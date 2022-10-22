import { useState } from "react";
import styled from "styled-components";
import Layout from "../components/global/Layout";
import LoginForm from "../components/user/LoginForm";
import SignUpForm from "../components/user/SignUpForm";


const LoginPage = () => {
    const [showInput, setShowInput] = useState(false)
    return (
    <Layout>
       <Stcontainer>
            {showInput ?
            <SignUpForm setShowInput={setShowInput}></SignUpForm>
            : <LoginForm setShowInput={setShowInput}></LoginForm>} 
       </Stcontainer>
    </Layout>
    );
};

export default LoginPage;

const Stcontainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 80vw;
    margin: auto;
    gap: 40px;
    height: 75vh;
    align-items: center;
    justify-content: center;
`
