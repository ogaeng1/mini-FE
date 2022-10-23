import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../components/global/cookie";

const headers = {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${getCookie('token')}`,
    'withCredentials': true,
}

const initialState = {
    title: "",
    content: "",
    img: "",
    post:[],
}


//게시글 작성
export const __postFeed = createAsyncThunk("CREATE_POST", async(payload, thunkAPI) => {
    console.log("______payload_______",payload)
    try {
        const response = await axios.post("http://43.200.182.245:8080/api/post", payload, {
            headers: headers
        }) ;

        return thunkAPI.fulfillWithValue(response.data);
    } catch(err) {
        return err;
    }
})

// 메인화면 게시글 목록 불러오기
export const __getPost = createAsyncThunk("GET_POST", async(_, thunkAPI) => {
    try {
        const response = await axios.get("http://43.200.182.245:8080/api/post");
        return thunkAPI.fulfillWithValue(response.data);
    } catch(err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

//게시글 상세 페이지 이동
export const __getDetailPost = createAsyncThunk("GET_DETAIL_POST", async(postId, thunkAPI) => {
    try {
        const getDetailPostResponse = await axios.get(`http://43.200.182.245:8080/api/post/${postId}`);
        return thunkAPI.fulfillWithValue(getDetailPostResponse.data);
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
});

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: {
        [__postFeed.fulfilled]: (state, action) => {
            state.post = [...state.post, action.payload];
        },
        [__postFeed.rejected]: (state, action) => {
            state.err = action.payload;
        },
        [__postFeed.pending]: (state, action) => {

        },
        [__getPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            console.log(action.payload);
            state.posts.push(...action.payload.content);
        },
        [__getPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        
        // [__getPost.pending]: (state, action) => {
        //     state.isLoading = true;
        // }
    }
})

export default postSlice.reducer;