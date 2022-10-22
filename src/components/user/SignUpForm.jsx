import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { __addUser, __validateEmail, __validateName } from "../../redux/modules/userSlice";

const SignUpForm = ({setShowInput}) => {
    const initialState = {
        Email: "",
        password: "",
        passwordConfirm: "",
        name: "",
      };
    
      const dispatch = useDispatch();
      const [emChk, setEmChk] = useState(false);    
      const [pwChk, setPwChk] = useState(false);
      const [pwcfChk, setPwcfChk] = useState(false);
      const [nameChk, setNameChk] = useState(false);
      const [validateEmail, setValidateEmail] = useState(false);
      const [validateName, setValidateName] = useState(false);
      const [user, setUser] = useState(initialState);
      const regPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
      const regEmail = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
      const regName = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/

      const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
      };

      const onValidateEmailHandler = () => {
        if (user.Email.trim() ==="") {
          alert("아이디를 입력해주세요!")
        } else {
          dispatch(
            __validateEmail(
              {
                email: user.Email
              }
            ) 
          )
          let validatedEmail = sessionStorage.getItem("EmailValid")
          setValidateEmail(validatedEmail)
        }
      };

      const onValidateNameHandler = () => {
        if (user.name.trim() ==="") {
          alert("아이디를 입력해주세요!")
        } else {
          dispatch(
            __validateName(
              {
                name: user.name
              }
            ) 
          )
          let validatedName = sessionStorage.getItem("nameValid")
          setValidateName(validatedName)
        }
      };

      const onSubmitHandler = () => {        
        if (!pwChk ) {
          alert("비밀번호를 형식에 맞게 입력해주세요.");
        } else if(!emChk){
          alert("이메일을 형식에 맞게 입력해주세요.");
        } else if(!pwcfChk){
          alert("비밀번호가 동일 하지 않습니다.")
        } else if(!nameChk){
          alert("닉네임을 확인해주세요.")
        }
        dispatch(
            __addUser({
              email: user.Email,
              password: user.password,
              name: user.name,
            })
        );
        setUser(initialState)
        setShowInput(false)
        }        

      useEffect(() => {
        if (regEmail.test(user.Email)) {
          setEmChk(true);
        } else {
          setEmChk(false);
        };
        setValidateEmail(false)
      }, [user.Email]);

      useEffect(() => {
        if (regPw.test(user.password)) {
          setPwChk(true);
        } else {
          setPwChk(false);
        };
      }, [user.password]);

      useEffect(() => {
        if (user.password === user.passwordConfirm){
          setPwcfChk(true);
        } else {
          setPwcfChk(false);
        };
      }, [user.passwordConfirm]);

      useEffect(() => {
        if (regName.test(user.name)){
          setNameChk(true);
        } else {
          setNameChk(false);
        };
        setValidateName(false)
      }, [user.name]);

      return (
        <StFormSection>
          <h1>항해 그램 회원 가입</h1>
          <label>
            <p>아이디</p>
            <StInputBox>
              <StInput 
              value={user.Email} name="Email" 
              type="text" required placeholder="이메일 형식" 
              onChange={onChangeHandler} 
              />
              <StValidBtn
              type="button" onClick={onValidateEmailHandler}>
              중복 확인
              </StValidBtn>
            </StInputBox>
            <StWarn>
              { emChk ? 
              <div style={{ color: "blue" }}>형식에 맞는 아이디 입니다.</div>
              : <div style={{ color: "red" }}>아이디가 형식에 맞지 않습니다.</div> }
            </StWarn>
          </label>
          <label>
            <p>비밀번호</p>
            <StInput 
            value={user.password} name="password" 
            required type="password" placeholder="비밀번호 영문/숫자 포함(8~20자)" 
            onChange={onChangeHandler} 
            />
            <StWarn>
              { pwChk ? 
              <div style={{ color: "blue" }}>올바른 비밀번호입니다.</div>              
              : <div style={{ color: "red" }}>비밀번호가 형식에 맞지 않습니다.</div> }
            </StWarn>
          </label>
          <label>
            <p>비밀번호 확인</p>
            <StInput
              value={user.passwordConfirm}
              name="passwordConfirm"
              type="password"
              required
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              onChange={onChangeHandler}
            />
            <StWarn>
              {user.password === user.passwordConfirm ? 
              null : <div style={{ color: "red" }}>비밀번호가 일치 하지 않습니다.</div> }
            </StWarn>
          </label>
          <label>
            <p>닉네임</p>
            <StInputBox>
              <StInput value={user.name} name="name" type="text"
              required placeholder="3자 이상 16자 이하, 영어 또는 숫자로 구성" 
              onChange={onChangeHandler}
              />
              <StValidBtn
              type="button" onClick={onValidateNameHandler}>
              중복 확인
              </StValidBtn>
            </StInputBox>
            <StWarn>
            { nameChk ? 
              <div style={{ color: "blue" }}>올바른 닉네임입니다.</div>              
              : <div style={{ color: "red" }}>닉네임 형식이 맞지 않습니다.</div> }
            </StWarn>
          </label>
          <StLine />
          <StBtnWrap>
            <StUserBtn type="button"
              onClick={() => setShowInput(false)}
            >
              뒤로 가기
            </StUserBtn>
            { validateEmail && validateName ? 
            (<StUserBtn onClick={onSubmitHandler}>회원가입</StUserBtn>) 
            : (<StGrayBtn onClick={()=>{alert("아이디 중복 검사를 해주세요.")}} type="button">
              회원가입
              </StGrayBtn>
              )
            }
          </StBtnWrap>
        </StFormSection>

    );
};

export default SignUpForm;


const StFormSection = styled.div`
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
  max-width: 450px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 15px 0;
  margin-top: 150px;
  h1 {
    font-family: "Black Han Sans", sans-serif;
    margin-bottom: 40px;
    font-weight: normal;
  }
  label {
    width: 80%;
  }
  label > p {
    margin: 5px 0;
    text-align: left;
  }
`;
const StInputBox = styled.div`
  display: flex;
`

const StInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 5px;
  border: 2px solid #e6e3e3;
  border-radius: 6px;
  box-shadow: inset 0 1px 4px 0 rgb(64 60 67 / 16%);
  &:focus {
    outline: none;
    border-color: #666666;
  }
`;

const StWarn = styled.div`
  margin-bottom: 15px;
  font-size: 12px;
`;

const StValidBtn = styled.button`
  min-width: 60px;
  margin-left: 15px;
  margin-bottom: 5px;
  font-size: 10px;
  border-radius: 6px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  background-color: #1363df;
  color: white;
  border: none;
  &:hover {
    background-color: #1363df;
  }
`;

const StUserBtn = styled.button`
  width: 35%;
  background-color: #1363df;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  border-radius: 6px;
  margin: 10px 0;
  transition: all 0.5s;
  &:hover {
    background-color: #193f7d;
  }
`;

const StGrayBtn = styled.button`
  width: 35%;
  background-color: gray;
  color: white;
  border: none;
  cursor: pointer;
  height: 40px;
  border-radius: 6px;
  margin: 10px 0;
  transition: all 0.5s;
`;

const StBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const StLine = styled.hr`
  width: 100%;
  border: solid gray 1px;
  margin-top: 15px;
  margin-bottom: 15px;
`;