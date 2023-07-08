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

function _fetch(url, requestOptions) {
  return fetch(url, requestOptions).then(handleResponse).catch(handleError);
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

function get({ url, params, signal }) {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    signal,
  };
  return _fetch(getEndpointWithParams(url, params), requestOptions);
}

function post({ url, params, body, signal }) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  };
  return _fetch(getEndpointWithParams(url, params), requestOptions);
}

function put({ url, params, body, signal }) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  };
  return _fetch(getEndpointWithParams(url, params), requestOptions);
}

function del({ url, params, signal }) {
  const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    signal,
  };
  return _fetch(getEndpointWithParams(url, params), requestOptions);
}

export { get, post, put, del };
