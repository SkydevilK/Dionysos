import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { Rating } from "@material-ui/lab";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import { Link } from "react-router-dom";

import LongMenu from "./LongMenu";

import "../../index.css";

export interface Wine {
  wid: number;
  nameKor: string;
}

interface User {
  uid: number;
  kakaotalkId: string;
  naverId: string;
  googleId: string;
  facebookId: string;
  email: string;
  nickName: string;
}

interface ReviewInfo {
  user: User;
  fid: number;
  title: string;
  nameEng: string;
  content: string;
  rating: number;
  wine: Wine;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    cardMedia: {
      // width: '100%',
      // maxHeight: 'auto',
      width: "60px",
      //paddingTop: '56.25%', // 16:9
      position: "relative",
      marginLeft: "40%",
      height: "255px"
    },
    cardContent: {
      flexGrow: 1
    },
    typography: {
      fontFamily: "Cafe24Shiningstar"
    },
    more: {
      "& > *": {
        margin: theme.spacing(1, 8)
      },
      fontSize: "18px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    center: {
      fontSize: "18px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  })
);

function ReviewInfo(review: ReviewInfo) {
  const classes = useStyles();

  const [checked] = React.useState(true);
  const userData = sessionStorage.getItem("uid"); // string
  const feedUserData = String(review.user.uid); //as unknown as string // number

  return (
    <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
      {/* <Grid item xs={12} sm={6} md={4}> */}
      <Grid item xs={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={`http://i02a303.p.ssafy.io:8090/WineProject/Wine/${review.nameEng}.gif`}
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography className={classes.center}>{review.title}</Typography>
            <Typography className={classes.center}>
              <div
                dangerouslySetInnerHTML={{
                  __html: review.content.substring(0, 80)
                }}
              ></div>
            </Typography>
          </CardContent>

          <Box component="fieldset" mb={3} borderColor="transparent">
            <Rating
              name="read-only"
              value={review.rating}
              readOnly
              className={classes.center}
            />
          </Box>
          <div className={classes.more}>
            <Link
              to={`/review/${review.fid}`}
              style={{ textDecoration: "none" }}
            >
              <Button variant="outlined">View More</Button>
            </Link>
            {/* {userData === feedUserData &&
              <div>
                <LongMenu review={review}/>
              </div>
            } */}
          </div>
        </Card>
      </Grid>
    </Slide>
  );
}

export default ReviewInfo;
