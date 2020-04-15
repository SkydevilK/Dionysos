import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles, Theme, createStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";

import PostList from "./Posts/PostList";
import WritePage from "./Posts/Editor/WirtePage";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // itemContainer: {
    //   width: "331px",
    //   boxSizing: "border-box",
    //   background: "#fff",
    //   borderRadius: "3px",
    //   border: "solid 1px #ddd",
    //   marginTop: "15px",
    //   padding: "15px",
    //   fontSize: "12px",
    //   marginRight: "15px",
    // },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    widContainer: {
      marginBottom: "10px"
    }
  })
);

export default function Feed() {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        게시글 작성
      </button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">My Review</h2>
          <div>
            {/* 에디터 들어갈 공간 */}
            <WritePage onCancel={handleClose}/>
          </div>
        </div>
      </Modal>
      {/* 작성된 Post를 전부 모아두는 곳 */}
    
      <PostList />
    </div>
  );
}
