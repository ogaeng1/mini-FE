import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __validateEmail = createAsyncThunk(
    "VALIDATE_EMAIL",
    async(arg, thunkAPI) => {
        try{
            const {result} = await axios.post("http://43.200.182.245:8080/api/id-duplicate", arg)
            .then(res => res.data);
            if(result){
                sessionStorage.setItem("EmailValid", true);
                alert("사용가능한 아이디입니다.");
            } else{
                sessionStorage.setItem("EmailValid", false);
                alert("사용불가능한 아이디입니다.");
            }
            return thunkAPI.fulfillWithValue(result);
        } catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const __validateName = createAsyncThunk(
    "VALIDATE_NAME",
    async(arg, thunkAPI) => {
        try{
            const {result} = await axios.post("http://43.200.182.245:8080/api/name-duplicate", arg)
            .then(res => res.data);;
            if(result) {
                sessionStorage.setItem("nameValid", true);
                alert("사용 가능한 닉네임입니다.");
            } else {
                sessionStorage.setItem("nameValid", false);
                alert("사용 불가능한 닉네임입니다.");
            }
            return thunkAPI.fulfillWithValue(result);
        } catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
)

export const __addUser = createAsyncThunk(
    "ADD_USER",
    async(arg, thunkAPI) => {
        try{
            const res = await axios.post("http://43.200.182.245:8080/api/signup", arg);
            if(!res.data.result){
                alert("회원가입에 실패하였습니다.")}
            return thunkAPI.fulfillWithValue(arg);
        } catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
)  

export const __loginUser = createAsyncThunk(
    "LOGIN_USER",
    async(arg, thunkAPI) => {
        try{
           const {data} = await axios.post("http://43.200.182.245:8080/api/login", arg)
            .then((res)=> {
                sessionStorage.setItem('token', res.headers.accesstoken);
                sessionStorage.setItem("name", res.data.check.data.name);
                return res;
            });
            return thunkAPI.fulfillWithValue({arg, data});
        } catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
)  

const initialState = {
    user: {email:"",name:""},
    isLoading: false,
    message: "",
    isLogin: false,
    validateEmail: false,
    validateName: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginState:(state)=>{
        state.isLogin = true;
    },
    logoutState:(state) =>{
        state.isLogin = false;
    },
    validateEmailChange:(state)=>{
        state.validateEmail = false;
    },
    validateNameChange:(state)=>{
        state.validateName = false;
    }

  },
  extraReducers: {
    [__validateEmail.pending]: (state, action) => {
        state.isLoading = true; 
    },
    [__validateEmail.fulfilled]: (state, action) => {
        state.isLoading = false;
        if(action.payload){state.validateEmail = true}
        else {state.validateEmail = false}
        
    },
    [__validateEmail.rejected]: (state, action) => {
        state.isLoading = false; 
        state.message = "데이터를 불러오지 못했습니다.";
    },

    [__validateName.pending]: (state, action) => {
        state.isLoading = true; 
    },
    [__validateName.fulfilled]: (state, action) => {
        state.isLoading = false;
        if(action.payload){state.validateName = true;}
        else {state.validateName = false;}
    },
    [__validateName.rejected]: (state, action) => {
        state.isLoading = false; 
        state.message = "데이터를 불러오지 못했습니다.";
    },

    [__addUser.pending]: (state, action) => {
        state.isLoading = true; 
    },
    [__addUser.fulfilled]: (state, action) => {
        state.isLoading = false;
        alert(`${action.payload.name}님 회원가입을 축하합니다. 로그인 해주세요.`)
    },
    [__addUser.rejected]: (state, action) => {
        state.isLoading = false; 
        state.message = "데이터를 불러오지 못했습니다.";
    },

    [__loginUser.pending]: (state, action) => {
        state.isLoading = true; 
    },
    [__loginUser.fulfilled]: (state, action) => {
        state.isLoading = false;
        state.isLogin = action.payload.data.result;
        if(state.isLogin){
            state.user = {email : action.payload.arg.email, name : action.payload.data.check.data.name};
            alert(`${action.payload.data.check.data.name}님 환영합니다.`);
        } else{
            state.isLogin = false;
            alert("계정정보를 확인해주시거나, 회원가입을 해주세요.")
        }

    },
    [__loginUser.rejected]: (state, action) => {
        state.isLoading = false; 
        state.isLogin = false;
        alert("아이디와 비밀번호를 확인해주세요.")
        
    },
  }
});
export const { loginState, logoutState, validateEmailChange, validateNameChange } = userSlice.actions
export default userSlice.reducer;