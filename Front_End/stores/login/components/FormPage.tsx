import React from "react";
import { connect } from "react-redux";
import "./login_style.css";
import { Link } from "react-router-dom";

import { login, SNSLogin } from "../actions/login";
import { logout } from "../actions/login";
// import KakaoLogin from 'react-kakao-login';
import K from "react-kakao-login";
const KakaoLogin: any = K;

import GoogleLogin from "react-google-login";

interface IProps {
  isLoginPending: boolean;
  isLoginSuccess: boolean;
  loginError: string;
  login?(email: string, password: string): void;
  dispatch: Function;
}

interface IState {
  id: string;
  provider: string;
  email: string;
  password: string;
  nickname: string;
}

class FormPage extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);


    this.state = {
      id: "",
      provider: "",
      email: "",
      password: "",
      nickname: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  // Google Login
  responseGoogle = async (res: any) => {
    this.setState({
      id: res.googleId,
      nickname: "HELLO",
      provider: "GOOGLE"
    });

    await this.props.dispatch(
      SNSLogin(this.state.id, this.state.nickname, this.state.provider)
    );
  };
  // Kakao Login
  responseKakao = async (res: any) => {

    this.setState({
      id: res.profile.id,
      nickname: "HELLO",
      provider: "KAKAO"
    });

    await this.props.dispatch(
      SNSLogin(this.state.id, this.state.nickname, this.state.provider)
    );
  };

  // Login Fail
  responseFail = (err: any) => {
    console.log();
  };

  render() {
    let { email, password } = this.state;
    let { isLoginPending, isLoginSuccess, loginError } = this.props;

    if (!sessionStorage.getItem("userInfo")) {
      return (
        <div>
          <form name="form" onSubmit={this.onSubmit} className="login-form">
            <div className="login">Login</div>

            <div className="txtb">
              <input
                type="email"
                disabled={isLoginPending}
                className="form-control"
                name="email"
                onChange={e => this.setState({ email: e.target.value })}
                value={email}
                placeholder="Email"
              ></input>
         
            </div>
            <div className="txtb">
              <input
                type="password"
                disabled={isLoginPending}
                name="password"
                onChange={e => this.setState({ password: e.target.value })}
                value={password}
                placeholder="Password"
              ></input>
    
            </div>

            <input type="submit" className="logbtn" value="Login" />

            <br />
            <div className="message">
              {isLoginPending && <div>Please wait...</div>}

              {(function() {
                if (loginError == "login error") {
                  return <span>email 과 password를 확인해주세요.</span>;
                }
              })()}
            </div>
            <div className="bottom-text">
              <a href="/signUp" style={{fontSize : '18px'}}>Sign up</a>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
              className="signUpSns"
            >
              <GoogleLogin
                clientId="605769507433-205lj47uj46v02ucrpvbgpck6n2mmed6.apps.googleusercontent.com"
                // render={props => (
                //   // <button
                //   //   className="login100-social-item bg1"
                //   //   onClick={props.onClick}
                //   // >
                //   //   <i className="fa fa-google"></i>
                //   // </button>
                //   // <button className="loginBtn loginBtn--google">
                //   //   Login with Google
                //   // </button>

                // )}
                buttonText="Google 로 로그인하기"
                onSuccess={this.responseGoogle}
                onFailure={this.responseFail}
                cookiePolicy={"single_host_origin"}
                className="google"
              />

              <KakaoLogin
                jsKey="d507ecdb10512afbd7bfbf2d5a9f788a"
                // render={(props: any) => (
                //   // <button
                //   //   className="login100-social-item bg2"
                //   //   onClick ={props.onClick}
                //   // >
                //   //   <i className="fa fa-kakao"></i>
                //   // </button>
                //   <button className="loginBtn loginBtn--kakao"><span style={{color : 'black'}}>Login with KaKao</span></button>
                // )}
                buttonText="KaKao 로 로그인하기"
                onSuccess={this.responseKakao}
                onFailure={this.responseFail}
                throughTalk={true} // If true, Open Kakao Talk instead of new browser tab
                getProfile={true}
                className="kakao"
              />
            </div>
          </form>
        </div>
      );
    } else {
      return (
        // // const history = createBrowserHistory();
        // // history.push('/ranking');
        // //   //<h1>{sessionStorage.getItem("userInfo")}</h1>

        <div>
          <img
            src="https://1.bp.blogspot.com/-nF66cG_pBcI/W2cC6-vBoQI/AAAAAAApbw0/OM3urq7sYPoonAi8fxCW9s0fBZVHkSrAwCLcBGAs/s1600/AW1483012_00.gif"
            alt="WELCOME TO Dionysos"
          />
        </div>
      );
    }
  }

  async onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let { email, password } = this.state;

    await this.props.dispatch(login(email, password));
  }
}

const mapStateToProps = (state: any) => {
  return {
    isLoginPending: state.loginReducer.isLoginPending,
    isLoginSuccess: state.loginReducer.isLoginSuccess,
    loginError: state.loginReducer.loginError
  };
};

export default connect(mapStateToProps)(FormPage);
