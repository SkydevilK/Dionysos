// 실질적인 Review를 보여주는 component
// li tag 내에 구현


import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import LongMenu from './LongMenu';

import Comment from './Comment';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    postBox: {
      // borderBottom: "solid 1px #dddfe2",
      marginBottom: "20px",
    },
    post: {
      position: "relative",
      listStyle: "none",

    },
    postHeader: {
      display: "flex",
      height: "80px",
      borderBottom: "solid 1px #dddfe2"
    },
    postProfileImg: {
      backgroundSize: "contain",
      borderRadius: "100%",
      height: "40px",
      width: "40px",
      marginRight: "10px",
      cursor: "pointer",
      color: "#ffffff",
    },
    postProfileAuthor: {
      fontSize: "14px",
      // fontWeight: "500",
      color: "#315796",
      cursor: "pointer",
      display: "inline-block",
    },
    nickContainer: {
      marginTop: "5px",
      display: 'flex',
      alignContent: "space-between",
      flexWrap: "wrap",
      flexDirection: "column",
      height: "40px"
    },
    editMenu: {
      float: "right"
    },
    postBody: {
      fontSize: "14px",
      height: "50px",
      marginTop: "10px",
    },
    postDate: {
      fontSize: "12px",
      color: "#606778",
    },
    likes: {
      display: "flex",
      margin: "0px -15px -25px -15px",
      padding: "15px",
      borderTop: "solid 1px #dddfe2",

    }

  })
);

interface CommentList {
  pk: number,
  userId: string,
  feedId: number,
  contents: string,
}

interface Posts {
  key: number,
  userId: string,
  date: number,
  contents: string,
  w_Id: number,
  picture: string,
  score: number,
  likeNum: number,
  comments: Array<CommentList>,
}

// interface FeedByUser 

const url = 'http://res.cloudinary.com/dmynah8jz/image/upload/c_scale,w_653/v1523046075/no_face.png'

export default function Post(post: Posts) {
  const classes = useStyles();

  return (
    <div className={classes.postBox}>
      <li className={classes.post}>
        <div className={classes.postHeader}>

          <div
            style={{

              backgroundImage: `url("${url}")`
            }}
            className={classes.postProfileImg}
          />
          <div>
            <div className={classes.nickContainer}>
              <h3 className={classes.postProfileAuthor}>
                {post.userId}
                {/* 프로필로 연결 필요 */}
              </h3>
              <div className={classes.editMenu}>
                <LongMenu />
              </div>
            </div>
            <p className={classes.postDate}>
              {new Date(post.date).toDateString()}
            </p>
          </div>
        </div>
        <div className={classes.postBody}>
          {post.contents}
        </div>
        {/* 좋아요 기능 구현 => clickhandle 함수 구현 필요 */}
        <div className={classes.likes}>
            <ThumbUpAltIcon />
            <div>{post.likeNum}</div>

        </div>
        {/* 댓글 listup 필요 */}
        <Comment />
      </li>
    </div>
  );
}