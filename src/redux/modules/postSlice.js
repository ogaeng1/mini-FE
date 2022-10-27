import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    posts: [],
    post:{},
    isLoading:false,
    isSuccess:false,
}


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

//게시글 상세 페이지 이동
export const __getDetailPost = createAsyncThunk("GET_DETAIL_POST", async(postId, thunkAPI) => {
    try {
        const res = await axios.get(`http://43.200.182.245:8080/api/post/${postId}`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'withCredentials': true,
            }
        });
        return thunkAPI.fulfillWithValue(res.data);
    } catch(err) {
        return thunkAPI.rejectWithValue(err);
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


  // 상세페이지에서 게시글 삭제
  export const __deletePost = createAsyncThunk("DELETE_POST", async(postId, thunkAPI) => {
    try {
        await axios.delete(`http://43.200.182.245:8080/api/post/${postId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'withCredentials': true,
            }
        })
        return thunkAPI.fulfillWithValue({postId})
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
  });

  //상세페이지에서 게시글 수정
  export const __editPost = createAsyncThunk("UPDATE_POST", async(payload, thunkAPI) => {
    try {
        await axios.put(`http://43.200.182.245:8080/api/post/${payload.postId}`, payload.formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'withCredentials': true,
            }
        })
        return thunkAPI.fulfillWithValue(payload)
    } catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
  });



//무한스크롤
export const __infiniteScroll = createAsyncThunk(
    "INFINITE_SCROLL",
    async(page, thunkAPI)=>{
        try{            
            const res = await axios.get(`http://43.200.182.245:8080/api/post?page=${page}`);
            if(res.data.check.data.length===0){
                throw res
            }
            return thunkAPI.fulfillWithValue(res.data.check.data)
        }catch(e){
            return thunkAPI.rejectWithValue(e)
        }
    }
)

//댓글 등록
export const __postComment = createAsyncThunk("POST_COMMENT", async(payload, thunkAPI) => {
    try {
        const res = await axios.post(`http://43.200.182.245:8080/api/post/${payload.id}/comment`, payload.content, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'withCredentials': true,
            }
        })
        return thunkAPI.fulfillWithValue(res.data.check.data);
    } catch(err) {
        return err;
    }
});

//댓글 삭제
export const __deleteComment = createAsyncThunk("DELETE_COMMENT", async(payload, thunkAPI) => {
    try {
        await axios.delete(`http://43.200.182.245:8080/api/post/${payload.postId}/comment/${payload.id}`,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'withCredentials': true,
            }
        })
        return thunkAPI.fulfillWithValue(payload);
    } catch(err) {
        return err;
    }
});
//댓글 수정
export const __updateComment = createAsyncThunk("UPDATE_COMMENT", async(payload, thunkAPI) => {
    try {
        const res = await axios.put(`http://43.200.182.245:8080/api/post/${payload.postId}/comment/${payload.commentId}`, {content:payload.newComment.content} ,{
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
                'withCredentials': true,
            }
        }); 
        return thunkAPI.fulfillWithValue(res.data.check.data);
    } catch(err) {
        return err;
    }
});


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        isSuccessFalse:(state)=>{
            state.isSuccess = false;
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
                state.post.likeUsers=action.payload.data.check.data.likeUsers;
                state.posts.splice(index, 1, new_post);
            }
            console.log(action.payload)
        },
        [__likePost.rejected]: (state, action) => {
        },
        //게시글 조회
        [__getPost.fulfilled]: (state, action) => {
            state.posts = action.payload;
        },
        [__getPost.rejected]: (state, action) => {
        },
        //상세페이지 조회
        [__getDetailPost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__getDetailPost.fulfilled]: (state, action) => {
            state.post = action.payload.check.data;
            state.isLoading = false;
        },
        [__getDetailPost.rejected]: (state, action) => {
        },
        // 게시글 삭제
        [__deletePost.pending]: (state, action) => {
            state.isLoading = true;
          },
          [__deletePost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.post = state.post.filter((post) => post.postId !== action.payload);
          },
          [__deletePost.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
          },
          //게시글 수정
          [__editPost.fulfilled]: (state, action) => {
            state.post = action.payload;
          },
          [__editPost.rejected]: (state, action) => {
            state.error = action.payload;
          },
        //무한 스크롤
        [__infiniteScroll.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__infiniteScroll.fulfilled]: (state, action) => {
            state.posts.push(...action.payload)
            state.isLoading = false;
        },
        [__infiniteScroll.rejected]: (state, action) => {
        },

        //댓글 작성
        [__postComment.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__postComment.fulfilled]: (state, action) => {
            const content = {
                commentId:action.payload.id,
                content:action.payload.content,
                writer:action.payload.writer,
                correct:"correct"
            }
            state.post.comments.push(content)
            state.isLoading = false;
            alert("댓글등록이 완료되었습니다.")
        },
        [__postComment.rejected]: (state, action) => {
        },
        //댓글 삭제
        [__deleteComment.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__deleteComment.fulfilled]: (state, action) => {
            const idx = state.post.comments.findIndex(comment=> comment.commentId === action.payload.id)
            state.post.comments.splice(idx, 1)
            state.isLoading = false;
            alert("댓글삭제가 완료되었습니다.")
        },
        [__deleteComment.rejected]: (state, action) => {
        },
        //댓글 수정
        [__updateComment.pending]: (state, action) => {
            state.isLoading = true;
        },
        [__updateComment.fulfilled]: (state, action) => {
            const idx = state.post.comments.findIndex(comment=> comment.commentId === action.payload.id)
            const new_content = {...action.payload, correct : true}
            state.post.comments.splice(idx, 1, new_content )
            state.isLoading = false;
            alert("댓글수정이 완료되었습니다.")
        },
        [__updateComment.rejected]: (state, action) => {
        },
    }
})
export const { isSuccessFalse } = postSlice.actions
export default postSlice.reducer;