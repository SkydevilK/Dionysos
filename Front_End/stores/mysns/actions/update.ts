import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
// import * as postsAPI from '../lib/api/post';
import updatePosts from '../lib/api/update';
import deletePosts from '../lib/api/delete';

import { takeLatest } from 'redux-saga/effects';
import { Record, Map, List } from 'immutable';
// import writePost from '../lib/api/post'

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기
const KEEPUP = 'write/KEEPUP';

const [
  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
] = createRequestActionTypes('write/UPDATE_POST'); // 포스트 작성

const [
  DELETE_POST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
] = createRequestActionTypes('write/DELETE_POST'); // 포스트 작성

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }:params) => ({key, value}));
export const keepUp = createAction(KEEPUP, ({content, rating, title, wid, fid}: ContentsStateParams) => ({content, rating, title, wid, fid}));

export const updatePost = createAction(UPDATE_POST, ({content, rating, title, wid, fid}: ContentsStateParams) => ({content, rating, title, wid, fid}));
export const deletePost = createAction(DELETE_POST, ({content, rating, title, wid, fid}: ContentsStateParams) => ({content, rating, title, wid, fid}));

const ContentsStateRecord = Record({
  content: '',
  rating: 0,
  title: '',
  wid: 0,
  fid: 0,
  post: null,
  postError: null,
}); 

interface params {
  key:number,
  value:any
}

interface ContentsStateParams {
  content: any,
  rating?: number,
  title: any,
  wid?: number,
  post?: any,
  postError?: any,
  fid? : any
}


export class UpdateContentsState extends ContentsStateRecord {
  content?: string;
  rating?: number;
  title?: string;
  wid?: number;
  fid?: number;
  post?: any;
  postError?: any;
  
}


const updatePostSaga = createRequestSaga(UPDATE_POST, updatePosts); // axios function 생성 필요
export function* updateSaga() {
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const deletePostSaga = createRequestSaga(DELETE_POST, deletePosts); // axios function 생성 필요
export function* deleteSaga() {
  yield takeLatest(DELETE_POST, deletePostSaga);
}

const initialState = {
  content: '',
  rating: 0,
  title: '',
  wid: 0,
  fid: 0,
  post: null,
  postError: null,
};

const update = handleActions<ContentsStateParams, any>(
  { 
    [INITIALIZE]: state => initialState, // initialState를 넣으면 초기상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value }}) => ({
      ...state,
      [key]: value
    }),

    // 기존 가지고 있던 데이터를 editor로 올리는 기능
    [KEEPUP]: (state: any ) => ({
      ...state
    }),

    // 포스트 수정
    [UPDATE_POST]: (state:any, action:any) => ({
      ...state,
      post: null,
      postError: null,
    }),

    // 포스트 수정 성공
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post
    }),
    // 포스트 수정 실패
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError
    }),

    [DELETE_POST]: (state:any, action:any) => ({
      ...state,
      post: null,
      postError: null,
    }),

    // 포스트 수정 성공
    [DELETE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post
    }),
    // 포스트 수정 실패
    [DELETE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError
    }),
  
    
  },
  initialState,
);
export default update;

