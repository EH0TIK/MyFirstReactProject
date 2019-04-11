import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";

const privateRoute = ({ Component, ...rest }) => {
  const { isLogined } = rest;
  return (
    <Route
      {...rest}
      render={props => (
        isLogined
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  );
};

privateRoute.propTypes = {
  component: PropTypes.func,
  isLogined: PropTypes.bool
};

const mapStoP = (state, ownProps) => ({
  isLogined: state.isAuthentificated,
  Component: ownProps.myComponent
});

const PrivateRoute = connect(mapStoP, null)(privateRoute);
export default PrivateRoute;
