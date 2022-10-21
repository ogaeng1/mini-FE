import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createUser = (data) => {
  return async function (dispatch) {
    // console.log(data);
    await axios.post("members/signup", data, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((response) => {
        // console.log(response);
        if (response.data.success === false) {
          return window.alert(response.data.err.msg);
        } else {
          return window.alert(`${response.data.data.nickname}님 회원가입을 축하드립니다!`), window.location.replace("/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        }
      });
  };
};

export const loginUser = (data) => {
  return async function (dispatch) {
    await axios
      .post("members/login", data, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        if (response.data.success === true) {
          return (
            sessionStorage.setItem("token", response.headers.authorization),
            // cookies.save("refresh-token", response.headers["refresh-token"]),
            sessionStorage.setItem("nickname", response.data.data.nickname),
            alert(`${sessionStorage.nickname}님 환영합니다.`),
            window.location.replace("/")
          );
        } else {
          return window.alert(response.data.error.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        
      });
  };
};


export const __validateEmail = createAsyncThunk(
    "VALIDATE_EMAIL",
    async(arg, thunkAPI) => {
        try{
            const {result} = await axios.post("http://localhost:3001/id-duplicate", arg);
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
            const {result} = await axios.post("http://localhost:3001/name-duplicate", arg);
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
            axios.post("http://localhost:3001/signup", arg);
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
  }
});

export default userSlice.reducer;