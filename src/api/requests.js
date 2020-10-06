/**
 * @file A point for all requests
 */

import axios from 'axios';
const api = require('./api.json');

const headers = { headers: { 'Content-Type': 'application/json' } };

/**
 * Get stats
 */
export const getStats = () => axios.get(api.stats, {...headers });

/**
 * Get dice
 */
export const getDiceList = ({offset= 0, limit = 50}) => axios.get(api.dice, {...headers, params: { limit, offset }});
