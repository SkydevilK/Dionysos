import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from 'react-router-dom';
import WriteActionButtons from '../WriteActionButtons';
import { useSelector, useDispatch } from 'react-redux';
import update, {updatePost} from '../../../../../stores/mysns/actions/update';
import { rootState } from '../../../../../stores/login/store';


interface Props extends RouteComponentProps {}
interface update {
  content: string,
  rating: number,
  title: string,
  wid: number,
  fid: number,
  post: any,
  postError: any,
}


const WriteActionButtonsContainer = ( {onCancel}:any) => {
  console.log('aaaaaaa')
  const dispatch = useDispatch();
  const { content, rating, title, wid, fid, post, postError } = useSelector(( state: rootState ) => (
    state.update
  ));
  console.log(content, rating, title, wid, fid, post, postError)
  function refreshPage() {
    window.location.reload(true);
  }
  // 포스트 등록
  const onPublish = () => {
    dispatch(
      refreshPage
    )
    console.log('fid');
    console.log(fid)
    console.log('publish')
    dispatch(
      updatePost({
        content,
        rating,
        title,
        wid,
        fid
      },),
    );
  };


  // // 성공 혹은 실패시 할 작업
  // useEffect(() => {
  //   if (post) {
  //     const { _id, user } = post;
  //     history.push(`/@${user.username}/${_id}`);
  //   }
  //   if (postError) {
  //     console.log(postError);
  //   }
  // }, [history, post, postError]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;

  
};

// export default withRouter(WriteActionButtonsContainer);
export default WriteActionButtonsContainer;
