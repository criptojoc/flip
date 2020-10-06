import React, { Component } from 'react';
import classNames from 'classnames';
import moment from "moment";
import get from 'lodash/get';
import QRCode from "react-qr-code";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Odometer from 'react-odometerjs';

import { onDiceChange, removeDiceListener, onDiceStatsChange, removeDiceStatsListener } from "../../../api/dice";

import Header from 'components/containers/Header';

import {ReactComponent as ArrowIcon} from "../../../assets/icons/arrow.svg";
import {ReactComponent as LogoSmallIcon} from "../../../assets/icons/logo-small.svg";
import {ReactComponent as LoadingIcon} from "../../../assets/icons/loading.svg";

import { getStats, getDiceList } from "../../../api/requests";

import withTrackerGA from "../../../utils/withTrackerGA";

const gameAddress = '0x71E9558b9F0643CD730B73b33911465E2F79DbE2';

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCopied: false,
      loading: false,
      searchData: null,
      stats: null,
      page: 0,
      limit: 25,
      source: null,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });

    const [transfers, stats] = await Promise.all([getDiceList({ offset: this.state.page * this.state.limit, limit: this.state.limit, source: this.state.source }), getStats()]);
    this.setState({
      stats: stats.data.data,
      searchData: transfers.data.data,
      loading: false,
    });

    this.onDiceChangeListener();
    this.onDiceStatsChangeListener();
  }

  componentWillUnmount() {
    removeDiceListener();
    removeDiceStatsListener();
  }

  onDiceStatsChangeListener = () => {
    onDiceStatsChange((data) => {
      this.setState({
        stats: data
      });
    })
  };

  onDiceChangeListener = () => {
    onDiceChange((data) => {
      this.setState((state) => ({
        searchData: [data, ...state.searchData].slice(0,state.limit)
      }));
    });
  };

  getDiceList = async () => {
    this.setState({ loading: true });

    try {
      const transfers = await getDiceList({ offset: this.state.page * this.state.limit, limit: this.state.limit, source: this.state.source });

      this.setState({
        searchData: get(transfers, 'data.data'),
        loading: false
      });
    } catch (e) {
      this.setState({
        searchData: null,
        loading: false
      });
    }
  };

  setPageNumber = page => () => {
    this.setState({ page }, () => {
      this.getDiceList();
    });
  };


  render() {
    const { stats, loading, searchData, limit, page, isCopied } = this.state;

    return (
      <div className="app">
        <Header>
          <div className="game__header">
            <div className="game__header-content">
              <h1 className="game__headline">Aruncă <br/> Moneda</h1>

              <div className="game__header-copy-wrapper">
                {gameAddress}

                <CopyToClipboard
                  text={gameAddress}
                  onCopy={() => { this.setState({isCopied: true}); setTimeout(() => {this.setState({isCopied: false}); }, 2000) }}
                  className="game__header-copy-button"
                >
                  <span>{!isCopied ? 'Copie' : '👍'}</span>
                </CopyToClipboard>
              </div>
            </div>

            <div className="game__header-qr-wrapper">
              <div className="game__header-qr">
                <QRCode value={gameAddress} size={224}/>
              </div>
            </div>
          </div>
        </Header>

        <div className="row">
          <div className="game__concept">
            <h2>Regulile Jocului</h2>
            <div className="game__concept-wrapper">
              <div className="game__concept-item">
                <span className="game__concept-item-num">1</span>
                Trimite o sumă spre adresa
                <br/>
                <span className="game__concept-highlight small">0x71E9558b9F0643CD730B<br/>73b33911465E2F79DbE2</span>
                <p>
                  <CopyToClipboard
                    text={gameAddress}
                    onCopy={() => { this.setState({isCopied: true}); setTimeout(() => {this.setState({isCopied: false}); }, 2000) }}
                    className="game__header-copy-button"
                  >
                    <span>{!isCopied ? 'Copie' : '👍'}</span>
                  </CopyToClipboard>
                </p>
              </div>
              <div className="game__concept-item">
                <span className="game__concept-item-num">2</span>
                Automat se va efectua extragerea unei cifre de la <span className="game__concept-highlight">1</span> la <span className="game__concept-highlight">100</span>
              </div>

              <div className="game__concept-item">
                <span className="game__concept-item-num">3</span>
                Target <span className="game__concept-highlight-variant">>52</span>
                <br/>

                <ul className="game__concept-item-list">
                  <li className="game__concept-item-list-item">
                    Dacă se extrage un număr mai mare de <span className="game__concept-highlight small">52</span> cîștigi suma <span className="game__concept-highlight small">2x</span>
                  </li>
                  <li className="game__concept-item-list-item">
                    Dacă mai jos de <span className="game__concept-highlight small">52</span> pierzi suma trimisă.
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div className="row">
          <div className="game__transactions">
            <div className="game__transactions-header">
              <div className="game__transactions-header-stat">
                <div className="game__transactions-header-label">Jocuri Live </div>
              </div>
              <div className="game__transactions-header-stats">
                <div className="game__transactions-header-stats-item">
                  <div className="game__transactions-header-stats-item-label">Total jocuri</div>
                  <div className="game__transactions-header-stats-item-value">{stats ? <Odometer value={stats.count_games} format="(,ddd)" />  : ''}</div>
                </div>
                <div className="game__transactions-header-stats-item">
                  <div className="game__transactions-header-stats-item-label">TOTAL cîstigat</div>
                  <div className="game__transactions-header-stats-item-value">
                    <LogoSmallIcon />
                    {stats ? <Odometer value={stats.sum_prizes} format="(,ddd)" />  : ''}
                  </div>
                </div>
              </div>
            </div>

            {loading && <LoadingIcon className="game__loading" />}

            {!loading && searchData && searchData.length > 0 && <div>
              <div className="game__search-result-body">
                <div className="game__search-result-transactions-wrapper">
                  <table className="game__table">
                    <thead>
                    <tr>

                      <td>Data</td>
                      <td>Adresa</td>
                      <td>Suma</td>
                      <td>Cifra</td>
                      <td>Suma Ciștigată</td>
                    </tr>
                    </thead>
                    <tbody>
                    {searchData.map(({ id, win, random_number, player_address, player_amount, created_at, prize_amount }, i) => (
                      <tr key={id} className={classNames({ 'tr-win': win })}>
                        <td><span className="game__table-time">{moment(created_at).format('DD MMM [la] HH:mm')}</span></td>
                        <td><a href={`https://criptoleu.com/history/${player_address}`} target='_blank' rel="noopener noreferrer" className="game__table-address">{player_address.substring(0, 16)}...</a></td>
                        <td>{(player_amount.toFixed(2))} cMDL</td>
                        <td>
                            <div className={classNames("game__number", [ win ? " win" : "loose"])}>
                              {random_number}
                            </div>
                        </td>
                        <td>
                          <span className={classNames("game__sum-result", [ win ? " win" : "loose"])}>
                            {win ? "+" : ""}

                            {win ? (prize_amount.toFixed(2)) : (prize_amount.toFixed(2))} cMDL
                          </span>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>}

            {searchData && searchData.length === 0 && <div className="game__no-results">0 rezultate</div>}

            {searchData && searchData.length > 0 && <div className="pagination">
              <br/>
              <button disabled={page === 0} className="btn__small" onClick={this.setPageNumber(0)}>Prima</button>
              {page > 0 && <button className="btn__small arrow-left" onClick={this.setPageNumber(page - 1)}><ArrowIcon /></button>}
              <span className="pagination__page">Page {page + 1}</span>
              <button disabled={searchData.length !== limit} className="btn__small" onClick={this.setPageNumber(page + 1)}><ArrowIcon /></button>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default withTrackerGA(MainPage);
