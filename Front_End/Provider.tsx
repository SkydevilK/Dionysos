import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./stores/login/store";
import App from "./src/App";
import Navbar from "./src/components/App/Navbar";
import Footer from "./src/components/App/Footer";
import Section from "./src/components/App/Section";
import { BrowserRouter, Route } from "react-router-dom";
import MyPage from "./src/components/MyPage";
import YourPage from "./src/components/YourPage";
import List from "./src/components/List_page/List";
import WineDetail from "./src/components/WineDetail/WineDetail";
import Entrance from "./src/components/App/Entrance";
import WineReview from "./src/components/Review_Page/List";
// import SignUp from "./stores/login/components/SignUp";
import SignUp from "./src/components/App/SignUp";
import MyAccount from "./src/components/App/MyAccount";
import SmartList from "./src/components/SearchList/List";
import ReviewList from "./src/components/Review_Page/ReviewCRUD/ReviewList";
import ReviewDetail from "./src/components/Review_Page/ReviewCRUD/ReviewDetail";
import WineSearch from "./src/components/smartSearch/WineSearch";
import { Switch } from "@material-ui/core";
import ScrollToTop from "./src/ScrollToTop";
class AppForm extends Component {
  public store = (): object => {
    const store = Object.assign({}, this.props);
    return configureStore(store);
  };
  public render(): JSX.Element {
    return (
      <Provider store={this.store() as any}>
        {/* <ScrollToTop /> */}
        <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <Route exact={true} path="/" component={Entrance} />
          <Route path="/ranking" component={App} />
          <Route path="/mypage" component={MyPage} />
          <Route path="/list" component={List} />
          <Route path="/friend/:uid" component={YourPage} />
          <Route path="/detail/:wid" component={WineDetail} />
          <Route path="/wineReview" component={WineReview} />
          <Route path="/signUp" component={SignUp} />
          <Route path="/smartSearch" component={WineSearch} />
          <Route path="/myAccount" component={MyAccount} />
          <Route path="/searchList" component={SmartList} />
          <Route path="/review/:fid" component={ReviewDetail} />
          <Footer />
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default AppForm;
