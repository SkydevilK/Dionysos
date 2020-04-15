// created at: 2020-01-21
// created by: JSPark
// about: Review page 중 위쪽 파트, 배경 사진, 프로필 사진, toolbar를 포함하고 있다.
// 참고: https://github.com/TheoObbard/facebook_clone/blob/master/app/assets/stylesheets/newsfeed.scss


import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


// import TimelineNavbar from './TimelineNavbar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mrTimelinesection: {
      width: '100%',
      height: '300px',

    },
    mrTimelineUpperSection: {
      display: 'block',
      position: 'relative',
      height: '250px',
    },

    mrTimelineBackground: {
      position: 'relative',
      height: '100%',
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.common.white,
      marginBottom: theme.spacing(0),
      backgroundImage: 'url(https://www.vertigemazul.com/public/uploads/programas/02SunSetParty/01VertigemAzul_party.jpg)',
  
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',

    },

  }),
);

export default function Timelinesection() {
  const classes = useStyles();

  return (
    <div id="mrTimelinesection" className={classes.mrTimelinesection}>
      <div className={classes.mrTimelineUpperSection}>
        <div id="mrTimelineBackground" className={classes.mrTimelineBackground}>

        </div>
      </div>
    </div>
  );
}