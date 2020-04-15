// created at: 2020-01-21
// created by: JSPark
// about: Review page 중 위쪽 파트, 배경 사진, 프로필 사진, toolbar를 포함하고 있다.
// 참고: https://github.com/TheoObbard/facebook_clone/blob/master/app/assets/stylesheets/newsfeed.scss

import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

// import TimelineNavbar from './TimelineNavbar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mrTimelineBackground: {
      padding: theme.spacing(15, 0, 20),
      display: "flex",
      backgroundImage:
        "url(https://t4.ftcdn.net/jpg/02/35/26/61/240_F_235266127_TKdaIQIb7W1dbJq22K0l9cnkduGxRiPl.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }
  })
);

export default function Timelinesection() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.mrTimelineBackground}>
        <Container>
          <Typography
            component="h1"
            variant="h1"
            align="center"
            style={{ color: "white" }}
          >
            My SNS
          </Typography>
        </Container>
      </div>
    </React.Fragment>
  );
}
