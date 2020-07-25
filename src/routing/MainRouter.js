import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import SearchPage from '../pages/search/SearchPage';

const MainRouter = () => {
  return (
    <Router>
      <Route exact path="/" render={() => (<Redirect to="/search" />)} />
      <Route path="/search" component={SearchPage} />
    </Router>
  );
};

export default MainRouter;
