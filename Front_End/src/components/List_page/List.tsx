import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import "antd/dist/antd.css";
import { Pagination } from "antd";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../stores/login/store";
import {
  getWineListByType,
  getWineListByNameList,
  searchWineByName,
  getWineUseList,
  searchWineByFood
} from "../../../stores/wine_info/actions/wineInfo";
//antDesign
import "antd/dist/antd.css";
import { Checkbox, Row, Col } from "antd";
import "./List.css";

import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import "./Search.css";

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
        "url(https://t3.ftcdn.net/jpg/02/87/33/42/240_F_287334233_YdBxRrDdoWjPqr3eUR6Sk9JfNHwQf5E3.jpg)",
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
      paddingTop: theme.spacing(20),
      paddingBottom: theme.spacing(12)
    },
    divider: {
      backgroundColor: "#36342f",
      marginBottom: "80px"
    },
    divider2: {
      display: "flex",
      backgroundColor: "#36342f",
      marginTop: "100px",
      position: "relative"
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
    search: {
      display: "flex",
      justifycontent: "right"
    },
    home: {
      display: "flex",
      float: "right",
      marginRight: "80px",
      marginTop: "70px"
    },
    more: {
      "& > *": {
        margin: theme.spacing(1, 8)
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);
export default function List() {
  const [btnNum, setBtnNum] = useState(0);
  const [wineUse, setWineUse] = useState(0);
  const classes = useStyles();
  const [wineState, setWineState] = useState(false);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(15);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState<number | null>(2);
  const [search, setSearch] = useState("");
  //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
  const { wineList, isWinePending, isWineSucceess, isWineError } = useSelector(
    (state: rootState) => state.wineReducer
  );
  const [state, setState] = React.useState<{
    type: string | number;
    name: string;
  }>({
    type: "",
    name: ""
  });

  const [countries, setCountries] = useState([]);
  const [uses, setUses] = useState([]);
  // const inputLabel = React.useRef<HTMLLabelElement>(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current!.offsetWidth);
  // }, []);

  const handleChangeType = (name: keyof typeof state) => (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setState({
      ...state,
      [name]: event.target.value
    });

  };
  const numEachPage: number = 15;
  const [curPage, setCurPage] = useState(1);
  const handleChange = (value: number) => {
    setCurPage(value);
    setMinValue((value - 1) * numEachPage);
    setMaxValue(value * numEachPage);
  };

  const loadWineList = async () => {
    await dispatch(getWineListByType("KOR_UP"));
  };
  const loadWineListByChecked = async (checkedValues: any) => {
    setCountries(checkedValues);
    handleChange(1);
    if (checkedValues.length == 0 && uses.length == 0) {
      await dispatch(getWineListByType("KOR_UP"));
    } else if (uses.length > 0) {
      await dispatch(getWineUseList(checkedValues, uses));
    } else {
      await dispatch(getWineListByNameList(checkedValues));
    }
  };

  const loadWineListByUse = async (checkedValues: any) => {
    handleChange(1);
    setUses(checkedValues);

    if (checkedValues.length > 0) {

      await dispatch(getWineUseList(countries, checkedValues));
    } else if (countries.length > 0) {
      await dispatch(getWineListByNameList(countries));
    } else {
      await dispatch(getWineListByType("KOR_UP"));
    }
  };

  const submitSearch = async () => {
    if (state.type === "food") {
      await dispatch(searchWineByFood(search));
    } else {
      await dispatch(searchWineByName(search));
    }
  };

  async function onChangeCountryChk(checkedValues: any) {
   
    await loadWineListByChecked(checkedValues);
  }

  async function onChangeWineUse(checkedValues: any) {

    await loadWineListByUse(checkedValues);
  }

  const handleEuropeBtn = () => {
    setBtnNum(1);
  };

  const handleAmericaBtn = () => {
    setBtnNum(2);
  };

  const handleWineUseBtn = () => {
    setWineUse(1);
  };

  if (!isWineSucceess && !wineState) {
    loadWineList();
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
            className="typo2"
          >
            Wine List
          </Typography>
        </Container>
      </div>
      <div>
        <Link
          to={"/ranking"}
          className={classes.home}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Home > 와인 list</Typography>
        </Link>
      </div>
      <Divider variant="middle" className={classes.divider2} />
      <div className={classes.btnGroup}>
        <ButtonGroup
          size="large"
          aria-label="large outlined primary button group"
        >
          <Button className={classes.btn} onClick={handleEuropeBtn}>
            유럽 와인
          </Button>
          <Button className={classes.btn} onClick={handleAmericaBtn}>
            신대륙 와인
          </Button>
        </ButtonGroup>
      </div>
      <div className="checkbox">
        {(function() {
          if (btnNum == 1) {
            return (
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={onChangeCountryChk}
              >
                <Row>
                  <Col span={4}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/338px-Flag_of_France.svg.png"
                      alt="france"
                      className="imgFrance"
                    />
                    <Checkbox value="France">
                      <span style={{ fontSize: "22px" }}>France</span>
                    </Checkbox>
                  </Col>
                  <Col span={4}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/375px-Flag_of_Germany.svg.png"
                      alt="germany"
                      className="imgGermany"
                    />
                    <Checkbox value="Germany">
                      <span style={{ fontSize: "22px" }}>Germany</span>
                    </Checkbox>
                  </Col>
                  <Col span={4}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/338px-Flag_of_Italy.svg.png"
                      alt="italy"
                      className="imgItaly"
                    />
                    <Checkbox value="Italy">
                      <span style={{ fontSize: "22px" }}>Italy</span>
                    </Checkbox>
                  </Col>
                  <Col span={4}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/300px-Flag_of_Spain.svg.png"
                      alt="spain"
                      className="imgSpain"
                    />
                    <Checkbox value="Spain">
                      <span style={{ fontSize: "22px" }}>Spain</span>
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            );
          } else if (btnNum == 2) {
            return (
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={onChangeCountryChk}
                className="country"
              >
                <Row>
                  <Col span={4}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/428px-Flag_of_the_United_States.svg.png"
                      alt="USA"
                      className="imgUSA"
                    />
                    <Checkbox value="USA">
                      <span style={{ fontSize: "22px" }}>USA</span>
                    </Checkbox>
                  </Col>
                  <Col span={4}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Flag_of_Chile.svg/420px-Flag_of_Chile.svg.png"
                      alt="chile"
                      className="imgChile"
                    />
                    <Checkbox value="Chile">
                      <span style={{ fontSize: "22px" }}>Chile</span>
                    </Checkbox>
                  </Col>
                  <Col span={4}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/450px-Flag_of_Australia.svg.png"
                      alt="australia"
                      className="imgAustralia"
                    />
                    <Checkbox value="Australia">
                      <span style={{ fontSize: "22px" }}>Australia</span>
                    </Checkbox>
                  </Col>
                  <Col span={4}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/360px-Flag_of_Argentina.svg.png"
                      alt="argentina"
                      className="imgArgentina"
                    />
                    <Checkbox value="Argentina">
                      <span style={{ fontSize: "22px" }}>Argentina</span>
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            );
          }
        })()}
      </div>
      <div className={classes.btnGroup}>
        <ButtonGroup
          size="large"
          aria-label="large outlined primary button group"
        >
          <Button className={classes.btn} onClick={handleWineUseBtn}>
            와인 용도
          </Button>
        </ButtonGroup>
      </div>
      <div className="checkbox">
        {(function() {
          if (wineUse == 1) {
            return (
              <Checkbox.Group
                style={{ width: "100%" }}
                onChange={onChangeWineUse}
                className="classification"
              >
                <Row>
                  <Col span={6}>
                    <img
                      src="https://t1.daumcdn.net/cfile/tistory/996A32495BC5555E0B"
                      alt="tableWine"
                      className="tableWine"
                    />
                    <Checkbox value="테이블 와인">
                      <span style={{ fontSize: "22px" }}>테이블 와인</span>
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <img
                      src="https://pbs.twimg.com/media/C5-kRz9U4AArte7.jpg"
                      alt="appetizerWine"
                      className="appetizerWine"
                    />
                    <Checkbox value="에피타이저">
                      <span style={{ fontSize: "22px" }}>에피타이저</span>
                    </Checkbox>
                  </Col>
                  <Col span={6}>
                    <img
                      src="https://t3.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/160i/image/q1d812PExRrLhoBONcd0OVu6cko.jpg"
                      alt="desertWine"
                      className="desertWine"
                    />
                    <Checkbox value="디저트">
                      <span style={{ fontSize: "22px" }}>디저트 와인</span>
                    </Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            );
          }
        })()}
      </div>
      <Container className={classes.cardGrid}>
        <Typography className={classes.total}>
          Total {wineList.length}
        </Typography>
        <Divider variant="middle" className={classes.divider} />
        <div>
          <FormControl className={classes.formControl} id="type">
            <InputLabel htmlFor="age-native-simple">Type</InputLabel>
            <Select
              native
              value={state.type}
              onChange={handleChangeType("type")}
            >
              <option value="name">Name</option>
              <option value="food">Food</option>
            </Select>
          </FormControl>
          <button
            name="searchbtn"
            id="searchbtn"
            value=""
            onClick={submitSearch}
          ></button>
          <input
            type="text"
            name="s"
            id="s"
            className="searchfield"
            placeholder="Search"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <Grid container>
          {wineList.slice(minValue, maxValue).map(wine => (
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
            total={wineList.length}
            current={curPage}
            // showTotal={total => `Total ${total} items`}
            onChange={handleChange}
            pageSize={numEachPage}
            defaultCurrent={1}
            size="large"
          />
        </div>
        {/* <ReviewModal /> */}
      </Container>
    </React.Fragment>
  );
}
