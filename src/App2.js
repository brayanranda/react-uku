import PropTypes from "prop-types";
import React from "react";

import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";

import { authProtectedRoutes, publicRoutes } from "./routes";
import Authmiddleware from "./routes/route";
import Pages404 from "./pages/Page404";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
          <Route path="*" component={Pages404} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
