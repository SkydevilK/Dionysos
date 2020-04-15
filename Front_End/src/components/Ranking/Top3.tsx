import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import WineInfo from "../Interface/Wine";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../stores/login/store";
import { getWineTop3 } from "../../../stores/wine_info/actions/mainRank";
import Slider from "./Slider";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heroContent: {
      // marginBottom: theme.spacing(4),
      // backgroundSize: "auto",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "cover"
    },
    heroButtons: {
      marginTop: theme.spacing(4)
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8)
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    cardMedia: {
      paddingTop: "56.25%" // 16:9
    },
    cardContent: {
      flexGrow: 1
    },
    root: {
      height: 180
    }
  })
);

//const wines = [1, 2, 3]; // 표시할 카드 개수

export default function TempTop3() {
  const classes = useStyles();
  const [value] = React.useState(4); // for Rati$ng : value 는 rating 점수
  const [wineState, setWineState] = React.useState(false);
  const dispatch = useDispatch();
  //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
  const {
    wineTop3,
    isWinePending,
    isWineTop3Success,
    isWineError
  } = useSelector((state: rootState) => state.wineRankReducer);

  const loadWineTop3 = async () => {

    await dispatch(getWineTop3("VISIT_3"));
  };

  if (!isWineTop3Success && !wineState) {
    loadWineTop3();
    setWineState(true);
  } else {
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Slider />
        <Typography style={{ fontSize: "12px", textAlign: "right" }}>
          * 좌우 방향키로도 이동 가능합니다.
        </Typography>
        <Container className={classes.cardGrid} maxWidth="md">
          <h3 className="tit40_line">Top3 Wine</h3>
          <Grid container spacing={4}>
            {wineTop3.map(wine => (
              <WineInfo
                key={wine.wid}
                wid={wine.wid}
                nameKor={wine.nameKor}
                nameEng={wine.nameEng}
                info={wine.info}
                type={wine.type}
              />
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}​{/* End footer */}
    </React.Fragment>
  );
}
