import { fromJS } from 'immutable';
import * as qs from 'qs';

function makeUrl(endpoint: string): string {
  return `https://api.github.com/${endpoint}`;
}

const shallowRequest = (method: string) => (
  method === 'GET' ||
  method === 'REMOVE' ||
  method === 'DELETE'
);

export function request(method: string, endpoint: string, args: any, fullEndpoint?: string) {
  const shallow = shallowRequest(method);
  let url = fullEndpoint || makeUrl(endpoint);

  if (shallow) {
    url += '?' + qs.stringify(args);
  } else {
    console.error('POST request not working yet');
  }

  return fetch(url)
    .then(res => {
      if (res.status >= 400) {
        throw res;
      }

      return res.json();
    })
    .then(data => fromJS(data))
    .catch(res => res.json());
}

export function get(endpoint: string, args?: any, fullEndpoint?: string) {
  return request('GET', endpoint, args, fullEndpoint);
}

export function post(endpoint: string, args: any, fullEndpoint?: string) {
  return request('POST', endpoint, args, fullEndpoint);
}

export function put(endpoint: string, args: any) {
  return request('PUT', endpoint, args);
}

export function remove(endpoint: string, args: any) {
  return request('REMOVE', endpoint, args);
}

export default request;
