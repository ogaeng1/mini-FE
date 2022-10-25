import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts: [{
        postId: 0,
        title: "",
        content: "",
        img: "",
        name: "",
        createTime: 0,
        likeNum: 0,
        commentNum: 0,
        likeUsers:[]
      },],
}

//게시글 작성
export const __postFeed = createAsyncThunk("CREATE_POST", async(payload, thunkAPI) => {
    try {
        const {data} = await axios.post("http://43.200.182.245:8080/api/post", payload, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'withCredentials': true,
            }
        })
        return thunkAPI.fulfillWithValue(data);
    } catch(err) {
        return err;
    }
});

//좋아요
export const __likePost = createAsyncThunk("LIKE_POST", async(payload, thunkAPI) => {
    try {
        const {data} = await axios.post(`http://43.200.182.245:8080/api/post/${payload}/like`,"",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'withCredentials': true,
            }
        })
        return thunkAPI.fulfillWithValue({data, payload});
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

//게시글 조회
export const __getPost = createAsyncThunk(
    "post/getPost",
    async (_, thunkAPI) => {
      try {
        const {data} = await axios.get("http://43.200.182.245:8080/api/post")
        .then(res=>res.data.check);
        return thunkAPI.fulfillWithValue(data);
      } catch (error) {
        return thunkAPI.rejectWithValue(error);
      }
    }
  );
  

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        }
    },
    extraReducers: {
        //게시글 작성
        [__postFeed.fulfilled]: (state, action) => {
            state.posts = [...state.posts, action.payload.check.data];
            state.isSuccess = action.payload.result;
        },
        [__postFeed.rejected]: (state, action) => {
            state.isSuccess = action.payload.result;
        },
        //게시글 좋아요
        [__likePost.fulfilled]: (state, action) => {
            if(action.payload.code === "ERR_BAD_REQUEST"){
                alert("로그인이 필요합니다. 로그인해주세요.");
                return;
            } else{
                const index = state.posts.findIndex(post => post.postId === action.payload.payload)
                const new_post = {...state.posts[index], likeUsers: action.payload.data.check.data.likeUsers}
                state.posts.splice(index, 1, new_post)
            }
        },
        [__likePost.rejected]: (state, action) => {
        },
        //게시글 조회
        [__getPost.fulfilled]: (state, action) => {
            state.posts = action.payload;
        },
        [__getPost.rejected]: (state, action) => {
        },

    }
})
export const { isSuccessFalse } = postSlice.actions
export default postSlice.reducer;