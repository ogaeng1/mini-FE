import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts: [],
    post: {
        postId: "",
        title: "",
        content:"",
        img: "",
        name: ""
    }
}

//게시글 상세 페이지 이동
export const __getDetailPost = createAsyncThunk("GET_DETAIL_POST", async(postId, thunkAPI) => {
    try {
        const getDetailPostResponse = await axios.get(`http://43.200.182.245:8080/api/post/${postId}` ,"", {
            
        });
        return thunkAPI.fulfillWithValue(getDetailPostResponse.data);
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
});

const detailSlice = createSlice({
    name: "posts",
    initialState,
    reducers:{},
    extraReducers: {

        // 상세 페이지 불러오기
        [__getDetailPost.fulfilled]: (state, action) => {
            state.posts = action.payload.check.data;
          },
        [__getDetailPost.rejected]: (state, action) => {
            state.error = action.payload;
        }
    }
})

export default detailSlice.reducer;