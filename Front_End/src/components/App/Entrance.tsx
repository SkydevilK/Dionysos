import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import brown from "@material-ui/core/colors/brown";
import pink from "@material-ui/core/colors/pink";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      position: "fixed",
      // display : 'flex',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      backgroundImage: "url(https://i.gifer.com/MQt.gif)",
      backgroundSize: "contain",

      backgroundRepeat: "no-repeat",
      backgroundPosition: "right"
    },

    cardGrid: {
      position: "absolute",
      // marginTop : 240,
      width: "600px",
      height: "400px",
      top: "30%",
      left: "6%",
      backgroundColor: pink[800],
      opacity: "0.9"
    },
    card: {
      backgroundColor: "transparent",
      boxShadow: "none",

      width: 230,
      height: 100,
      display: "inline-block",

      marginRight: theme.spacing(2),
      padding: theme.spacing(1)
    },

    cardContent: {
      flexGrow: 1
    },

    media: {
      height: 140
    },

    first: {
      marginLeft: theme.spacing(9)
    }
  })
);

//const wines = [1, 2, 3]; // 표시할 카드 개수

export default function Entrance() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div
          className={classes.content}
          style={{ width: "100%", height: "100vh" }}
        >
          {/* End hero unit */}
          <Grid className={classes.cardGrid}>
            <Typography
              variant="h3"
              component="h2"
              align="center"
              style={{
                color: "#fce4ec",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 50,
                fontWeight: "bold"
              }}
            >
              Dionysos
            </Typography>

            <Typography
              variant="h5"
              component="h2"
              align="center"
              style={{
                color: "#fce4ec",
                // marginLeft: "auto",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 20,
                fontWeight: "bold"
              }}
            >
              마음을 움직이는 한잔의 감동,
              <br />
              당신을 위한 와인의 모든 것!
            </Typography>
            <Typography
              variant="h6"
              component="h2"
              align="center"
              style={{
                color: "#fce4ec",
                marginTop: 10,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              만 19세 이상 음주 가능한 연령 입니까?
            </Typography>
            <Card className={`${classes.card} ${classes.first}`}>
              <Link to="/ranking">
                <Typography
                  gutterBottom
                  variant="h3"
                  component="h2"
                  align="center"
                  style={{ color: "#fce4ec" }}
                >
                  YES
                </Typography>
              </Link>
            </Card>
            <Card className={classes.card}>
              <a href="https://jr.naver.com/">
                <Typography
                  gutterBottom
                  variant="h3"
                  component="h2"
                  align="center"
                  style={{ color: "#fce4ec" }}
                >
                  NO
                </Typography>
              </a>
            </Card>
          </Grid>
        </div>
      </main>
      {/* Footer */}

      {/* End footer */}
    </React.Fragment>
  );
}
