import React from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import routes from 'routes.json';

// import ConcursPopup from 'components/containers/ConcursPopup';

import { ReactComponent as Logo } from 'assets/icons/logo.svg';

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { children, className } = this.props;

    return (
      <div className={classNames("app-header", className)}>
        <div className="row">
          <div className="app-header__top">
            <NavLink to={routes.index} className="app-header__logo">
              <Logo />
            </NavLink>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
