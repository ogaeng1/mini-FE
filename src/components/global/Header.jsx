import React, { useEffect } from "react";
import styled from "styled-components";
import { BsInstagram } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginState, logoutState } from "../../redux/modules/userSlice";

const Header = () => {
const {isLogin} = useSelector(state => state.user)
const navigate = useNavigate();
const dispatch = useDispatch();

const onClickLocation = () => {
        window.location.replace("/")
}

const onClickWriteHandler = () => {
    if(isLogin){
        navigate("/write")
    } else{
        alert("새글을 작성하기 위해 로그인 해주세요.")
        navigate("/login")
    }
}

const onLogoutHandler = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('refreshtoken')
    dispatch(logoutState())
    if(window.location.pathname==="/write"){
        alert("새글을 작성하기 위해 로그인 해주세요.")
        navigate("/login")
    }
};

useEffect(() => {
    if(sessionStorage.getItem('token')){
        dispatch(loginState())
        } else {
        dispatch(logoutState())
        }

},)


return (
    <HeaderContainer>
        <StLink to="/" onClick={()=> onClickLocation()}>
            <BsInstagram style={{margin:'0 20px 0 50px'}}/>
            <h1 style={{margin:'3px 0 0 0'}}>항해그램</h1>
        </StLink>
            <StBtns>
            {isLogin ?
            <UserBtn onClick={()=> onLogoutHandler()}>로그아웃</UserBtn>
            : <UserBtn onClick={() => navigate("/login")} >로그인</UserBtn> }
            <UserBtn onClick={() => onClickWriteHandler()}>작성하기</UserBtn>
        </StBtns>

    </HeaderContainer>
);
}

export default Header;

const HeaderContainer = styled.div`
    text-align: center;
    font-size: 30px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 54px;
    position: fixed;
    top: 0;
    display: flex;
    background-color: white;
    border-bottom: 1px solid #DBDBDB;
    box-shadow: 0 0 7px grey;
    z-index: 1;
`;
const StBtns = styled.div`
    display: flex;
    max-width : 400px;
    min-width : 200px;
    flex-direction: row;
    align-items: center;
    gap: 40px;
    margin : 0 50px 0 0 ;
    transition: all 0.2s ease;
`
const UserBtn = styled.button`
    width: 70%;
    background-color: #DBDBDB;
    color: black;
    border: none;
    cursor: pointer;
    height: 40px;
    border-radius: 6px;
    margin: 10px 0;
    transition: all 0.5s;
    &:hover {
    background-color: gray;
    }
`
const StLink = styled(Link)`
    text-decoration: none;
    color: black;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    align-items: center;

`