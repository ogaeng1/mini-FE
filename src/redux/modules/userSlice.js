import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __validateEmail = createAsyncThunk(
  "VALIDATE_EMAIL",
  async (arg, thunkAPI) => {
    try {
      const { result } = await axios
        .post("http://3.38.101.115:8081/api/id-duplicate", arg)
        .then((res) => res.data);
      if (!result) throw result;
      return thunkAPI.fulfillWithValue(result);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __validateName = createAsyncThunk(
  "VALIDATE_NAME",
  async (arg, thunkAPI) => {
    try {
      const { result } = await axios
        .post("http://3.38.101.115:8081/api/name-duplicate", arg)
        .then((res) => res.data);
      if (!result) throw result;
      return thunkAPI.fulfillWithValue(result);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __addUser = createAsyncThunk("ADD_USER", async (arg, thunkAPI) => {
  try {
    const res = await axios.post("http://3.38.101.115:8081/api/signup", arg);
    if (!res.data.result) {
      alert("회원가입에 실패하였습니다.");
    }
    return thunkAPI.fulfillWithValue(arg);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const __loginUser = createAsyncThunk(
  "LOGIN_USER",
  async (arg, thunkAPI) => {
    try {
      const res = await axios.post("http://3.38.101.115:8081/api/login", arg);
      if (!res.data.result) throw res;
      return thunkAPI.fulfillWithValue(res);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  user: { email: "", name: "" },
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
    loginState: (state) => {
      state.isLogin = true;
    },
    logoutState: (state) => {
      state.isLogin = false;
    },
    validateEmailChange: (state) => {
      state.validateEmail = false;
    },
    validateNameChange: (state) => {
      state.validateName = false;
    },
  },
  extraReducers: {
    [__validateEmail.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__validateEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.validateEmail = true;
      alert("사용 가능한 이메일입니다.");
    },
    [__validateEmail.rejected]: (state, action) => {
      state.isLoading = false;
      state.validateEmail = false;
      alert("사용 불가능한 이메일입니다.");
    },

    [__validateName.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__validateName.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.validateName = true;
      alert("사용 가능한 닉네임입니다.");
    },
    [__validateName.rejected]: (state, action) => {
      state.isLoading = false;
      state.validateName = false;
      alert("사용 불가능한 닉네임입니다.");
    },

    [__addUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__addUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      alert(`${action.payload.name}님 회원가입을 축하합니다. 로그인 해주세요.`);
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
      sessionStorage.setItem("token", action.payload.headers.accesstoken);
      sessionStorage.setItem(
        "refreshtoken",
        action.payload.headers.refreshtoken
      );
      sessionStorage.setItem("name", action.payload.data.check.data.name);
      alert(`환영합니다.`);
    },
    [__loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isLogin = false;
      alert("아이디와 비밀번호를 확인해주세요.");
    },
  },
});
export const {
  loginState,
  logoutState,
  validateEmailChange,
  validateNameChange,
} = userSlice.actions;
export default userSlice.reducer;
