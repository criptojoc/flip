import withQuery from 'with-query';
import get from 'lodash/get';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';
import trimEnd from 'lodash/trimEnd';

/**
 * Takes an url and params and returns combined url
 * @param {String} url
 * @param {Object} params
 */
export const withParams = (url, params = {}) => {
  let rest = { ...params };

  const urlWithParams = `${url}`
    .replace(/:([\w\d.]+)(\?)?/gim, (match, p1, p2) => {
      const param = get(rest, p1, p2 && '');

      rest = omit(rest, p1);

      return param;
    })
    .replace('//', '/');

  return withQuery(trimEnd(urlWithParams, '/'), pickBy(rest, p => p !== null && p !== undefined && p !== ''));
};
