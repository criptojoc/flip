import React, { Component } from 'react';
import classNames from 'classnames';
import moment from "moment";

import {ReactComponent as PinIcon} from "../../../assets/icons/pin.svg";

class StatisticItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNew: true,
    }
  }

  async componentDidMount() {
    setTimeout(() => {
      this.setState({
        isNew: false,
      })
    }, 100);
  }

  render() {
    const { event } = this.props;
    const { isNew } = this.state;

    return (
      <div className={classNames("statistics__recent-item", { isNew: isNew })}>
        {event && event.source && <>
          <div className="statistics__recent-item-left">
            <div className={classNames("statistics__stats-content-label", [event.source])}>
              <span/>
              {event.source === 'register' && <b>Înregistrare</b>}
              {event.source === 'emission' && <b>Emisie</b>}
              {event.source === 'transfer' && <b>Transfer</b>}
            </div>
            <div className="statistics__recent-item-time">
              {moment(event.time).format('DD MMM [la] HH:mm')}
            </div>
          </div>

          <div className="statistics__recent-item-right">
            <div className="statistics__recent-item-amount">{event.amount} <span>cMDL</span></div>
            {event.city && <div className="statistics__recent-item-city">
              <PinIcon /> {event.city}
            </div>}
          </div>
        </>}
      </div>
    );
  }
}

export default StatisticItem;
