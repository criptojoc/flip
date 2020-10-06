import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import routes from './routes.json';

import MainPage from './components/pages/MainPage';
import ScrollToTop from './components/containers/scrollToTop';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles/core.scss';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route exact path={routes.index} component={MainPage}/>
          </Switch>
        </Router>

        <NotificationContainer />
      </React.Fragment>
    );
  }
}

export default App;
