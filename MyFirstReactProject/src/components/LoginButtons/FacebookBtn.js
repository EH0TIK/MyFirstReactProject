import React from "react";

class FacebookBtn extends React.Component {
  componentDidMount() {
    document.addEventListener("FBObjectReady", this.initializeFacebookLogin);
  }

  componentWillUnmount() {
    document.removeEventListener("FBObjectReady", this.initializeFacebookLogin);
  }

  initializeFacebookLogin = () => {
    this.FB = window.FB;
  };


  facebookLogin = () => {
    if (!this.FB) return;

    this.FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        this.facebookLoginHandler(response);
      } else {
        this.FB.login(this.facebookLoginHandler, { scope: "public_profile" });
      }
    });
  };

  apiCallback = (response, userData) => {
    const { onLogin } = this.props;
    const result = {
      ...response,
      user: userData
    };
    onLogin(true, result);
  };

  facebookLoginHandler = (response) => {
    const { onLogin } = this.props;
    if (response.status === "connected") {
      this.FB.api(
        "/me",
        { fields: "name,last_name,first_name,location" },
        (userData) => {
          this.apiCallback(response, userData);
        }
      );
    } else {
      onLogin(false);
    }
  };

  render() {
    const { children } = this.props;
    return (
      <div onClick={this.facebookLogin}>
        {children}
      </div>
    );
  }
}

export default FacebookBtn;
