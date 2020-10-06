import React, { Component } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import Odometer from 'react-odometerjs';

import remove from 'lodash/remove';
import cloneDeep from 'lodash/cloneDeep';

import StatisticItem from './StatisticItem';

import { getStats } from "../../../api/requests";
import { onGeoTransferChange, removeGeoTransferListener } from "../../../api/geoTransfer";

import {ReactComponent as ArrowIcon} from "../../../assets/icons/arrow.svg";
import imgMdStats from "../../../assets/img/md_stats.png";

import routes from '../../../routes.json';

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stats: null,
      statTransfers: [],
      recentEvents: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      statTransfersIDToOut: [],
    }
  }

  async componentDidMount() {
    this.onGeoTransferChangeListener();
    const { data } = await getStats();
    this.setState({
      stats: data.data,
    });

    // Animation stress test
    // setInterval(() => {
    //   const data = { latitude: Math.floor(Math.random() * (80 - 20 + 1)) + 20, longitude: Math.floor(Math.random() * (80 - 30 + 1)) + 30, city: "Ceroborta", amount: 100, source: "emission" }
    //   this.transferCb(data);
    // }, 750);
  }

  componentWillUnmount() {
    removeGeoTransferListener();
  }

  onGeoTransferChangeListener = () => {
    onGeoTransferChange(this.transferCb)
  };

  transferCb = (data) => {
    const id = '_' + Math.random().toString(36).substr(2, 9);

    this.setState((state) => ({
      recentEvents: [{id, time: new Date(), ...data}, ...state.recentEvents.slice(0, 5)]
    }));

    if (this.state.stats) {
      if (data.source === 'emission') {
        this.setState({
          stats: {
            ...this.state.stats,
            total_supply: this.state.stats.total_supply + data.amount,
            emission_volume_24h: this.state.stats.emission_volume_24h + data.amount,
            emission_volume_30d: this.state.stats.emission_volume_30d + data.amount,
            emission_volume_7d: this.state.stats.emission_volume_7d + data.amount,
          }
        });
      }

      if (data.source === 'register') {
        this.setState({
          stats: {
            ...this.state.stats,
            number_registered_users: this.state.stats.number_registered_users + 1,
            registered_users_24h: this.state.stats.registered_users_24h + 1,
            registered_users_7d: this.state.stats.registered_users_7d + 1,
            registered_users_30d: this.state.stats.registered_users_30d + 1,
            total_supply: this.state.stats.total_supply + data.amount,
            emission_volume_24h: this.state.stats.emission_volume_24h + data.amount,
            emission_volume_30d: this.state.stats.emission_volume_30d + data.amount,
            emission_volume_7d: this.state.stats.emission_volume_7d + data.amount,
          }
        });
      }

      if (data.source === 'transfer') {
        this.setState({
          stats: {
            ...this.state.stats,
            transfer_volume_24h: this.state.stats.transfer_volume_24h + data.amount,
            transfer_volume_30d: this.state.stats.transfer_volume_30d + data.amount,
            transfer_volume_7d: this.state.stats.transfer_volume_7d + data.amount,
          }
        });
      }
    }

    this.setState((state) => ({
      statTransfers: [{id, ...data}, ...state.statTransfers]
    }), () => {
      setTimeout((transferID) => {
        this.setState((state) => ({
          statTransfersIDToOut: [transferID, ...state.statTransfersIDToOut]
        }), () => {
          setTimeout(() => {
            this.setState((state) => {
              const statTransfersIDToOut = cloneDeep(state.statTransfersIDToOut);
              remove(statTransfersIDToOut, (dotID) => dotID === transferID);

              const statTransfers = cloneDeep(state.statTransfers);
              remove(statTransfers, (dot) => dot.id === transferID);

              return {
                statTransfersIDToOut,
                statTransfers,
              }
            });
          }, 200)
        });
      }, 800, id);
    });
  }

  render() {
    const { stats, statTransfers, statTransfersIDToOut, recentEvents } = this.state;

    return (
      <div className="statistics">
        <div className="row">

          {stats && <div className="statistics__top">
            <div className="statistics__stats-content-item">
              <div className="statistics__stats-content-value big">
                <Odometer value={stats.number_registered_users} format="(,ddd)" />
              </div>
              <div className="statistics__top-label">Total Emitenți</div>
            </div>
            <div className="statistics__stats-content-item">
              <div className="statistics__stats-content-value big">
                <Odometer value={stats.total_supply} format="(,ddd)" />
              </div>
              <div className="statistics__top-label">cMDL ÎN CIRCULAȚIE</div>
            </div>
            <div className="statistics__stats-content-item">
              <div className="statistics__stats-content-value big">
                <Odometer value={stats.transfer_volume_30d} format="(,ddd)" />
              </div>
              <div className="statistics__top-label">Transferuri, 30 zile</div>
            </div>
          </div>}

          <div className="statistics__stats-wrapper">
            <div className="statistics__stats-image">
              <img src={imgMdStats} alt="MD"/>

              <div
                className={classNames("statistics__stats-blob emission out")}
                style={{
                  top: `10%`,
                  left: `10%`,
                }}
              />

              {statTransfers.map((data) => (
                <div
                  key={data.id}
                  className={classNames("statistics__stats-blob", [data.source], { out: statTransfersIDToOut.includes(data.id) })}
                  style={{
                    top: `${data.latitude}%`,
                    left: `${data.longitude}%`,
                  }}
                />
              ))}
            </div>

            <div className="statistics__stats-content">
              <h3>
                Live Tranzactii
              </h3>

              <div className="statistics__recent-list">
                {recentEvents.map((event) => (
                  <StatisticItem key={event.id} event={event} />
                ))}
              </div>

              <div className="statistics__recent-all">
                <NavLink to={routes.explorer} className="btn__white">Vezi Pagina Explorer <ArrowIcon /></NavLink>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Statistics;
