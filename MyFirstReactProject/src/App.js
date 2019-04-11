import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import Login from "./components/pages/Login";
import Main from "./components/pages/Main";
import InfoPage from "./components/pages/InfoPage";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

class _App extends React.Component {
  initFbSDK = () => {
    if (!window.FB) {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId:   "1998540566940524",
          cookie:  true,
          xfbml:   true,
          version: "v3.2"
        });
        const fbInitEvent = new Event("FBObjectReady");
        document.dispatchEvent(fbInitEvent);
      };

      (function(d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        const js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, "script", "facebook-jssdk"));
    }
  };

  initInSDK = () => {
    (function(id) {
      if (document.getElementById(id)) {
        return;
      }
      const ljs = document.getElementsByTagName("script")[0];
      const js = document.createElement("script");
      js.id = id;

      js.src = "//platform.linkedin.com/in.js";
      js.text = "api_key: 771023rs10ey18";
      ljs.parentNode.insertBefore(js, ljs);
    }("linkedin-sdk"));
  };

  componentWillMount() {
    this.initFbSDK();
    this.initInSDK();
  }

  render() {
    const { login } = this.props;
    return (
      <div>
        <Header login={login || ""} />
        <div className="container">
          <Switch>
            <PrivateRoute exact path="/" myComponent={Main} />
            <Route path="/login" component={Login} />}/>
            <PrivateRoute path="/:id" myComponent={InfoPage} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLogined: state.isAuthentificated,
  login:     state.user.login
});

const App = connect(mapStateToProps)(_App);

export default withRouter(App);
