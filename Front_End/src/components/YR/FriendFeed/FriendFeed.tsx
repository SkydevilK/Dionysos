import React ,{ useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import ReviewInfo from "../../Interface/Review";
import 'antd/dist/antd.css';
import { Pagination } from 'antd';
// Redux

import { rootState } from '../../../../stores/login/store';
import { getUserFeedList } from '../../../../stores/your_sns/actions/userFeed';


import { useSelector, useDispatch } from 'react-redux';


import Button from '@material-ui/core/Button';  
import Modal from '@material-ui/core/Modal';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';


import { withRouter, RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    widContainer: {
      marginBottom: '10px'
    },
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
        "url(https://media.giphy.com/media/jNdw5Qmy5MOpq/giphy.gif)",
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
      display: "inline-block flex",
      float: "right",
      marginRight: "20px"
    },
    more : {
      "& > *": {
        margin: theme.spacing(1, 8)
      }
    }
  })
);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface RouterProps {
  // type for `match.params`
  uid: string; // must be type `string` since value comes from the URL
}
interface MyComponentProps extends RouteComponentProps<RouterProps> {
  uid: number;
}
// props: MyComponentProps
export default function MyFeed({uid} : {uid : number}) {

  const classes = useStyles();
  // const uid = +props.match.params.uid;
 

  const [reviewState, setReviewState] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(30);
  const dispatch = useDispatch();
  //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
  const { isUserFeedError,isUserFeedPending, isUserFeedSucceess, friendFeed } = useSelector(
    (state: rootState) => state.FriendFeedReducer
  );


  const numEachPage : number = 30;

  const handleChange = (value : number) => {
    setMinValue((value-1) * numEachPage);
    setMaxValue((value) * numEachPage);
    // setState({
    //   minValue: (value - 1) * numEachPage,
    //   maxValue: value * numEachPage
    // });
  };

  if(!isUserFeedSucceess && !reviewState) {
    dispatch(getUserFeedList("REVIEW", uid));
    setReviewState(true);
  } else {

  }

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
    
      <Container className={classes.cardGrid}>
        <Typography className={classes.total}>Total {friendFeed.length}</Typography>
        <Divider variant="middle" className={classes.divider} />
     
        <Grid container spacing={10}>
          {friendFeed.slice(minValue, maxValue).map(feed => (
          
             <ReviewInfo
             wine={feed.wine}
             key={feed.fid}
             fid={feed.fid}
             user={feed.user}
             title={feed.title}
            nameEng={feed.wine.nameEng}
            content={feed.content}
            rating={feed.rating}
           
          />
     
          ))}

        </Grid>
        <div>
        <Pagination
      total={friendFeed.length}
      // showTotal={total => `Total ${total} items`}
      onChange={handleChange}
      pageSize={numEachPage}
      defaultCurrent={1}
    /></div>
      </Container>
    </div>
  );
}
