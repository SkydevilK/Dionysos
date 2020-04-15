import React, {useRef, useEffect} from 'react';
// import * as Quill from 'quill';
import * as Q from 'quill';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';

const Quill: any = Q;
// import styled from 'styled-components'
import { makeStyles, Theme, createStyles, styled } from '@material-ui/core/styles';
import { rootState } from '../../../../stores/login/store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  }),

);

interface write {
  content: string,
  rating: number,
  title: string,
  wid: number,
}

interface post {
  contentChange: string,
  ratingChange: number,
  titleChange: string,
  widChange:number,
  onChangeField: any
}

export default function Editor({ contentChange, ratingChange, titleChange, widChange, onChangeField}: post){
  const { content, rating, title, wid } = useSelector(( state: rootState ) => (
    state.write
  ));


  const [value, setValue] = React.useState<number | null>(2);

  const quillElement = useRef<any>();
  const quillInstance = useRef<any>();
  useEffect(() => {
    console.log('제목');
    console.log(title)
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      modules: {
        // 더 많은 옵션
        // https://quilljs.com/docs/modules/toolbar/ 참고
        toolbar: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'code-block', 'link', 'image'],
        ],
      },
    });

    // quill에 text-change 이벤트 핸들러 등록
    // 참고: https://quilljs.com/docs/api/#events
    const quill = quillInstance.current;
    
    quill.on('text-change', (delta: any, oldDelta: any, source : any) => {
      if (source === 'user') {
        onChangeField({ key: 'content', value: quill.root.innerHTML });
      }
    });
    
  }, [onChangeField]);

  const onChangeTitle = (e: any) => {
    onChangeField({ key: 'title', value: e.target.value });
  };

  return (
    <div>
      <div>
        제목 : <input
        onChange={onChangeTitle}
        value={title}
      /></div>
      
        <div ref={quillElement} />

      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Controlled</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            onChangeField({ key: 'rating', value: newValue as number })
          }}
        />
      </Box>
    </div>
  );
};
