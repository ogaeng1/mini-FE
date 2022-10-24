import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  post: [
    {
      postId: "",
      title: "",
      content: "",
      img: "",
      name: "",
      createTime: 0,
      likeNum: 0,
      commentNum: 0,
    },
  ],
};
export const __getPost = createAsyncThunk(
  "post/getPost",
  async (_, thunkAPI) => {
    try {
      const result = await axios.get("http://localhost:3003/post");
      //axios를 통해 db.json에 있는 정보를 불러온 것
      //console.log("thunk에서 보낸다", result);
      return thunkAPI.fulfillWithValue(result.data);
      //성공하면 result.data를 보내고
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __detailPost = createAsyncThunk(
  "post/detailPost",
  async (payload, thunkAPI) => {
    try {
      const result = await axios.get(
        `http://localhost:3003/post/${payload.id}`
      );
      return thunkAPI.fulfillWithValue(result.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//리듀서
export const mainSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [__getPost.pending]: (state) => {
      state.isLoading = true;
    },
    [__getPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [__getPost.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [__detailPost.fulfilled]: (state, action) => {
      state.post = action.payload;
    },
    [__detailPost.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default mainSlice.reducer;
