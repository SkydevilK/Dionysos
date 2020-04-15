import React, {useRef, useEffect} from 'react';
// import * as Quill from 'quill';
import * as Q from 'quill';
import Button from '@material-ui/core/Button';

const Quill: any = Q;
// import styled from 'styled-components'
import { makeStyles, Theme, createStyles, styled } from '@material-ui/core/styles';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

  }),

);

interface post {
  content: string,
  rating: number,
  title: string,
  wid:number,
  onChangeField: any
}

export default function Editor({ content, rating, title, wid, onChangeField}: post){
  const quillElement = useRef<any>();
  const quillInstance = useRef<any>();
  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: '내용을 작성하세요...',
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

  const onChangeRating = (e: any) => {
    onChangeField({ key: 'rating', value: e.target.value as number });
  };
  
  return (
    <div>
      <input
        placeholder="제목을 입력하세요"
        onChange={onChangeTitle}
        value={title}
      />
        <div ref={quillElement} />
    </div>
  );
};
