import { applyMiddleware, compose, createStore } from 'redux';
import { combineReducers } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk';
import { all } from 'redux-saga/effects';
import loginReducer from '../reducers/login_reducer';
import registerReducer from "../../register/reducers/register_reducer";
import wineReducer from "../../wine_info/reducers/wine_reducer";
import wineRankReducer from "../../wine_info/reducers/wineRank_reducer";
import wineDetailReducer from "../../wine_info/reducers/wineDetail_reducer";
import feedReducer from "../../feed/reducers/feed_reducer";
import feedAllReducer from "../../feed/reducers/feed_all_reducer";
import SmartSearchReducer from "../../smartSearch/reducers/wine_reducer";
import MyFeedReducer from "../../my_sns/reducers/myFeed_reducer";
import FollowReducer from "../../my_sns/reducers/follow_reducer";
import FeedDetailReducer from "../../feed/reducers/feed_detail_reducer";
import FriendFollowReducer  from "../../your_sns/reducers/follow_reducer";
import FriendFeedReducer from "../../your_sns/reducers/userFeed_reducer";
import FriendInfoReducer from "../../your_sns/reducers/friendInfo_reducer";

import {loginState} from "../reducers/login_reducer";
import {registerState} from "../../register/reducers/register_reducer";
import {wineState} from "../../wine_info/reducers/wine_reducer";
import {wineRankState} from "../../wine_info/reducers/wineRank_reducer";
import {wineDetailState} from "../../wine_info/reducers/wineDetail_reducer";
import {feedState} from "../../feed/reducers/feed_reducer";
import {feedAll} from "../../feed/reducers/feed_all_reducer";
import {smartSearch} from "../../smartSearch/reducers/wine_reducer";
import {userFeedState} from "../../my_sns/reducers/myFeed_reducer";
import {userFollow} from "../../my_sns/reducers/follow_reducer";
import {friendFollow} from "../../your_sns/reducers/follow_reducer";
import {friendFeedState} from "../../your_sns/reducers/userFeed_reducer";
import { Friend} from "../../your_sns/reducers/friendInfo_reducer";
import write, {writeSaga, ContentsState} from "../../mysns/actions/write"
import update, {updateSaga, deleteSaga, UpdateContentsState} from "../../mysns/actions/update"
import loading, {ILoadingState} from '../../mysns/lib/loading';


import {feedDetail} from "../../feed/reducers/feed_detail_reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware()

const middlewares: any[] = [];

// middlewares.push(logger);
middlewares.push(thunk);
middlewares.push(sagaMiddleware);

const rootReducer = combineReducers({
  loginReducer,
  registerReducer,
  wineReducer,
  wineRankReducer,
  wineDetailReducer,
  feedReducer,
  feedAllReducer,
  SmartSearchReducer,
  MyFeedReducer,
  write,
  update,
  loading,
  FeedDetailReducer,
  FollowReducer,
  FriendFollowReducer,
  FriendFeedReducer,
  FriendInfoReducer,
});

export interface rootState {
  loginReucer : loginState,
  registerReducer: registerState,
  wineReducer : wineState,
  wineRankReducer : wineRankState,
  wineDetailReducer : wineDetailState,
  feedReducer : feedState,
  feedAllReducer : feedAll,
  SmartSearchReducer : smartSearch
  MyFeedReducer : userFeedState,
  write: ContentsState,
  update: UpdateContentsState,
  loading: ILoadingState,
  FeedDetailReducer : feedDetail,
  FollowReducer : userFollow,
  FriendFollowReducer : friendFollow,
  FriendFeedReducer : friendFeedState,
  FriendInfoReducer : Friend,
}

export function* rootSaga() {
  yield all([writeSaga(), updateSaga(), deleteSaga()]);
}

export default function configureStore(initialState : any) {
  
  const store = createStore(
    rootReducer,
    initialState,
    // applyMiddleware(...middlewares)
    composeWithDevTools(
      applyMiddleware(...middlewares)
    )
  )
  sagaMiddleware.run(rootSaga)
  return store
}

