import React, { useEffect, useCallback } from 'react';
import Editor from '../Editor';
import { useSelector, useDispatch } from 'react-redux';
import { changeField, initialize } from '../../../../../../stores/mysns/actions/write';
interface write {
  content: string,
  rating: number,
  title: string,
  wid: number,
}
const EditorContainer = () => {
  const dispatch = useDispatch();
  const { content, rating, title, wid } = useSelector(( write: write) => ({
    content: write.content,
    rating: write.rating,
    title: write.title,
    wid: write.wid,
  }));
  const onChangeField = useCallback(payload => dispatch(changeField(payload)), [
    dispatch,
  ]);
  // 언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return <Editor onChangeField={onChangeField} content={content} rating={rating} title={title} wid={wid} />;
};

export default EditorContainer;