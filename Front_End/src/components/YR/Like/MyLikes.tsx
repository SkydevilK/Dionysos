import React, { useState } from "react";
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
import Button from "@material-ui/core/Button";
​
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

​interface WineLike {
    wid : number; 
    nameKor: string;
    nameEng : string;
}

​
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
​
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
        "url(https://cdn.pixabay.com/photo/2015/11/05/19/54/rose-1024710_1280.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
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
      width: '70px',
      //paddingTop: '56.25%', // 16:9
      position: 'relative',
      marginLeft: '40%',
      height: '230px',
​
​
    },
​
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
    more: {
      "& > *": {
        margin: theme.spacing(1, 8)
      }
    },
    checkbox : {
      marginLeft: '30%',
      marginTop : '3%'
    }
  })
);
​
export default function MyLikes() {
  const [btnNum, setBtnNum] = useState(0);
  const classes = useStyles();
  const userLike = JSON.parse(sessionStorage.getItem('userLike') || '{}');
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(30);

  console.log(userLike);
  const numEachPage: number = 30;
​
  const handleChange = (value: number) => {
    setMinValue((value - 1) * numEachPage);
    setMaxValue((value) * numEachPage);
  };

  const handleEuropeBtn = () => {
    setBtnNum(1);
  };
  const handleAmericaBtn = () => {
    setBtnNum(2);
  };

  return (
     
      <Container className={classes.cardGrid}>
        <Typography className={classes.total}>Total {userLike.length}</Typography>
        <Divider variant="middle" className={classes.divider} />
        <Grid container spacing={10}>
          {userLike.map((wine: WineLike) => (
​
            <Grid item xs={4}>
              <Card className={classes.card}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={wine.nameKor}
                  subheader={wine.nameEng}
                />
                {/* <Link to={`/detail/${wine.wid}`} style={{ textDecoration: "none" }}> */}
                <CardMedia
                  className={classes.media}
                  image={`http://i02a303.p.ssafy.io:8090/WineProject/Wine/${wine.nameEng}.gif`}
                  title={wine.nameEng}
                />
                {/* </Link> */}
                {/* <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {wine.info.slice(0, 50)}...
                  </Typography>
                </CardContent> */}
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon color="secondary" />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <div className={classes.more}>
                    <Link to={`/detail/${wine.wid}`} style={{ textDecoration: "none" }}>
                      <Button variant="outlined">View More</Button>
                    </Link>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
​
        </Grid>
        <div>
          {/* <Pagination
            total={userLike.length}
            // showTotal={total => `Total ${total} items`}
            onChange={handleChange}
            pageSize={numEachPage}
            defaultCurrent={1}
          /> */}
          
          </div>
        {/* <ReviewModal /> */}
      </Container>

  );
}