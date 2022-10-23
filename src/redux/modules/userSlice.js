import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setCookie } from "../../components/global/cookie";


export const __validateEmail = createAsyncThunk(
    "VALIDATE_EMAIL",
    async(arg, thunkAPI) => {
        try{
            const {result} = await axios.post("http://43.200.182.245:8080/api/id-duplicate", arg)
            .then(res => res.data);
            if(result){
<<<<<<< HEAD
                sessionStorage.setItem("EmailValid", true);
                alert("사용가능한 아이디입니다.");
            } else{
                sessionStorage.setItem("EmailValid", false);
                alert("사용불가능한 아이디입니다.");
=======
                alert("사용가능한 아이디입니다.");
                sessionStorage.setItem("EmailValid", true)
            } else{
                alert("사용불가능한 아이디입니다.");
                sessionStorage.setItem("EmailValid", false)
>>>>>>> help
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
<<<<<<< HEAD
                sessionStorage.setItem("nameValid", true);
                alert("사용 가능한 닉네임입니다.");
            } else {
                sessionStorage.setItem("nameValid", false);
                alert("사용 불가능한 닉네임입니다.");
            }
=======
                alert("사용 가능한 닉네임입니다.");
                sessionStorage.setItem("nameValid", true)
                } else {
                alert("사용 불가능한 닉네임입니다.");
                sessionStorage.setItem("nameValid", false)
                }
>>>>>>> help
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
            await axios.post("http://43.200.182.245:8080/api/login", arg)
            .then((res)=> setCookie('token', res.data.check.data.accessToken));
            return thunkAPI.fulfillWithValue(arg);
        } catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
)  

const initialState = {
    result: "",
    isLoading: false,
    message: "",
    isLogin: false,
<<<<<<< HEAD
    validateEmail: false,
    validateName: false,
=======
>>>>>>> help
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
<<<<<<< HEAD
    },
    validateEmailChange:(state)=>{
        state.validateEmail = false;
    },
    validateNameChange:(state)=>{
        state.validateName = false;
    }

=======
    }
>>>>>>> help
  },
  extraReducers: {
    [__validateEmail.pending]: (state, action) => {
        state.isLoading = true; 
    },
    [__validateEmail.fulfilled]: (state, action) => {
        state.isLoading = false;
<<<<<<< HEAD
        if(action.payload){state.validateEmail = true;}
        else {state.validateEmail = false;}
        
=======
>>>>>>> help
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
<<<<<<< HEAD
        if(action.payload){state.validateName = true;}
        else {state.validateName = false;}
=======
>>>>>>> help
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
        state.isLogin = true;
        alert(`${action.payload.email}님 환영합니다.`)
    },
    [__loginUser.rejected]: (state, action) => {
        state.isLoading = false; 
        state.isLogin = false;
        alert("아이디와 비밀번호를 확인해주세요.")
        
    },
  }
});
<<<<<<< HEAD
export const { loginState, logoutState, validateEmailChange, validateNameChange } = userSlice.actions
=======
export const { loginState, logoutState } = userSlice.actions
>>>>>>> help
export default userSlice.reducer;