import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../../reduxStuff/actions";

import FacebookBtn from "../LoginButtons/FacebookBtn";


class _Login extends React.Component {
  state = {
    login:    "",
    password: ""
  };

  inputChanged = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  onFacebookLogin = (loginStatus, resultObject) => {
    console.log(resultObject);
    const { isLogined, history } = this.props;
    if (loginStatus === true && !isLogined) {
      const { autenticate } = this.props;
      autenticate({ login: resultObject.user.name, password: "" });
      history.push("/");
    }
  };

  onLinkedInLogin = (login) => {
    const { history, autenticate } = this.props;
    autenticate({ login, password: "" });
    history.push("/");
  };

  render() {
    const { login, password } = this.state;
    return (
      <div className="d-flex justify-content-center align-items-center jumbotron">
        <div className="d-flex flex-column justify-content-between">
         
            <div className="col-sm">
              <FacebookBtn onLogin={this.onFacebookLogin}>
                <button type="button" className="btn btn-info  mx-auto" >Facebook</button>
              </FacebookBtn>
            </div>
          </div>
        </div>
      
    );
  }
}

const mapDispatcherToProps = dispatch => ({
  autenticate: credentials => dispatch(authenticate(credentials))
});

const mapStateToProps = state => ({
  isLogined: state.isAuthentificated
});

const Login = connect(mapStateToProps, mapDispatcherToProps)(_Login);

export default Login;
