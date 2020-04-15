import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ReviewInfo from "../../components/Interface/Review";
import "antd/dist/antd.css";
import { Pagination } from "antd";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../stores/login/store";
import { getFeedAll } from "../../../stores/feed/actions/feedAll";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    heroContent: {
      padding: theme.spacing(15, 0, 20),
      backgroundImage:
        "url(https://t3.ftcdn.net/jpg/02/45/32/14/240_F_245321431_XblUS9Lu1sYKcwy68rjejTuzPXhgkLf7.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",

      backgroundPosition: "left",
      color: "#ffffff"
    },
    card: {
      maxWidth: 300,
      height: "100%",
      flexDirection: "column",
      marginLeft: 20,
      marginRight: 20
    },
    media: {
      height: 0,
      paddingTop: "90%" // 16:9
    },

    cardGrid: {
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(12)
    },
    divider: {
      backgroundColor: "#36342f",
      marginBottom: "80px"
    },
    divider2: {
      backgroundColor: "#36342f",
      marginTop: "100px",
      position: "relative",
      zIndex: 6
    },
    btn: {
      fontSize: "25px",
      paddingLeft: "50px",
      paddingRight: "50px"
    },
    btnGroup: {
      display: "flex",
      justifyContent: "center",
      zIndex: 5,
      position: "relative"
      // marginTop: "20px",
    },
    total: {
      display: "inline-block",
      marginLeft: "15px"
    },
    search: {
      display: "flex",
      justifycontent: "right"
    },
    home: {
      display: "flex",
      float: "right",
      marginRight: "80px",
      marginTop: "70px"
    },
    more: {
      "& > *": {
        margin: theme.spacing(1, 8)
      }
    },
    pagination: {
      textAlign: "center",
      marginTop: "100px"
    }
  })
);

export default function List() {
  const classes = useStyles();
  const [reviewState, setReviewState] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(30);
  const dispatch = useDispatch();
  //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
  const {
    feedAll,
    isFeedAllPending,
    isFeedAllSucceess,
    isFeedAllError
  } = useSelector((state: rootState) => state.feedAllReducer);

  let start: number = 0;
  let end: number = 0;

  const loadReviewList = async () => {
  
    await dispatch(getFeedAll());
  };
  const numEachPage: number = 30;

  const handleChange = (value: number) => {
    setMinValue((value - 1) * numEachPage);
    setMaxValue(value * numEachPage);
    // setState({
    //   minValue: (value - 1) * numEachPage,
    //   maxValue: value * numEachPage
    // });
  };

  if (!isFeedAllSucceess && !reviewState) {
    loadReviewList();
    setReviewState(true);
  } else {
  }

  return (
    <React.Fragment>
      <div className={classes.heroContent}>
        <Container>
          <Typography
            component="h1"
            variant="h1"
            align="center"
            style={{ color: "white" }}
          >
            Review List
          </Typography>
        </Container>
      </div>

      {/* <ReviewModal /> */}
      <div>
        <Link
          to={"/ranking"}
          className={classes.home}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Home > 리뷰 list</Typography>
        </Link>
      </div>
      <Divider variant="middle" className={classes.divider2} />
      <div className={classes.btnGroup}></div>

      <Container className={classes.cardGrid}>
        <Typography className={classes.total}>
          Total {feedAll.length}
        </Typography>
        <Divider variant="middle" className={classes.divider} />

        <Grid container spacing={10}>
          {feedAll.slice(minValue, maxValue).map(feed => (
            <ReviewInfo
              wine={feed.wine}
              key={feed.fid}
              user={feed.user}
              fid={feed.fid}
              title={feed.title}
              nameEng={feed.wine.nameEng}
              content={feed.content}
              rating={feed.rating}
            />
          ))}
        </Grid>
        <div>
          <Pagination
            total={feedAll.length}
            // showTotal={total => `Total ${total} items`}
            onChange={handleChange}
            pageSize={numEachPage}
            defaultCurrent={1}
            className={classes.pagination}
          />
        </div>
      </Container>
    </React.Fragment>
  );
}
