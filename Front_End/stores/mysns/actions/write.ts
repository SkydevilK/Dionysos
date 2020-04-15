import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
// import * as postsAPI from '../lib/api/post';
import writePosts from '../lib/api/post';
import { takeLatest } from 'redux-saga/effects';
import { Record, Map, List } from 'immutable';
// import writePost from '../lib/api/post'

const INITIALIZE = 'write/INITIALIZE'; // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; // 특정 key 값 바꾸기
const [
  WRITE_POST,
  WRITE_POST_SUCCESS,
  WRITE_POST_FAILURE,
] = createRequestActionTypes('write/WRITE_POST'); // 포스트 작성

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }:params) => ({key, value}));

export const writePost = createAction(WRITE_POST, ({content, rating, title, wid}: ContentsStateParams) => ({content, rating, title, wid}));


const ContentsStateRecord = Record({
  content: '',
  rating: 0,
  title: '',
  wid: 0,
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
}

export class ContentsState extends ContentsStateRecord {
  content?: string;
  rating?: number;
  title?: string;
  wid?: number;
  post?: any;
  postError?: any;
}
// Saga 생성
const writePostSaga = createRequestSaga(WRITE_POST, writePosts);
export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
}

// const initialContent = 

const initialState = {
  content: '',
  rating: 0,
  title: '',
  wid: 0,
  post: null,
  postError: null,
};

const write = handleActions<ContentsStateParams, any>(
  { 
    [INITIALIZE]: state => initialState, // initialState를 넣으면 초기상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value }}) => ({
      ...state,
      [key]: value
    }),
    [WRITE_POST]: (state:any) => ({
      ...state,
      post: null,
      postError: null,
    }),

    // 포스트 작성 성공
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    // 포스트 작성 실패
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError
    }),
  },
  initialState,
);
export default write;
