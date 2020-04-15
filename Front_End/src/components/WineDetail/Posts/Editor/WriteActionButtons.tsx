import React from 'react';
import Button from '@material-ui/core/Button';

import { makeStyles, Theme, createStyles, styled } from '@material-ui/core/styles';


export default function WriteActionButtons( params: { onCancel: any, onPublish: any }) {
  return (
    <div>
      <Button variant="outlined" onClick={params.onPublish}>
        포스트 등록
      </Button>
      <Button variant="outlined" onClick={params.onCancel}>
        취소
      </Button>
      </div>
  );
};