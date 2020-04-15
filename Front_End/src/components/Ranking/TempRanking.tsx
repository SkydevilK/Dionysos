import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./TempRanking.css";
import { Link } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../stores/login/store";
import {
  getWineTop5,
  getWineTop3,
  getReviewTop5
} from "../../../stores/wine_info/actions/mainRank";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "1200px"
    },
    gridContainer: {
      justifyContent: "center",
      width: "",
      height: "100%",
      paddingLeft: "5%"
    },

    listFont: {
      fontSize: 28
    },

    itemFont: {
      fontSize: 28
    }
  })
);

export default function Ranking() {
  const classes = useStyles();
  const [wineState, setWineState] = React.useState(false);
  const dispatch = useDispatch();
  //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
  const {
    wineTop5,
    reviewTop5,
    isReviewTop5Success,
    isWinePending,
    isWineTop5Success,
    isWineError
  } = useSelector((state: rootState) => state.wineRankReducer);

  const loadWineTop10 = async () => {

    await dispatch(getWineTop5("VISIT_5"));
    await dispatch(getReviewTop5("LIKE_5"));
  };

  if (!isWineTop5Success && !wineState) {
    loadWineTop10();
    setWineState(true);
  } else {
  }

  return (
    <div>
      <h3 className="tit40_line">Today's Wine</h3>
      <Grid container className={classes.gridContainer}>
        <div
          className="bx_new_wine scroll-pane horizontal-only"
          style={{ overflow: "hidden", padding: "0px", width: "1200px" }}
        >
          <div
            className="jspContainer"
            style={{ width: "1200px", height: "375px" }}
          >
            <div
              className="jspPane"
              style={{
                padding: "0px",
                top: "0px",
                left: "0px",
                width: "1200px"
              }}
            >
              <div className="monthly_products">
                {" "}
                <ul className="clfix" id="monthly-detail-nav">
                  {wineTop5.map(wine => (
                    <li key={wine.wid}>
                      <Link
                        to={`/detail/${wine.wid}`}
                        style={{ textDecoration: "none" }}
                      >
                        <div>
                          {" "}
                          <div className="img">
                            <span>
                              {" "}
                              <span className="hide_txt">Red</span>{" "}
                            </span>
                            <img
                              src={`http://i02a303.p.ssafy.io:8090/WineProject/Wine/${wine.nameEng}.gif`}
                              alt=""
                            />
                          </div>
                          <strong className="tit">{wine.nameKor}</strong>{" "}
                        </div>{" "}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Grid>
      <div>
        <h3 className="tit40_line">Today's Review</h3>
        <Grid container className={classes.gridContainer}>
          <div
            className="bx_new_wine scroll-pane horizontal-only"
            style={{ overflow: "hidden", padding: "0px", width: "1200px" }}
          >
            <div
              className="jspContainer"
              style={{ width: "1200px", height: "375px" }}
            >
              <div
                className="jspPane"
                style={{
                  padding: "0px",
                  top: "0px",
                  left: "0px",
                  width: "1200px"
                }}
              >
                <div className="monthly_products">
                  {" "}
                  <ul className="clfix" id="monthly-detail-nav">
                    {reviewTop5.map(review => (
                      <li key={review.fid}>
                        <Link key={review.fid}
                          to={`/review/${review.fid}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div>
                            {" "}
                            <div className="img">
                              <span>
                                {" "}
                                <span className="hide_txt">Red</span>{" "}
                              </span>
                              <img
                                src={`http://i02a303.p.ssafy.io:8090/WineProject/Wine/${review.wine.nameEng}.gif`}
                                alt=""
                              />
                            </div>
                            <strong className="tit">
                              {review.wine.nameKor}
                            </strong>{" "}
                          </div>{" "}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
}
