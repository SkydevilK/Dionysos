import React, { useState, useEffect } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { Typography, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Star from "../Star";
import CommentIcon from "@material-ui/icons/Comment";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { withRouter, RouteComponentProps } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Rating from "@material-ui/lab/Rating";
import FavoriteIcon from "@material-ui/icons/Favorite";
// Redux
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../../../stores/login/store';
import {
  getFeedDetailByFID, postComment, followUserByUID, UnfollowUserByUID, createFeedLike, deleteFeedLike
  , deleteCommentAndUpdate
} from '../../../../stores/feed/actions/feedDetail';

import { Comment, Form, Header } from 'semantic-ui-react'

import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import WritePage from '../../Interface/Editor/WirtePage';
import ReviewInfo from '../../Interface/Review';
import {deletePost} from '../../../../stores/mysns/actions/update';

interface params{
  review: ReviewInfo
}

// 모달 사이즈 조절
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
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    },
    menuContainer:{
      float: "right"
    },
    // headerContainer: {
    //   display: "flex"
    // },
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,

    },
    rating: {
      display: "inline-block",
      float: "right",
      position: "relative"
    },
    table: {
      maxHeight: "100px",
      overflowY: "auto"
    },

    back: {
      fontSize: 24
    },
    title: {
      fontSize: 48,
      padding: 48,
      textAlign: "center"
    },
    dividerFullWidth: {
      fontSize: 20,
      marginTop: 20
    },
    avatar: {
      display: "inline-block"
    },
    follow: {
      display: "inline-block",
      marginLeft: '10px',
      // float: "right"
    },
    visit: {
      display: "inline-block",
      float: "right",
      marginLeft: 30
    },
    wine: {
      fontSize: 24,
      marginTop: 32,
      marginBottom: 32
    },
    star: {
      position: "relative",
      display: "inline",
      float: "right"
    },
    divider: {
      width: 400
    },
    commentIcon: {
      display: "inline-block",
      marginTop: 40
    },
    heart: {
      display: "inline-block",
      // float: "right"
    }
  })
);

interface RouterProps {
  // type for `match.params`
  fid: string; // must be type `string` since value comes from the URL
}
interface MyComponentProps extends RouteComponentProps<RouterProps> {
  fid: number;
}
interface Props extends RouteComponentProps {}
function ReviewDetail(props: MyComponentProps) {
  const classes = useStyles();
  const fid = +props.match.params.fid;
  
  const [feedState, setFeedState] = React.useState(false);
  const {
    feedDetail,
    isFeedDetailError,
    commentList,
    isFeedDetailSucceess,
    isFeedDetailPending
  } = useSelector((state: rootState) => state.FeedDetailReducer);

  const [value, setValue] = React.useState<number | null>(2);
  const [likeState, setLikeState] = React.useState(false);
  const [followState, setFollowState] = React.useState(false);
  const [comment, setComment] = useState("");
  
  const review = {
    user: feedDetail.user, 
    fid: feedDetail.fid, 
    title: feedDetail.title, 
    nameEng: feedDetail.wine.nameEng, 
    content: feedDetail.content,
    rating: feedDetail.rating, 
    wine: feedDetail.wine
  }
  const userData = sessionStorage.getItem('uid'); // string
  const feedUserData = String(review.user.uid)

  const goBack = () => {
    window.history.back();
  }

  const dispatch = useDispatch();
  const onDelete = () => {

    dispatch(
      deletePost({
        content: review.content, 
        rating: review.rating, 
        title: review.title, 
        wid: review.wine.wid, 
        fid: review.fid
        
      })
    )
    dispatch(
      window.setTimeout(goBack,1000)
      )
    

  }



  const handleClose = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

    // 모달 상태 관리
    const [modalStyle] = React.useState(getModalStyle);
    const [openModal, setOpenModal] = React.useState(false);



  const userComment = async () => {
    await dispatch(postComment(comment, fid));
  };

  const follow = async () => {
    await dispatch(followUserByUID(feedDetail.user.uid));
    setFollowState(true);
  };

  const unfollow = async () => {
    await dispatch(UnfollowUserByUID(feedDetail.user.uid));
    setFollowState(false);
  };

  const likeThis = async () => {
    await dispatch(createFeedLike(fid));
    setLikeState(true);
  };

  const hateThis = async () => {
    await dispatch(deleteFeedLike(fid));
    setLikeState(false);
  };



  const deleteCommentByUser = async (cid: any) => {
    await dispatch(deleteCommentAndUpdate(fid, cid));
    dispatch(getFeedDetailByFID(fid));
    setFeedState(true);


    let userLikeFeed = JSON.parse(sessionStorage.getItem('userLikeFeed') || '{}');


    for (var i = 0; i < userLikeFeed.length; i++) {
      if (userLikeFeed[i].fid == fid) {
        setLikeState(true)
        break
      }
    }
  };



  if (!feedState) {


    let userLikeFeed = JSON.parse(
      sessionStorage.getItem("userLikeFeed") || "{}"
    );

    for (var i = 0; i < userLikeFeed.length; i++) {
      if (userLikeFeed[i].fid == fid) {
        setLikeState(true);
        break;
      }
    }



    let userFollow = JSON.parse(
      sessionStorage.getItem("userFollow") || "{}"
    );

    for (var i = 0; i < userFollow.length; i++) {
      if (userFollow[i].uid === feedDetail.user.uid) {
        setFollowState(true);
        break;
      }
    }

    dispatch(getFeedDetailByFID(fid));
    setFeedState(true);
  } else {

  }
  return (

    <Container>
      <div style={{ height: 100 }}></div>
      <Box color="text.primary">
        <Link
          to="/wineReview"
          style={{ textDecoration: "none", color: "#000000" }}
        >
          <Typography className={classes.back}>&lt; ReviewList</Typography>
        </Link>
        <Typography className={classes.title} style={{ fontSize: '36px' }}>{feedDetail.title}</Typography>
        <span>
          <Avatar
            className={classes.avatar}
            alt="Remy Sharp"
            src="https://image.flaticon.com/icons/svg/1150/1150262.svg"
          />
        </span>
        <Link
          to={`/friend/${feedDetail.user.uid}`}
          style={{ textDecoration: "none" }}
        >
          <span style={{ fontSize: 24 }}>작성자
           {feedDetail.user.nickName}</span></Link>
        {(function () {
          if (!followState) {
            return (
              <Button
                variant="contained"
                color="primary"
                className={classes.follow}
                onClick={follow}
              >
                팔로우
                </Button>
            );
          } else {
            return (
              <Button
                variant="contained"
                color="primary"
                className={classes.follow}
                onClick={unfollow}
              >
                팔로우취소
                </Button>
            );
          }
        })()}
        <br />
        {/* <span style={{ fontSize: 24 }}>[작성 시간]</span> */}
        <span>
          <Typography className={classes.visit}>[방문자수] {feedDetail.visit}</Typography>
          <Typography className={classes.visit}>[좋아요수] {feedDetail.likeNum}</Typography>
          {(function () {

            if (likeState) {

              return (
                <IconButton aria-label="add to favorites" onClick={hateThis} className={classes.heart}>
                  <FavoriteIcon color="secondary" />

                </IconButton>
              )
            } else {
              return (

                <IconButton aria-label="add to favorites" onClick={likeThis} className={classes.heart}>
                  <FavoriteIcon color="inherit" />
                </IconButton>
              );
            }
          })()}

        </span>
        <Divider component="li" />
        <Box component="span" m={1} style={{ height: '50px' }}>
          
          <span className={classes.wine} style={{ fontSize: '24px' }}>
            {feedDetail.wine.nameKor}

          </span>
          <Rating
            name="simple-controlled"
            value={feedDetail.rating}
            size="large"
            style={{ marginLeft: '10px' }}
          />
          
          {userData === feedUserData &&
              <div className={classes.menuContainer}>
                <Button onClick={handleClose}>수정</Button>
                <Button onClick={onDelete}>삭제</Button>
              </div>
            }
          {/* 모달 */}
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={openModal}
            onClose={handleModalClose}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2 id="simple-modal-title">My Review</h2>
              <div>
                {/* 에디터 들어갈 공간 */}
                <WritePage review={review} onCancel={handleModalClose} />
              </div>


            </div>
          </Modal>
          {/* <span className={classes.star}>별점:</span> */}
        </Box>
        <Divider className={classes.divider} />


        <Card variant="outlined">
          <CardContent>
            <Typography
              className={classes.dividerFullWidth}
              color="initial"
              display="block"
              variant="caption"
            >
              <div dangerouslySetInnerHTML={{ __html: feedDetail.content }}>
              </div>
            </Typography>
          </CardContent>
        </Card>

        <CommentIcon className={classes.commentIcon} />
        <Typography className={classes.commentIcon}>
          {" "}
          댓글 [댓글 숫자 표시]
        </Typography>
      </Box>
      <Box style={{ overflow: "auto" }}>
        <Divider component="li" />
        <Table className={classes.table}>

          {commentList.map((comment: any) => (

            <TableRow key={comment.cid}>
              <TableCell component="th" scope="row">
                {comment.content} 작성자 : {comment.user.nickName} : {comment.createdTimeAt}

                {comment.user.uid == sessionStorage.getItem("uid") ?
                  (<Button onClick={() => deleteCommentByUser(comment.cid)}>댓글삭제</Button>)
                  : (<span></span>)
                }
              </TableCell>
            </TableRow>

          ))}

        </Table>
      </Box>

      <TextField
        style={{ width: "100%", marginTop: 20 }}
        onChange={e => setComment(e.target.value)}
        value={comment} placeholder="댓글을 남겨주세요"
      >
        댓글 작성 창
      </TextField>

      <Button
        style={{ display: "inline-block", float: "right" }}
        onClick={userComment}
      >
        댓글 작성
      </Button>

    </Container>
  );
}

export default withRouter(ReviewDetail);
