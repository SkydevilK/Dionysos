import React, { Component } from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Post from './Post';

let posts = [
  {
    "pk": 1,
    "userId": "sysh5656@naver.com",
    "date": 20200127,
    "contents": "aaa",
    "w_Id": 1,
    "picture": "",
    "score": 8,
    "likeNum": 5,
    "comments": [
      {
        "pk": 1,
        "userId": "sysh5656@naver.com",
        "feedId": 1,
        "contents": "aaaa"
      },
      {
        "pk": 2,
        "userId": "sysh5656@naver.com",
        "feedId": 1,
        "contents": "aaaaaa"
      }
    ]
  },
]
let feedLikeFindByUser = [
  {
    "fid": 1,
  }
]


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    itemContainerPost: {
      width: "600px",
      borderRadius: "5px",
      // width: "331px",
      boxSizing: "border-box",
      background: "#fff",
      // borderRadius: "3px",
      border: "solid 1px #ddd",
      marginTop: "15px",
      padding: "15px",
      fontSize: "12px",
      marginRight: "15px",
    },
    itemList: {
      padding: "0px 0px 0px 0px"
    }
  })
);


export default function PostList() {
  const classes = useStyles();

  return (

    // 
    <div className={classes.itemContainerPost}>

      <ul className={classes.itemList}>
        {posts.map(post => <Post
          key={post.pk}
          userId={post.userId}
          date={post.date}
          contents={post.contents}
          w_Id={post.w_Id}
          picture={post.picture}
          score={post.score}
          likeNum={post.likeNum}
          comments={post.comments} />)}
      </ul>
    </div>
  );

}