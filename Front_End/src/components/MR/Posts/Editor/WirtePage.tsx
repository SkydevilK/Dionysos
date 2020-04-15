import React from 'react';
import EditorContainer from './containers/EditorContainer';
import WriteActionButtonsContainer from './containers/WriteActionButtonsContainer';
import WriteActionButtons from './WriteActionButtons';

export default function WritePage({ onCancel}: any ) {
  return(
    <div>
      <EditorContainer />
      <WriteActionButtonsContainer onCancel={onCancel} />
    </div>
  );
}