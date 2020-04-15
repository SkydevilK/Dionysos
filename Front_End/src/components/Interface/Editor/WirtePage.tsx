import React from 'react';
import EditorContainer from './containers/EditorContainer';
import WriteActionButtonsContainer from './containers/WriteActionButtonsContainer';
import WriteActionButtons from './WriteActionButtons';
import ReviewInfo from '.././Review';

interface params {
  review: ReviewInfo
  onCancel: any,
}

export default function WritePage( {review, onCancel}:params ) {
  return(
    <div>
      <EditorContainer  review={review} />
      <WriteActionButtonsContainer onCancel={onCancel} fid={review.fid} />
    </div>
  );
}