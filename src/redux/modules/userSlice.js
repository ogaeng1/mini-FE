import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie, setCookie } from "../../components/global/cookie";

export const __validateEmail = createAsyncThunk(
    "VALIDATE_EMAIL",
    async(arg, thunkAPI) => {
        try{
            const {result} = await axios.post("http://43.200.182.245:8080/api/id-duplicate", arg);
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
            const {result} = await axios.post("http://43.200.182.245:8080/api/name-duplicate", arg);
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
            axios.post("http://43.200.182.245:8080/api/signup", arg);
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
            .then((res)=> setCookie('email', res.data.check.data.accessToken));
            console.log("____________res__________", getCookie('email') )
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
    data: {
        AccessToken:null,
        RefreshTokken:null,
    }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [__validateEmail.pending]: (state, action) => {
        state.isLoading = true; 
    },
    [__validateEmail.fulfilled]: (state, action) => {
        state.isLoading = false;
        if(action.paylod) {
        alert("사용 가능한 아이디입니다.");
        sessionStorage.setItem("EmailValid", true)
        } else {
        alert("사용 불가능한 아이디입니다.");
        sessionStorage.setItem("EmailValid", false)
        }
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
        if(action.paylod) {
        alert("사용 가능한 닉네임입니다.");
        sessionStorage.setItem("nameValid", true)
        } else {
        alert("사용 불가능한 닉네임입니다.");
        sessionStorage.setItem("nameValid", false)
        }
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
        alert(`${action.paylod.name}님 회원가입을 축하합니다.`)
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
        console.log("_______pay_________", action.payload)
        alert(`${action.payload.email}님 환영합니다.`)
    },
    [__loginUser.rejected]: (state, action) => {
        state.isLoading = false; 
        state.message = "데이터를 불러오지 못했습니다.";
    },
  }
});

export default userSlice.reducer;