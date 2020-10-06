import React from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import routes from 'routes.json';

import imgConcursPhone from "../../../assets/img/concurs-phone.png";

import { ReactComponent as CrossIcon } from 'assets/icons/cross.svg';
import {ReactComponent as AppleLogo} from "../../../assets/icons/apple.svg";
import {ReactComponent as GPLogo} from "../../../assets/icons/google-play.svg";
import {ReactComponent as ArrowIcon} from "../../../assets/icons/arrow.svg";

class ConcursPopup extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: !localStorage.getItem('concurs'),
    };
  }

  componentDidMount() {

  }

  handleClose = () => {
    localStorage.setItem('concurs', 'true');
    this.setState({ isOpen: false });
  };

  handleShowDetails = () => {
    this.handleClose();
    this.props.history.push(routes.concurs);
  };

  render() {
    const { isOpen } = this.state;

    return (
      <>
        <div className={classNames("concurs-popup", { isOpen: isOpen })}>

          <button className="concurs-popup__close" onClick={this.handleClose}><CrossIcon /></button>
          <div className="concurs-popup__wrapper">
            <div className="concurs-popup__content">
              <div className="concurs-popup__content-headline">Concurs</div>


              <div className="concurs-popup__content-title">Descarcă aplicatia și cîștigă un <span>iPhone</span></div>

              <button className="btn__white-bg large" onClick={this.handleShowDetails}>Vezi Detalii <ArrowIcon /></button>

            </div>
            <div className="concurs-popup__image">
              <img src={imgConcursPhone} alt=""/>
            </div>
          </div>

          <div className="concurs-popup__bottom">
            <div className="concurs-popup__buttons">
              <a href="https://apps.apple.com/us/app/id1523540198" className="btn__mobile-store transparent">
                <div className="btn__mobile-store-icon">
                  <AppleLogo />
                </div>

                <div className="btn__mobile-store-text">
                  <div className="btn__mobile-store-label">Descarcă pe</div>
                  App Store
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.criptoleu.app" className="btn__mobile-store transparent">
                <div className="btn__mobile-store-icon">
                  <GPLogo />
                </div>

                <div className="btn__mobile-store-text">
                  <div className="btn__mobile-store-label">Descarcă pe</div>
                  Google Play
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className={classNames("overlay", { isOpen: isOpen })} onClick={this.handleClose} />
      </>
    );
  }

}

export default withRouter(ConcursPopup);
