import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { actionAuthorInfo } from "../problems/problemsSlice";
import { RootState } from "../../app/store";
import { COMMENTS_URL } from "../../assets/hostConfig";
import axios from "axios";

export enum COMMENTS_ACTION_TYPE {
  ADD_COMMENT = "comment/addComment",
  LIKE_COMMENT = "comment/likeComment",
  DISLIKE_COMMENT = "comment/dislikeComment",
  EDIT_COMMENT = "comment/editComment",
  DELETE_COMMENT = "comment/deleteComment",
  GET_ONE_COMMENT = "comment/getOneComment",
  GET_COMMENTS = "comment/getComments",
  GET_COMMENTS_BY_AUTHOR = "comment/getCommentsByAuthor",
}

export interface Comment {
  id: string;
  author: string;
  authorId: string;
  problemId: string;
  details: string;
  dateCreated: string;
  dateEdited: string;
  reactions: {
    totalLikes: number;
    totalDislikes: number;
    likes: actionAuthorInfo[];
    dislikes: actionAuthorInfo[];
  };
  type: string;
}

interface InitialComments {
  comments: Comment[];
  currentComment: Comment;
}
export const initialComment: Comment = {
  id: "",
  author: "",
  authorId: "",
  problemId: "",
  details: "",
  dateCreated: "",
  dateEdited: "",
  reactions: {
    totalLikes: 0,
    totalDislikes: 0,
    likes: [],
    dislikes: [],
  },
  type: "",
};

const initialComments: InitialComments = {
  comments: [],
  currentComment: initialComment,
};

export const addComment = createAsyncThunk(
  COMMENTS_ACTION_TYPE.ADD_COMMENT,
  async (
    { newComment, problemId }: { newComment: string; problemId: string },
    { getState }
  ) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: Comment } = await axios.put(
        `${COMMENTS_URL}/addcomment/${problemId}`,
        {
          details: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      console.log("error after addComment:", err);
    }
  }
);
export const likeComment = createAsyncThunk(
  COMMENTS_ACTION_TYPE.LIKE_COMMENT,
  async (
    { commentId, problemId }: { commentId: string; problemId: string },
    { getState }
  ) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { status }: { status: number } = await axios.put(
        `${COMMENTS_URL}/likecomment/${problemId}/${commentId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return status
    } catch (err: any) {
      console.log("error after addComment:", err);
    }
  }
);
export const dislikeComment = createAsyncThunk(
  COMMENTS_ACTION_TYPE.DISLIKE_COMMENT,
  async (
    { commentId, problemId }: { commentId: string; problemId: string },
    { getState }
  ) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { status }: { status: number } = await axios.put(
        `${COMMENTS_URL}/dislikecomment/${problemId}/${commentId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return status;
    } catch (err: any) {
      console.log("error after addComment:", err);
    }
  }
);
export const getComments = createAsyncThunk(
  COMMENTS_ACTION_TYPE.GET_COMMENTS,
  async (problemId: string, { getState }) => {
    const {
      account: { token },
    } = getState() as RootState;
    try {
      const { data }: { data: Comment[] } = await axios.get(
        `${COMMENTS_URL}/getcomments/${problemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err: any) {
      console.log("error after getComments:", err);
    }
  }
);
export const editComment = createAsyncThunk(
  COMMENTS_ACTION_TYPE.EDIT_COMMENT,
  async (
    { commentId, editedComment }: { commentId: string; editedComment: string },
    { getState }
  ) => {
    const {
      account: { token, userId },
      problems: { currentProblem },
    } = getState() as RootState;
    try {
      const { status }: { status: number } = await axios.put(
        `${COMMENTS_URL}/editcoment/${userId}/${currentProblem.id}/${commentId}`,
        {
          details: editedComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return status;
    } catch (err: any) {
      console.log("error after editComment:", err);
    }
  }
);
export const deleteComment = createAsyncThunk(
  COMMENTS_ACTION_TYPE.DELETE_COMMENT,
  async (commentId: string, { getState }) => {
    const {
      account: { token, userId },
      problems: { currentProblem },
    } = getState() as RootState;
    try {
      const { status }: { status: number } = await axios.delete(
        `${COMMENTS_URL}/deletecomment/${userId}/${currentProblem.id}/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return status;
    } catch (err: any) {
      console.log("error after deleteComment:", err);
    }
  }
);

export const CommentsSlice = createSlice({
  name: "comments",
  initialState: initialComments,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addComment.fulfilled, (state, action) => {
        state.currentComment = action.payload ?? state.currentComment;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload ?? state.comments;
      });
  },
});

export default CommentsSlice.reducer;
export const selectComments = (state: RootState) => state.comments.comments;
