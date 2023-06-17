import { baseUrl } from 'env';

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function handleError(error) {
  return Promise.reject(error);
}

function _fetch(endpoint, requestOptions) {
  return fetch(`${baseUrl}${endpoint}`, requestOptions).then(handleResponse).catch(handleError);
}

function getEndpointWithParams(endpoint, params) {
  let endpointWithParams = endpoint;
  if (params) {
    // eslint-disable-next-line no-undef
    const urlSearchParams = new URLSearchParams(params);
    endpointWithParams += `?${urlSearchParams.toString()}`;
  }

  return endpointWithParams;
}

function get({ endpoint, params, signal }) {
  const requestOptions = {
    method: 'GET',
    signal,
  };
  return _fetch(getEndpointWithParams(endpoint, params), requestOptions);
}

function post({ endpoint, params, body, signal }) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  };
  return _fetch(getEndpointWithParams(endpoint, params), requestOptions);
}

function put({ endpoint, params, body, signal }) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  };
  return _fetch(getEndpointWithParams(endpoint, params), requestOptions);
}

function del({ endpoint, signal }) {
  const requestOptions = {
    method: 'DELETE',
    signal,
  };
  return _fetch(endpoint, requestOptions);
}

export { get, post, put, del };
