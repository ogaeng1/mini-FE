import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../components/global/cookie";

const initialState = {
    posts: [],
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
    
}


//게시글 작성
export const __postFeed = createAsyncThunk("CREATE_POST", async(payload, thunkAPI) => {
    try {
        const {data} = await axios.post("http://43.200.182.245:8080/api/post", payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${getCookie('token')}`,
                'withCredentials': true,
            }
        }).then((res)=>res.data.check)
        return thunkAPI.fulfillWithValue(data);
    } catch(err) {
        return err;
    }
})

//게시글 상세 페이지 이동
export const __getDetailPost = createAsyncThunk("GET_DETAIL_POST", async(postId, thunkAPI) => {
    try {
        const getDetailPostResponse = await axios.get(`http://43.200.182.245:8080/api/post/${postId}`);
        return thunkAPI.fulfillWithValue(getDetailPostResponse.data);
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
});

//혜민님 부분
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
  

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: {
        [__postFeed.fulfilled]: (state, action) => {
            state.posts = [...state.posts, action.payload];
        },
        [__postFeed.rejected]: (state, action) => {
            state.err = action.payload;
        },
        [__postFeed.pending]: (state, action) => {

        },
        [__getPost.fulfilled]: (state, action) => {
            state.isLoading = false;
             state.posts.push(...action.payload.content);
        },
        [__getPost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },

        [__getPost.pending]: (state) => {
            state.isLoading = true;
        },
        [__getPost.fulfilled]: (state, action) => {
        state.post = action.payload;
        },
        [__getPost.rejected]: (state, action) => {
        state.error = action.payload;
        },
      
        
        // [__getPost.pending]: (state, action) => {
        //     state.isLoading = true;
        // }
    }
})

export default postSlice.reducer;