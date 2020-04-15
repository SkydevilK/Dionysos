import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import "./SignUp.css";
import {
  register,
  emailCheck,
  SNSRegister
} from "../../../stores/register/actions/register";
import K from "react-kakao-login";
const KakaoLogin: any = K;

import GoogleLogin from "react-google-login";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { rootState } from "../../../stores/login/store";

import { bindActionCreators, Dispatch } from "redux";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
      backgroundImage:
        "url(https://media.istockphoto.com/photos/red-wine-and-cheese-picture-id689341058?k=6&m=689341058&s=612x612&w=0&h=V-i9n7IafA7sw-O799Fp9LDjLmW6IfVEAgI174JJOb4=)",
      backgroundRepeat: "no-repeat",
      // backgroundColor:
      //   theme.palette.type === "dark"
      //     ? theme.palette.grey[900]
      //     : theme.palette.grey[50],
      backgroundSize: "cover",
      backgroundPosition: "center"
    },
    // image: {

    // },

    paper: {
      margin: theme.spacing(4, 4),
      display: "flex",
      flexDirection: "column"
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      left: "43%"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    check: {
      marginLeft: "28%",
      margin: theme.spacing(3, 0, 2)
    },
    font: {
      color: "black"
    },
    google: {
      "& > span": {
        marginLeft: "63px"
      },
      "& > div": {
        background: "transparent !important"
      },
      marginBottom: 20,
      width: "87%",
      height: 40,
      borderRadius: "20px !important",
      color: "black !important"
    },

    kakao: {
      backgroundColor: "#f5e042",
      color: "#000000",
      borderRadius: 20,
      boxShadow: "0px 2px rgba(0, 0, 0, 0.24)",
      border: "border: 1px solid transparent",
      marginBottm: 40,
      width: "87%",
      height: 40
    },
    signUpSns: {
      display: "flex",
      flexDirection: "column",
      paddingBottom: 30
    },
    typo: {
      display: "flex",
      justifyContent: "center",
      justifySelf: "center"
    },
    signUpForm: {
      position: "absolute",
      left: "38%",
      top: "20%",
      paddingBottom: "1%",
      width: 400
    }
  })
);

interface IProps {
  isRegisterPending: boolean;
  isRegisterSuccess: boolean;
  registerError: string;
  register?(nickname: string, email: string, password: string): void;
  emailCheck?(email: string): void;
  SNSRegister?(nickname: string, id: string, provider: string): void;
  dispatch: Function;
}

interface IState {
  nickname: string;
  email: string;
  password: string;
}

function SignUp() {
  const classes = useStyles();

  const dispatch = useDispatch();
  //  const [state, setState] = useState(nickname : state.RegistUser.nickname, );
  const {
    isRegisterPending,
    isRegisterSuccess,
    registerError,
    emailState
  } = useSelector((state: rootState) => state.registerReducer);

  const [state, setState] = useState({
    nickname: "",
    email: "",
    password: "",
    provider: "",
    id: ""
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let { nickname, email, password } = state;

    await dispatch(register(state.nickname, state.email, state.password));
  };

  // Google Login
  const responseGoogle = async (res: any) => {
    setState({
      email: "",
      password: "",
      id: res.googleId,

      nickname: "Hello",
      provider: "GOOGLE"
    });

    //dispatch(registerService.SNSRegister(state.nickname, state.id, state.provider));
    await dispatch(SNSRegister(state.nickname, state.id, state.provider));
  };
  // Kakao Login
  const responseKakao = async (res: any) => {
    setState({
      email: "",
      password: "",
      id: res.profile.id,
      nickname: res.profile.properties.nickname,
      provider: "KAKAO"
    });

    await dispatch(SNSRegister(state.nickname, state.id, state.provider));
  };

  // Login Fail
  const responseFail = (err: any) => {
  };

  const onEmailCheck = async () => {

    await dispatch(emailCheck(state.email));
  };

  if (!isRegisterSuccess) {
    return (
      <Grid container component="main" className={classes.root}>
        <Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={4}
            component={Paper}
            elevation={6}
            className={classes.signUpForm}
          >
            <div className={classes.paper} id="paper">
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon ></LockOutlinedIcon>
              </Avatar>
              <Typography component="h1" variant="h5" className={classes.typo}>
                Sign Up
              </Typography>
              <form className={classes.form} onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="nickname"
                  label="nickname"
                  name="nickname"
                  autoComplete="nickname"
                  autoFocus
                  onChange={e =>
                    setState({
                      nickname: e.target.value,
                      email: state.email,
                      password: state.password,
                      id: "",
                      provider: ""
                    })
                  }
                  value={state.nickname}
                ></TextField>

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={e =>
                    setState({
                      nickname: state.nickname,
                      email: e.target.value,
                      password: state.password,
                      id: "",
                      provider: ""
                    })
                  }
                  value={state.email}
                ></TextField>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.check}
                  onClick={onEmailCheck}
                >
                  Email 중복 체크
                </Button>
                {(function() {
                  if (emailState != "not yet") {
                    return (
                      <Typography
                        style={{
                          fontSize: "18px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        {emailState}
                      </Typography>
                    );
                  }
                })()}
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.font}
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  // value={password}
                  // onChange={handlePassword}
                  onChange={e =>
                    setState({
                      nickname: state.nickname,
                      email: state.email,
                      password: e.target.value,
                      id: "",
                      provider: ""
                    })
                  }
                  value={state.password}
                  placeholder="영어 대/소문자, 숫자, @ 조합 6~20자"
                  autoComplete="current-password"
                ></TextField>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </form>
            </div>
            <div className="message">
              {isRegisterPending && <div>Please wait...</div>}

              {function() {
                if (registerError == "register error") {
                  return <span>입력하신 정보로 가입 하실 수 없습니다.</span>;
                }

                if (isRegisterSuccess) {
                  return (
                    <div>
                      <span>회원 가입 완료</span>;
                    </div>
                  );
                }
              }}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              className={classes.signUpSns}
            >
              <GoogleLogin
                clientId="605769507433-205lj47uj46v02ucrpvbgpck6n2mmed6.apps.googleusercontent.com"
                buttonText="Google 로 가입하기"
                onSuccess={responseGoogle}
                onFailure={responseFail}
                cookiePolicy={"single_host_origin"}
                className={classes.google}
              ></GoogleLogin>

              <KakaoLogin
                jsKey="d507ecdb10512afbd7bfbf2d5a9f788a"
                buttonText="KaKao 로 가입하기"
                onSuccess={responseKakao}
                onFailure={responseFail}
                throughTalk={true} // If true, Open Kakao Talk instead of new browser tab
                getProfile={true}
                className={classes.kakao}
              ></KakaoLogin>
            </div>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    // 회원가입이 성공했을 때!!
    return <Redirect to="/ranking" ></Redirect>;
    // 여기서 /ranking 으로 바로 넘어가게 만들어주세요!
  }
}

export default SignUp;
