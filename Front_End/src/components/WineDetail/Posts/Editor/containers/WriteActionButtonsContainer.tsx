import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import WriteActionButtons from '../WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import write, {writePost} from '../../../../../../stores/mysns/actions/write';
import { rootState } from '../../../../../../stores/login/store';


interface Props extends RouteComponentProps {}
interface write {
  content: string,
  rating: number,
  title: string,
  wid: number,
  post: any,
  postError: any,
}


const WriteActionButtonsContainer = ( {onCancel}:any ) => {
  const dispatch = useDispatch();
  const { content, rating, title, wid, post, postError } = useSelector(( state: rootState ) => (
    state.write
  ));
  function refreshPage() {
    window.location.reload(true);
  }
  // 포스트 등록
  const onPublish = () => {
    dispatch(
      refreshPage
    )
    dispatch(
      writePost({
        content,
        rating,
        title,
        wid,
      }),
    );
  };

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
  
};

export default WriteActionButtonsContainer;
