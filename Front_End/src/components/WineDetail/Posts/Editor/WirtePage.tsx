import React from 'react';
import EditorContainer from './containers/EditorContainer';
import WriteActionButtonsContainer from './containers/WriteActionButtonsContainer';
import WriteActionButtons from './WriteActionButtons';

interface params {
  wid: number,
  onCancel: any,
}

export default function WritePage( {wid, onCancel}:params ) {
  return(
    <div>
      <EditorContainer  wineId={wid} />
      <WriteActionButtonsContainer onCancel={onCancel} />
    </div>
  );
}