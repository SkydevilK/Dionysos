import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import TimelineSection from './MR/TimelineSection';
import MainContent from './MR/MainContent';


// import CssBaseline from '@material-ui/core/CssBaseline';
// import { Container } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// import Link from '@material-ui/core/Link';

const buttons = [
  { title: "My Review", url: "/mypage" },
  { title: "My Likes", url: "/mypage/mylikes" },
  { title: "My Friends", url: "/mypage/myfriends" }
];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mrNavbar: {
      minHeight: "41px",
      width: "100%"
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
    toolbar: {
      minHeight: "41px",
      flexWrap: "wrap"
    },
    mrTimelineButton: {}
  })
);

export default function MyPage() {
  const classes = useStyles();

  return (
    <div id="globalContainer">
      <div >
      {/* 프로필 사진 단 */}
        

      {/* main contents 단 */}
      <TimelineSection />
      <div className={classes.mrNavbar}>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <ButtonGroup className={classes.mrTimelineButton}>
            {buttons.map(button => (
              <Link
                color="inherit"
                // noWrap
                key={button.url}
                // variant="body2"
                to={button.url}
              >
                <Button>
                  {button.title}
                </Button>
              </Link>
            ))}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
      <MainContent />
      </div>
    </div>
  );
}
