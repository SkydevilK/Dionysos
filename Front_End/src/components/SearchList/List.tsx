import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import "antd/dist/antd.css";
import "./List.css";
import { Pagination } from "antd";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../stores/login/store";
import {
  getSmartSearch,
  getSmartSearchByName
} from "../../../stores/smartSearch/actions/wineInfo";
//antDesign
import "antd/dist/antd.css";

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
      display: "flex",
      backgroundImage:
        "url(https://media.giphy.com/media/jNdw5Qmy5MOpq/giphy.gif)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    card: {
      maxWidth: 300,
      height: "100%",
      flexDirection: "column",
      marginLeft: 20,
      marginRight: 20
    },
    media: {
      display: "flex",
      width: "100%",
      //paddingTop: '56.25%', // 16:9
      position: "absolute",
      marginLeft: "40%",
      height: "230px"
    },
    cardGrid: {
      paddingTop: theme.spacing(12),
      paddingBottom: theme.spacing(12)
    },
    divider: {
      backgroundColor: "#36342f",
      marginTop: "100px",
      position: "relative",
      height: "1px",
      marginBottom: "50px",
      marginLeft: "8%",
      marginRight: "8%"
    },

    divider2: {
      backgroundColor: "#36342f",
      marginTop: "10px",
      position: "relative",
      height: "1px",
      marginBottom: "50px"
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
      position: "relative",
      marginTop: "20px"
    },
    total: {
      display: "inline-block",
      marginLeft: "15px"
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
    }
  })
);
export default function List(props: any) {
  const { taste } = props.location.state;
  const { name } = props.location.state;

  const [btnNum, setBtnNum] = useState(0);
  const classes = useStyles();
  const [wineState, setWineState] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(30);
  const dispatch = useDispatch();
  //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
  const {
    searchList,
    isSmartSearchPending,
    isSmartSearchSucceess,
    isSmartSearchError
  } = useSelector((state: rootState) => state.SmartSearchReducer);
  const loadWineList = async () => {
    await dispatch(
      getSmartSearch(
        taste.alcohol,
        taste.country,
        taste.sparkling,
        taste.sweet,
        taste.type
      )
    );
  };

  const loadWineListByName = async () => {
 
    await dispatch(getSmartSearchByName(name));
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

  if (!isSmartSearchSucceess && !wineState && taste != null) {
    loadWineList();
    setWineState(true);

  } else if (!isSmartSearchSucceess && !wineState && taste == null) {

    loadWineListByName();
    setWineState(true);
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
            Enjoy Your Taste
          </Typography>
        </Container>
      </div>
      ​{/* <ReviewModal /> */}
      <div>
        <Link
          to={"/ranking"}
          className={classes.home}
          style={{
            textDecoration: "none",
            color: "black",
            paddingTop: "70px",
            marginRight: "140px"
          }}
        >
          <Typography>Home > 와인 list</Typography>
        </Link>
      </div>
      <div className={classes.divider2}>
        <Divider variant="middle" />
      </div>
      <div className={classes.btnGroup}>
        <h2>Smart Search</h2>
      </div>
      <Container className={classes.cardGrid}>
        <div>
          <Typography className={classes.total}>
            Total {searchList.length}
          </Typography>

          <Divider className={classes.divider2} variant="middle" />

          <Grid container>
            {searchList.slice(minValue, maxValue).map(wine => (
              <Grid item xs={4} key={wine.wid}>
                <div className="wine_list">
                  <li>
                    <div className="tags">
                      <span className="flag s32">
                        <img
                          className={wine.country}
                          // src={`images/${wine.country}.png`}
                          // alt={wine.country}
                        ></img>
                      </span>
                      <em className={`tag type ${wine.type}`}>{wine.type}</em>
                    </div>
                    <Link
                      to={`/detail/${wine.wid}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="img">
                        <img
                          src={`http://i02a303.p.ssafy.io:8090/WineProject/Wine/${wine.nameEng}.gif`}
                          alt={wine.nameKor}
                        />
                      </div>
                    </Link>
                    <strong
                      className="tit _dotdotdot is-truncated"
                      // data-ellipse-height="70"
                      style={{
                        overflowWrap: "break-word",
                        width: "215px"
                      }}
                    >
                      {wine.nameEng}
                    </strong>
                    <span
                      className="tit"
                      style={{
                        overflowWrap: "break-word",
                        width: "215px",
                        overflow: "hidden"
                      }}
                    >
                      {wine.nameKor}
                    </span>
                    <div className="hashtag">
                      #{wine.country} #{wine.type}
                    </div>
                    <Link to={`/detail/${wine.wid}`} className="button">
                      <Button>View More</Button>
                    </Link>
                  </li>
                </div>
              </Grid>
            ))}
          </Grid>
          <div className="pagination">
            <Pagination
              total={searchList.length}
              // showTotal={total => `Total ${total} items`}
              onChange={handleChange}
              pageSize={numEachPage}
              defaultCurrent={1}
              size="large"
            />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}
